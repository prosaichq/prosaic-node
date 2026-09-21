/** Base error exposed by the SDK. No request credentials or request bodies are retained. */
export class ProsaicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = new.target.name;
  }
}

/** An HTTP error from Prosaic, with machine-readable validation and request metadata. */
export class APIError extends ProsaicError {
  readonly status: number;
  readonly code?: string;
  readonly details?: unknown;
  readonly requestId?: string;
  readonly headers: Headers;

  constructor(message: string, response: Response, body?: Record<string, unknown>) {
    super(message);
    this.status = response.status;
    this.code = typeof body?.code === 'string' ? body.code : undefined;
    this.details = body?.details ?? body?.issues;
    this.requestId =
      response.headers.get('x-request-id') ?? response.headers.get('request-id') ?? undefined;
    this.headers = new Headers(response.headers);
  }
}

export class AuthenticationError extends APIError {}
export class PermissionError extends APIError {}
export class NotFoundError extends APIError {}
export class ValidationError extends APIError {}
export class ConflictError extends APIError {}
export class RateLimitError extends APIError {}
export class ConnectionError extends ProsaicError {}
export class TimeoutError extends ConnectionError {}
export class InvalidResponseError extends ProsaicError {}

/** Convert an error response into the public error hierarchy. */
export function apiError(response: Response, payload: unknown): APIError {
  const body =
    typeof payload === 'object' && payload !== null && !Array.isArray(payload)
      ? (payload as Record<string, unknown>)
      : undefined;
  const message =
    typeof body?.error === 'string'
      ? body.error
      : `Prosaic API request failed (${response.status})`;
  const ErrorClass =
    (
      {
        400: ValidationError,
        401: AuthenticationError,
        403: PermissionError,
        404: NotFoundError,
        409: ConflictError,
        422: ValidationError,
        429: RateLimitError,
      } as Record<number, typeof APIError>
    )[response.status] ?? APIError;
  return new ErrorClass(message, response, body);
}
