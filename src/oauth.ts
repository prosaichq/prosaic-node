import { createHash, randomBytes, timingSafeEqual } from 'node:crypto';
import { ProsaicError, TimeoutError } from './errors.js';
import { validateOrigin } from './transport.js';

export interface OAuthOptions {
  clientId: string;
  clientSecret?: string;
  tokenEndpointAuthMethod?: 'none' | 'client_secret_basic' | 'client_secret_post';
  baseUrl?: string;
  timeout?: number;
  fetch?: typeof fetch;
}
export interface Authorization {
  url: string;
  state: string;
  codeVerifier: string;
  redirectUri: string;
}
export interface OAuthTokens {
  access_token: string;
  token_type: string;
  expires_in?: number;
  /** Absolute expiry in Unix seconds; persist this with the tokens. */
  expires_at?: number;
  refresh_token?: string;
  scope?: string;
  id_token?: string;
}

/** An OAuth protocol error; code contains the provider's machine-readable error. */
export class OAuthError extends ProsaicError {
  readonly code: string;
  readonly status?: number;
  constructor(code: string, message: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

function validateRedirect(uri: string): URL {
  const url = new URL(uri);
  validateOrigin(url.origin);
  if (url.username || url.password || url.hash)
    throw new TypeError('Redirect URI cannot contain credentials or a fragment');
  for (const name of ['code', 'state', 'error', 'error_description'])
    if (url.searchParams.has(name))
      throw new TypeError(`Redirect URI cannot contain reserved parameter ${name}`);
  return url;
}

function checkedTokens(input: unknown): OAuthTokens {
  if (typeof input !== 'object' || input === null)
    throw new OAuthError('invalid_response', 'The token endpoint returned an invalid response');
  const value = input as Record<string, unknown>;
  if (
    typeof value.access_token !== 'string' ||
    !value.access_token ||
    typeof value.token_type !== 'string' ||
    value.token_type.toLowerCase() !== 'bearer'
  )
    throw new OAuthError(
      'invalid_response',
      'The token endpoint did not return a bearer access token',
    );
  if (
    value.expires_in !== undefined &&
    (typeof value.expires_in !== 'number' ||
      !Number.isFinite(value.expires_in) ||
      value.expires_in <= 0)
  )
    throw new OAuthError('invalid_response', 'Invalid token lifetime');
  for (const key of ['refresh_token', 'scope', 'id_token'])
    if (value[key] !== undefined && typeof value[key] !== 'string')
      throw new OAuthError('invalid_response', `Invalid ${key}`);
  return {
    access_token: value.access_token,
    token_type: value.token_type,
    ...(typeof value.expires_in === 'number'
      ? {
          expires_in: value.expires_in,
          expires_at: Math.floor(Date.now() / 1000) + value.expires_in,
        }
      : {}),
    ...(typeof value.refresh_token === 'string' ? { refresh_token: value.refresh_token } : {}),
    ...(typeof value.scope === 'string' ? { scope: value.scope } : {}),
    ...(typeof value.id_token === 'string' ? { id_token: value.id_token } : {}),
  };
}

/** OAuth authorization-code + S256 PKCE for public and confidential clients. */
export class OAuth {
  readonly #options: OAuthOptions;
  readonly #baseUrl: string;
  readonly #method: NonNullable<OAuthOptions['tokenEndpointAuthMethod']>;

  constructor(options: OAuthOptions) {
    if (!options.clientId) throw new TypeError('clientId is required');
    this.#baseUrl = validateOrigin(options.baseUrl ?? 'https://app.prosaic.works');
    this.#method =
      options.tokenEndpointAuthMethod ?? (options.clientSecret ? 'client_secret_basic' : 'none');
    if (this.#method !== 'none' && !options.clientSecret)
      throw new TypeError('A confidential client requires clientSecret');
    if (this.#method === 'none' && options.clientSecret)
      throw new TypeError('Public clients must not include clientSecret');
    const timeout = options.timeout ?? 30_000;
    if (!Number.isFinite(timeout) || timeout <= 0 || timeout > 2_147_483_647)
      throw new TypeError('timeout must be a positive finite millisecond value');
    this.#options = { ...options, timeout };
  }

  /** Create an authorization URL. Store this result in the initiating user's server-side session. */
  createAuthorization({
    redirectUri,
    scopes = ['openid', 'profile', 'email', 'offline_access'],
  }: {
    redirectUri: string;
    scopes?: readonly string[];
  }): Authorization {
    validateRedirect(redirectUri);
    if (!scopes.includes('openid')) throw new TypeError('The openid scope is required');
    const codeVerifier = randomBytes(32).toString('base64url');
    const state = randomBytes(32).toString('base64url');
    const url = new URL('/api/auth/oauth2/authorize', this.#baseUrl);
    url.search = new URLSearchParams({
      response_type: 'code',
      client_id: this.#options.clientId,
      redirect_uri: redirectUri,
      scope: scopes.join(' '),
      state,
      code_challenge_method: 'S256',
      code_challenge: createHash('sha256').update(codeVerifier).digest('base64url'),
    }).toString();
    return { url: url.toString(), state, codeVerifier, redirectUri };
  }

  /** Validate callback origin/path/state, then exchange the code. Consume the stored authorization session once. */
  async completeAuthorization(
    callbackUrl: string,
    authorization: Authorization,
    options: { signal?: AbortSignal } = {},
  ): Promise<OAuthTokens> {
    const expected = validateRedirect(authorization.redirectUri);
    const callback = new URL(callbackUrl);
    if (
      callback.origin !== expected.origin ||
      callback.pathname !== expected.pathname ||
      callback.username ||
      callback.password ||
      callback.hash
    )
      throw new OAuthError('invalid_callback', 'OAuth callback does not match the redirect URI');
    for (const [key, value] of expected.searchParams)
      if (
        callback.searchParams.get(key) !== value ||
        callback.searchParams.getAll(key).length !== expected.searchParams.getAll(key).length
      )
        throw new OAuthError(
          'invalid_callback',
          'OAuth callback query does not match the redirect URI',
        );
    for (const key of ['state', 'code', 'error', 'error_description'])
      if (callback.searchParams.getAll(key).length > 1)
        throw new OAuthError('invalid_callback', 'OAuth callback contains duplicate parameters');
    const state = Buffer.from(callback.searchParams.get('state') ?? '');
    const original = Buffer.from(authorization.state);
    if (!state.length || state.length !== original.length || !timingSafeEqual(state, original))
      throw new OAuthError(
        'invalid_state',
        'OAuth callback state does not match the initiating session',
      );
    if (callback.searchParams.has('error'))
      throw new OAuthError(callback.searchParams.get('error')!, 'Authorization was not granted');
    const code = callback.searchParams.get('code');
    if (!code)
      throw new OAuthError('invalid_callback', 'OAuth callback is missing its authorization code');
    return this.exchangeCode(
      { code, codeVerifier: authorization.codeVerifier, redirectUri: authorization.redirectUri },
      options,
    );
  }

  /** Exchange a previously validated authorization code. Prefer completeAuthorization for HTTP callbacks. */
  async exchangeCode(
    {
      code,
      codeVerifier,
      redirectUri,
    }: { code: string; codeVerifier: string; redirectUri: string },
    options: { signal?: AbortSignal } = {},
  ): Promise<OAuthTokens> {
    validateRedirect(redirectUri);
    if (!code || !/^[A-Za-z0-9._~-]{43,128}$/.test(codeVerifier))
      throw new TypeError('An authorization code and valid PKCE verifier are required');
    return checkedTokens(
      await this.#post(
        'token',
        {
          grant_type: 'authorization_code',
          code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        },
        options.signal,
      ),
    );
  }

  /** Rotate an access token. Persist the returned refresh token atomically; token requests are never retried. */
  async refreshToken(
    refreshToken: string,
    options: { signal?: AbortSignal } = {},
  ): Promise<OAuthTokens> {
    if (!refreshToken) throw new TypeError('refreshToken is required');
    return checkedTokens(
      await this.#post(
        'token',
        { grant_type: 'refresh_token', refresh_token: refreshToken },
        options.signal,
      ),
    );
  }

  /** Revoke an access or refresh token. */
  async revokeToken(
    token: string,
    tokenTypeHint?: 'access_token' | 'refresh_token',
    options: { signal?: AbortSignal } = {},
  ): Promise<void> {
    if (!token) throw new TypeError('token is required');
    await this.#post(
      'revoke',
      { token, ...(tokenTypeHint ? { token_type_hint: tokenTypeHint } : {}) },
      options.signal,
    );
  }

  /** Build an in-memory, single-flight token provider. Use one per user grant, with external locking across processes. */
  createTokenProvider(
    initial: OAuthTokens,
    onTokenUpdate: (tokens: OAuthTokens) => Promise<void>,
  ): () => Promise<string> {
    let tokens = { ...initial };
    if (tokens.expires_at === undefined && tokens.expires_in !== undefined)
      tokens.expires_at = Math.floor(Date.now() / 1000) + tokens.expires_in;
    let pending: Promise<string> | undefined;
    let needsPersistence = false;
    const getToken = async (): Promise<string> => {
      if (needsPersistence) {
        await onTokenUpdate({ ...tokens });
        needsPersistence = false;
      }
      if (tokens.expires_at === undefined || tokens.expires_at > Date.now() / 1000 + 30)
        return tokens.access_token;
      if (!tokens.refresh_token)
        throw new OAuthError('reauthorization_required', 'The user must authorize again');
      const refreshed = await this.refreshToken(tokens.refresh_token);
      tokens = { ...refreshed, refresh_token: refreshed.refresh_token ?? tokens.refresh_token };
      needsPersistence = true;
      await onTokenUpdate({ ...tokens });
      needsPersistence = false;
      return tokens.access_token;
    };
    return (): Promise<string> => {
      pending ??= getToken().finally(() => {
        pending = undefined;
      });
      return pending;
    };
  }

  async #post(
    endpoint: 'token' | 'revoke',
    fields: Record<string, string>,
    callerSignal?: AbortSignal,
  ): Promise<unknown> {
    const body = new URLSearchParams(fields);
    const headers = new Headers({
      'content-type': 'application/x-www-form-urlencoded',
      accept: 'application/json',
    });
    if (this.#method === 'client_secret_basic') {
      const encoded = new URLSearchParams({
        id: this.#options.clientId,
        secret: this.#options.clientSecret!,
      });
      const parts = encoded
        .toString()
        .split('&')
        .map((part) => part.slice(part.indexOf('=') + 1));
      headers.set('authorization', `Basic ${Buffer.from(parts.join(':')).toString('base64')}`);
    } else {
      body.set('client_id', this.#options.clientId);
      if (this.#method === 'client_secret_post')
        body.set('client_secret', this.#options.clientSecret!);
    }
    const controller = new AbortController();
    const timer = setTimeout(
      () => controller.abort(new TimeoutError('OAuth request timed out')),
      this.#options.timeout,
    );
    const signal = callerSignal
      ? AbortSignal.any([callerSignal, controller.signal])
      : controller.signal;
    try {
      signal.throwIfAborted();
      let response: Response;
      try {
        response = await (this.#options.fetch ?? globalThis.fetch)(
          `${this.#baseUrl}/api/auth/oauth2/${endpoint}`,
          { method: 'POST', headers, body: body.toString(), redirect: 'manual', signal },
        );
      } catch {
        signal.throwIfAborted();
        throw new OAuthError('connection_error', 'Unable to reach the OAuth endpoint');
      }
      if (endpoint === 'revoke' && response.ok) {
        await response.body?.cancel();
        return;
      }
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        signal.throwIfAborted();
      }
      if (!response.ok) {
        const code =
          typeof payload === 'object' &&
          payload !== null &&
          'error' in payload &&
          typeof payload.error === 'string'
            ? payload.error
            : 'oauth_request_failed';
        throw new OAuthError(code, `OAuth request failed (${response.status})`, response.status);
      }
      return payload;
    } finally {
      clearTimeout(timer);
    }
  }
}
