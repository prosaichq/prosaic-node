import { apiError, ConnectionError, InvalidResponseError, TimeoutError } from './errors.js';

export type AccessToken = string | (() => string | Promise<string>);
export type QueryValue =
  | string
  | number
  | boolean
  | readonly (string | number | boolean)[]
  | undefined;
export type Query = Record<string, QueryValue>;
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'HEAD';

export interface TransportOptions {
  apiKey?: string;
  accessToken?: AccessToken;
  /** An origin such as https://app.prosaic.works; HTTP is allowed only for loopback development. */
  baseUrl?: string;
  workspaceId?: string;
  /** Total network deadline in milliseconds, including retries. Default: 30,000. */
  timeout?: number;
  /** Safe-read retries only. Mutations are never retried. Default: 2; maximum: 10. */
  maxNetworkRetries?: number;
  fetch?: typeof fetch;
}

export interface RequestOptions {
  accessToken?: string;
  workspaceId?: string;
  timeout?: number;
  maxNetworkRetries?: number;
  signal?: AbortSignal;
}

export interface RequestPayload {
  query?: Query;
  body?: unknown;
}
export interface APIResponse<T> {
  data: T;
  response: Response;
  requestId?: string;
}

/** Validate an origin before attaching credentials. */
export function validateOrigin(input: string): string {
  const url = new URL(input);
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash)
    throw new TypeError('baseUrl must be an origin without credentials, path, query or fragment');
  if (
    url.protocol !== 'https:' &&
    !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname))
  )
    throw new TypeError('HTTPS is required outside loopback development');
  return url.origin;
}

function positiveTimeout(value: number): number {
  if (!Number.isFinite(value) || value <= 0 || value > 2_147_483_647)
    throw new TypeError('timeout must be a positive finite millisecond value');
  return value;
}

function retries(value: number): number {
  if (!Number.isInteger(value) || value < 0 || value > 10)
    throw new TypeError('maxNetworkRetries must be an integer from 0 to 10');
  return value;
}

function validatePath(path: string): void {
  if (
    !/^\/api\/public\/v1(?:\/|$)/.test(path) ||
    /[?#\\]/.test(path) ||
    path.split('/').some((segment) => ['.', '..'].includes(decodeURIComponent(segment)))
  )
    throw new TypeError('Invalid public API path');
}

/** Encode a single resource identifier without allowing dot-segment traversal. */
export function pathParam(value: string): string {
  if (typeof value !== 'string' || !value || value === '.' || value === '..')
    throw new TypeError('A non-empty resource identifier is required');
  return encodeURIComponent(value);
}

function retryDelay(response: Response | undefined, attempt: number): number {
  const header = response?.headers.get('retry-after');
  if (header) {
    const delay = /^\d+(\.\d+)?$/.test(header)
      ? Number(header) * 1000
      : Date.parse(header) - Date.now();
    if (Number.isFinite(delay)) return Math.max(0, Math.min(delay, 2_147_483_647));
  }
  return Math.min(500 * 2 ** attempt, 5000) * (0.75 + Math.random() * 0.25);
}

function delay(ms: number, signal: AbortSignal): Promise<void> {
  signal.throwIfAborted();
  return new Promise((resolve, reject) => {
    const onAbort = (): void => {
      clearTimeout(timer);
      reject(signal.reason);
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal.addEventListener('abort', onAbort, { once: true });
  });
}

function withAbort<T>(pending: Promise<T>, signal: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    const onAbort = (): void => reject(signal.reason);
    signal.addEventListener('abort', onAbort, { once: true });
    if (signal.aborted) onAbort();
    pending.then(
      (value) => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener('abort', onAbort);
        reject(error);
      },
    );
  });
}

/** Send authenticated public API requests with bounded safe-read retries. */
export class Transport {
  readonly baseUrl: string;
  readonly #options: TransportOptions;
  readonly #fetch: typeof fetch;

