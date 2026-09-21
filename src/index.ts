import { Resources } from './resources.js';
import { Transport, type TransportOptions } from './transport.js';

/** The Prosaic public API client. Supply an API key or an OAuth access token/provider. */
export class Prosaic extends Resources {
  constructor(
    credential: string | TransportOptions,
    options: Omit<TransportOptions, 'apiKey' | 'accessToken'> = {},
  ) {
    super(
      new Transport(
        typeof credential === 'string' ? { ...options, apiKey: credential } : credential,
      ),
    );
  }
}

export default Prosaic;
export { OAuth, OAuthError } from './oauth.js';
export type { OAuthOptions, OAuthTokens, Authorization } from './oauth.js';
export * from './errors.js';
export { APIPromise, APIListPromise } from './pagination.js';
export type {
  TransportOptions as ProsaicOptions,
  RequestOptions,
  APIResponse,
} from './transport.js';
export type * from './resources.js';
export type * from './types.js';
