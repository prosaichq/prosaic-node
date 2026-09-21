import { createHash } from 'node:crypto';
import { describe, expect, it, vi } from 'vitest';
import { OAuth, OAuthError } from './oauth.js';

describe('OAuth authorization code flow', () => {
  it('generates S256 PKCE and random state and verifies a callback before exchanging its code', async () => {
    const oauth = new OAuth({
      clientId: 'client',
      baseUrl: 'http://localhost:3000',
      fetch: async (_url, init) => {
        const body = new URLSearchParams(String(init?.body));
        expect(body.get('grant_type')).toBe('authorization_code');
        expect(body.get('redirect_uri')).toBe('http://127.0.0.1:8910/callback');
        expect(body.get('code')).toBe('authorization-code');
        expect(body.get('code_verifier')).toBe(authorization.codeVerifier);
        return Response.json({
          access_token: 'access',
          token_type: 'Bearer',
          expires_in: 3600,
          refresh_token: 'refresh',
        });
      },
    });
    const authorization = await oauth.createAuthorization({
      redirectUri: 'http://127.0.0.1:8910/callback',
    });
    const url = new URL(authorization.url);
    expect(url.pathname).toBe('/api/auth/oauth2/authorize');
    expect(url.searchParams.get('code_challenge_method')).toBe('S256');
    expect(url.searchParams.get('code_challenge')).toBe(
      createHash('sha256').update(authorization.codeVerifier).digest('base64url'),
    );
    expect(authorization.codeVerifier).toMatch(/^[A-Za-z0-9_-]{43,128}$/);
    expect(authorization.state.length).toBeGreaterThanOrEqual(32);
    expect(url.searchParams.get('scope')).toContain('offline_access');
    expect(
      (
        await oauth.completeAuthorization(
          `http://127.0.0.1:8910/callback?code=authorization-code&state=${authorization.state}`,
          authorization,
        )
      ).access_token,
    ).toBe('access');
  });

  it('rejects wrong state, duplicate parameters and mismatched callbacks before contacting the token endpoint', async () => {
    const fetcher = vi.fn<typeof fetch>();
    const oauth = new OAuth({ clientId: 'client', fetch: fetcher });
    const auth = await oauth.createAuthorization({
      redirectUri: 'https://consumer.example/callback',
    });
    for (const callback of [
      'https://consumer.example/callback?code=c&state=wrong',
      `https://attacker.example/callback?code=c&state=${auth.state}`,
      `https://consumer.example/other?code=c&state=${auth.state}`,
      `https://consumer.example/callback?code=c&code=d&state=${auth.state}`,
      `https://consumer.example/callback?code=c&state=${auth.state}&state=${auth.state}`,
    ])
      await expect(oauth.completeAuthorization(callback, auth)).rejects.toBeInstanceOf(OAuthError);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each(['none', 'client_secret_basic', 'client_secret_post'] as const)(
    'supports %s client authentication for refresh',
    async (method) => {
      const oauth = new OAuth({
        clientId: 'client:id',
        ...(method === 'none' ? {} : { clientSecret: 'secret&value' }),
        tokenEndpointAuthMethod: method,
        fetch: async (_input, init) => {
          const headers = new Headers(init?.headers);
          const body = new URLSearchParams(String(init?.body));
          expect(body.get('grant_type')).toBe('refresh_token');
          expect(body.get('refresh_token')).toBe('old-refresh');
          expect(headers.get('content-type')).toBe('application/x-www-form-urlencoded');
          if (method === 'client_secret_basic') {
            expect(headers.get('authorization')).toBe(
              `Basic ${Buffer.from('client%3Aid:secret%26value').toString('base64')}`,
            );
            expect(body.has('client_secret')).toBe(false);
          } else {
            expect(headers.has('authorization')).toBe(false);
            expect(body.get('client_id')).toBe('client:id');
          }
          if (method === 'client_secret_post')
            expect(body.get('client_secret')).toBe('secret&value');
          return Response.json({
            access_token: 'rotated',
            token_type: 'Bearer',
            expires_in: 3600,
            refresh_token: 'new-refresh',
          });
        },
      });
      expect((await oauth.refreshToken('old-refresh')).refresh_token).toBe('new-refresh');
    },
  );

  it('preserves OAuth failure codes, refuses token redirects and validates token responses', async () => {
    const invalid = new OAuth({
      clientId: 'client',
      fetch: async () =>
        Response.json({ error: 'invalid_grant', error_description: 'Expired' }, { status: 400 }),
    });
    await expect(invalid.refreshToken('old')).rejects.toMatchObject({
      name: 'OAuthError',
      code: 'invalid_grant',
      status: 400,
    });
    const redirected = new OAuth({
      clientId: 'client',
      fetch: async (_url, init) => {
        expect(init?.redirect).toBe('manual');
        return new Response(null, { status: 307, headers: { location: 'https://evil.example' } });
      },
    });
    await expect(redirected.refreshToken('old')).rejects.toBeInstanceOf(OAuthError);
    const malformed = new OAuth({
      clientId: 'client',
      fetch: async () => Response.json({ access_token: '', token_type: 'Bearer' }),
    });
    await expect(malformed.refreshToken('old')).rejects.toMatchObject({ code: 'invalid_response' });
  });

  it('revokes a token without requiring a JSON response', async () => {
    const oauth = new OAuth({
      clientId: 'client',
      fetch: async (_url, init) => {
        expect(new URLSearchParams(String(init?.body)).get('token_type_hint')).toBe(
          'refresh_token',
        );
        return new Response(null, { status: 200 });
      },
    });
    await expect(oauth.revokeToken('refresh', 'refresh_token')).resolves.toBeUndefined();
  });

  it('shares a refresh between simultaneous callers and persists rotated credentials before exposing them', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      Response.json({
        access_token: 'new-access',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'new-refresh',
      }),
    );
    const oauth = new OAuth({ clientId: 'client', fetch: fetcher });
    const persisted: string[] = [];
    const provider = oauth.createTokenProvider(
      {
        access_token: 'expired',
        token_type: 'Bearer',
        expires_at: 0,
        refresh_token: 'old-refresh',
      },
      async (tokens) => {
        persisted.push(tokens.refresh_token!);
      },
    );
    expect(await Promise.all([provider(), provider(), provider()])).toEqual([
      'new-access',
      'new-access',
      'new-access',
    ]);
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(persisted).toEqual(['new-refresh']);
    expect(await provider()).toBe('new-access');
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it('retries failed persistence without spending an already-rotated refresh token again', async () => {
    const fetcher = vi.fn<typeof fetch>(async () =>
      Response.json({
        access_token: 'new-access',
        token_type: 'Bearer',
        expires_in: 3600,
        refresh_token: 'new-refresh',
      }),
    );
    const persist = vi
      .fn<(tokens: unknown) => Promise<void>>()
      .mockRejectedValueOnce(new Error('Storage unavailable'))
      .mockResolvedValue(undefined);
    const oauth = new OAuth({ clientId: 'client', fetch: fetcher });
    const provider = oauth.createTokenProvider(
      {
        access_token: 'expired',
        token_type: 'Bearer',
        expires_at: 0,
        refresh_token: 'old-refresh',
      },
      persist,
    );
    await expect(provider()).rejects.toThrow('Storage unavailable');
    expect(await provider()).toBe('new-access');
    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(persist).toHaveBeenCalledTimes(2);
    expect(persist.mock.calls[1]?.[0]).toMatchObject({ refresh_token: 'new-refresh' });
  });

  it('requires reauthorization if a token expires without refresh access', async () => {
    const oauth = new OAuth({ clientId: 'client' });
    const provider = oauth.createTokenProvider(
      { access_token: 'expired', token_type: 'Bearer', expires_at: 0 },
      async () => {},
    );
    await expect(provider()).rejects.toMatchObject({ code: 'reauthorization_required' });
  });
});
