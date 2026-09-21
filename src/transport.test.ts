import { afterEach, describe, expect, it, vi } from 'vitest';
import { Transport } from './transport.js';
import { AuthenticationError, APIError, ConnectionError, TimeoutError } from './errors.js';

afterEach(() => {
  vi.useRealTimers();
});

function json(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return Response.json(body, { status, headers });
}

describe('HTTP transport', () => {
  it('sends bearer auth, workspace overrides and comma-separated query filters while preserving the envelope', async () => {
    const fetcher = vi.fn<typeof fetch>(async (input, init) => {
      const url = new URL(String(input));
      const headers = new Headers(init?.headers);
      expect(url.pathname).toBe('/api/public/v1/entities/entity%2Fid/ledger');
      expect(url.searchParams.get('accountIds')).toBe('a,b');
      expect(url.searchParams.get('includeVoided')).toBe('false');
      expect(url.searchParams.has('unset')).toBe(false);
      expect(headers.get('authorization')).toBe('Bearer request-token');
      expect(headers.get('x-workspace-id')).toBe('workspace-2');
      expect(init?.redirect).toBe('manual');
      return json({ data: [{ amount: '9007199254740993.01', date: '2026-04-01' }] }, 200, {
        'x-request-id': 'request-1',
      });
    });
    const transport = new Transport({
      apiKey: 'prsk_test',
      workspaceId: 'workspace-1',
      fetch: fetcher,
    });
    const result = await transport.request(
      'GET',
      '/api/public/v1/entities/entity%2Fid/ledger',
      {
        query: { accountIds: ['a', 'b'], includeVoided: false, unset: undefined },
      },
      { accessToken: 'request-token', workspaceId: 'workspace-2' },
    );
    expect(result.data).toEqual({ data: [{ amount: '9007199254740993.01', date: '2026-04-01' }] });
    expect(result.requestId).toBe('request-1');
    expect(result.response.status).toBe(200);
  });

  it.each(['apiKey', 'accessToken'] as const)(
    'supports %s without rewriting the credential',
    async (auth) => {
      const transport = new Transport({
        [auth]: 'opaque-token',
        fetch: async (_input, init) => {
          expect(new Headers(init?.headers).get('authorization')).toBe('Bearer opaque-token');
          return json({ data: { id: 'user-1' } });
        },
      });
      expect((await transport.request('GET', '/api/public/v1/me')).data).toEqual({
        data: { id: 'user-1' },
      });
    },
  );

  it('evaluates a token provider for each request', async () => {
    let current = 'first';
    const seen: string[] = [];
    const transport = new Transport({
      accessToken: () => current,
      fetch: async (_input, init) => {
        seen.push(new Headers(init?.headers).get('authorization') ?? '');
        return json({});
      },
    });
    await transport.request('GET', '/api/public/v1/me');
    current = 'rotated';
    await transport.request('GET', '/api/public/v1/me');
    expect(seen).toEqual(['Bearer first', 'Bearer rotated']);
  });

  it('bounds a hanging token provider by the request deadline without sending a request', async () => {
    vi.useFakeTimers();
    const fetcher = vi.fn<typeof fetch>();
    const transport = new Transport({
      accessToken: () => new Promise<string>(() => {}),
      fetch: fetcher,
      timeout: 10,
    });
    let failure: unknown;
    void transport.request('GET', '/api/public/v1/me').catch((error: unknown) => {
      failure = error;
    });
    await vi.advanceTimersByTimeAsync(10);
    expect(failure).toBeInstanceOf(TimeoutError);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it.each([301, 302, 307, 308])(
    'does not follow HTTP %i redirects with credentials',
    async (status) => {
      const fetcher = vi.fn<typeof fetch>(
        async () =>
          new Response(null, { status, headers: { location: 'https://elsewhere.example' } }),
      );
      const transport = new Transport({ apiKey: 'prsk_test', fetch: fetcher });
      await expect(transport.request('GET', '/api/public/v1/me')).rejects.toMatchObject({ status });
      expect(fetcher).toHaveBeenCalledTimes(1);
    },
  );

  it('exposes API status, code, validation details and request id without request credentials', async () => {
    const transport = new Transport({
      apiKey: 'private-key',
      fetch: async () =>
        json(
          { error: 'Bad input', code: 'VALIDATION_ERROR', details: { errors: ['Invalid'] } },
          400,
          { 'x-request-id': 'r1' },
        ),
    });
    const error = await transport
      .request('POST', '/api/public/v1/entities', { body: { secret: 'private-body' } })
      .catch((cause: unknown) => cause);
    expect(error).toBeInstanceOf(APIError);
    expect(error).toMatchObject({
      status: 400,
      code: 'VALIDATION_ERROR',
      requestId: 'r1',
      details: { errors: ['Invalid'] },
    });
    expect(JSON.stringify(error)).not.toMatch(/private-key|private-body/);
  });

  it('types authentication failures and handles non-JSON errors without echoing an HTML page', async () => {
    const auth = new Transport({
      apiKey: 'test',
      fetch: async () => json({ error: 'Unauthorized' }, 401),
    });
    await expect(auth.request('GET', '/api/public/v1/me')).rejects.toBeInstanceOf(
      AuthenticationError,
    );
    const proxy = new Transport({
      apiKey: 'test',
      maxNetworkRetries: 0,
      fetch: async () => new Response('<html>proxy details</html>', { status: 502 }),
    });
    await expect(proxy.request('GET', '/api/public/v1/me')).rejects.toMatchObject({
      status: 502,
      message: 'Prosaic API request failed (502)',
    });
  });

  it('retries safe reads on rate limits and respects Retry-After', async () => {
    vi.useFakeTimers();
    const fetcher = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(json({ error: 'Rate limited' }, 429, { 'retry-after': '2' }))
      .mockResolvedValueOnce(json({ data: ['ok'] }));
    const transport = new Transport({ apiKey: 'test', fetch: fetcher, maxNetworkRetries: 1 });
    const request = transport.request('GET', '/api/public/v1/entities');
    await vi.advanceTimersByTimeAsync(1999);
    expect(fetcher).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect((await request).data).toEqual({ data: ['ok'] });
  });

  it.each(['POST', 'PATCH', 'DELETE'] as const)(
    'never replays a %s after a server or connection failure',
    async (method) => {
      const fetcher = vi.fn<typeof fetch>(async () => json({ error: 'Unknown outcome' }, 503));
      const transport = new Transport({ apiKey: 'test', maxNetworkRetries: 2, fetch: fetcher });
      await expect(
        transport.request(method, '/api/public/v1/entities', { body: { name: 'Entity' } }),
      ).rejects.toMatchObject({ status: 503 });
      expect(fetcher).toHaveBeenCalledTimes(1);
    },
  );

  it('enforces a request deadline and supports caller cancellation during a fetch', async () => {
    const fetcher: typeof fetch = async (_input, init) =>
      new Promise((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true });
      });
    const transport = new Transport({
      apiKey: 'test',
      fetch: fetcher,
      timeout: 10,
      maxNetworkRetries: 0,
    });
    await expect(transport.request('GET', '/api/public/v1/me')).rejects.toBeInstanceOf(
      TimeoutError,
    );
    const controller = new AbortController();
    const cancelled = transport.request(
      'GET',
      '/api/public/v1/me',
      {},
      { signal: controller.signal, timeout: 1000 },
    );
    const assertion = expect(cancelled).rejects.toMatchObject({ name: 'AbortError' });
    controller.abort();
    await assertion;
  });

  it('lets fetch create multipart boundaries and preserves file bytes', async () => {
    const form = new FormData();
    form.append('file', new File(['invoice bytes'], 'invoice.pdf', { type: 'application/pdf' }));
    const transport = new Transport({
      apiKey: 'test',
      fetch: async (_input, init) => {
        expect(new Headers(init?.headers).has('content-type')).toBe(false);
        const form = init?.body;
        if (!(form instanceof FormData)) throw new Error('Expected multipart form');
        const file = form.get('file') as File;
        expect(file.name).toBe('invoice.pdf');
        expect(await file.text()).toBe('invoice bytes');
        return json({ id: 'file-1' }, 201);
      },
    });
    expect(
      (await transport.request('POST', '/api/public/v1/entities/e/files/upload', { body: form }))
        .data,
    ).toEqual({ id: 'file-1' });
  });

  it('rejects unsafe origins and paths before a credential can leave the API', async () => {
    expect(() => new Transport({ apiKey: 'test', baseUrl: 'http://example.com' })).toThrow(/HTTPS/);
    expect(
      () => new Transport({ apiKey: 'test', baseUrl: 'https://user:password@example.com' }),
    ).toThrow(/origin/);
    const fetcher = vi.fn<typeof fetch>();
    const transport = new Transport({
      apiKey: 'test',
      baseUrl: 'http://127.0.0.1:3000',
      fetch: fetcher,
    });
    for (const path of [
      'https://evil.example',
      '//evil.example',
      '/api/auth/token',
      '/api/public/v1/../admin',
      '/api/public/v1/%2e%2e/admin',
      '/api/public/v1/me?token=secret',
    ]) {
      await expect(transport.request('GET', path)).rejects.toThrow(/path/);
    }
    expect(fetcher).not.toHaveBeenCalled();
  });

  it('rejects malformed success JSON and maps network errors without leaking their messages', async () => {
    const malformed = new Transport({
      apiKey: 'test',
      fetch: async () =>
        new Response('{broken', { headers: { 'content-type': 'application/json' } }),
    });
    await expect(malformed.request('GET', '/api/public/v1/me')).rejects.toMatchObject({
      name: 'InvalidResponseError',
    });
    const failed = new Transport({
      apiKey: 'test',
      maxNetworkRetries: 0,
      fetch: async () => {
        throw new Error('private-key in network error');
      },
    });
    await expect(failed.request('GET', '/api/public/v1/me')).rejects.toBeInstanceOf(
      ConnectionError,
    );
    await expect(failed.request('GET', '/api/public/v1/me')).rejects.not.toThrow(/private-key/);
  });
});