  constructor(options: TransportOptions) {
    if (options.apiKey !== undefined && options.accessToken !== undefined)
      throw new TypeError('Provide either apiKey or accessToken');
    if (!options.apiKey && !options.accessToken)
      throw new TypeError('An API key or access token is required');
    this.baseUrl = validateOrigin(options.baseUrl ?? 'https://app.prosaic.works');
    positiveTimeout(options.timeout ?? 30_000);
    retries(options.maxNetworkRetries ?? 2);
    this.#options = { ...options };
    this.#fetch = options.fetch ?? globalThis.fetch;
  }

  /** Send a request and retain its HTTP metadata alongside the unchanged JSON payload. */
  async request<T = unknown>(
    method: HttpMethod,
    path: string,
    payload: RequestPayload = {},
    options: RequestOptions = {},
  ): Promise<APIResponse<T>> {
    validatePath(path);
    const url = new URL(path, this.baseUrl);
    for (const [key, value] of Object.entries(payload.query ?? {})) {
      if (value !== undefined)
        url.searchParams.set(key, Array.isArray(value) ? value.join(',') : String(value));
    }
    const headers = new Headers({
      accept: 'application/json',
      'user-agent': 'prosaic-sdk/0.1.0-alpha.1',
    });
    const workspace = options.workspaceId ?? this.#options.workspaceId;
    if (workspace) headers.set('x-workspace-id', workspace);
    let body: BodyInit | undefined;
    if (payload.body !== undefined) {
      if (method === 'GET' || method === 'HEAD')
        throw new TypeError(`${method} does not accept a request body`);
      if (payload.body instanceof FormData) body = payload.body;
      else {
        headers.set('content-type', 'application/json');
        body = JSON.stringify(payload.body);
      }
    }
    const maxRetries = retries(options.maxNetworkRetries ?? this.#options.maxNetworkRetries ?? 2);
    const canRetry = method === 'GET' || method === 'HEAD';
    const deadline = new AbortController();
    const timeout = positiveTimeout(options.timeout ?? this.#options.timeout ?? 30_000);
    const timer = setTimeout(
      () => deadline.abort(new TimeoutError(`Request exceeded ${timeout}ms`)),
      timeout,
    );
    const signal = options.signal
      ? AbortSignal.any([deadline.signal, options.signal])
      : deadline.signal;
    try {
      signal.throwIfAborted();
      const configured = this.#options.accessToken;
      const token =
        options.accessToken ??
        (typeof configured === 'function'
          ? await withAbort(Promise.resolve(configured()), signal)
          : configured) ??
        this.#options.apiKey;
      if (typeof token !== 'string' || !token.trim())
        throw new TypeError('Credential must be a non-empty string');
      headers.set('authorization', `Bearer ${token}`);
      for (let attempt = 0; ; attempt++) {
        signal.throwIfAborted();
        let response: Response;
        try {
          response = await this.#fetch(url.toString(), {
            method,
            headers,
            body,
            signal,
            redirect: 'manual',
          });
        } catch {
          signal.throwIfAborted();
          if (canRetry && attempt < maxRetries) {
            await delay(retryDelay(undefined, attempt), signal);
            continue;
          }
          throw new ConnectionError('Unable to reach the Prosaic API');
        }
        if (
          canRetry &&
          attempt < maxRetries &&
          [429, 500, 502, 503, 504].includes(response.status)
        ) {
          await response.body?.cancel();
          await delay(retryDelay(response, attempt), signal);
          continue;
        }
        let parsed: unknown;
        if (response.status !== 204 && method !== 'HEAD') {
          try {
            parsed = await response.clone().json();
          } catch {
            signal.throwIfAborted();
            if (response.ok) throw new InvalidResponseError('Prosaic returned malformed JSON');
          }
        }
        if (!response.ok) throw apiError(response, parsed);
        return {
          data: parsed as T,
          response,
          requestId:
            response.headers.get('x-request-id') ?? response.headers.get('request-id') ?? undefined,
        };
      }
    } finally {
      clearTimeout(timer);
    }
  }
}
