import Prosaic, { OAuth, type Authorization, type OAuthTokens } from '../src/index.js';

/** Create the OAuth helpers for a server application; store the Authorization in the user's session. */
export function createOAuth(clientId: string, clientSecret?: string): OAuth {
  return new OAuth({ clientId, clientSecret });
}

/** Complete a callback after retrieving and consuming the initiating user's stored authorization. */
export async function completeLogin(
  oauth: OAuth,
  callbackUrl: string,
  authorization: Authorization,
  persist: (tokens: OAuthTokens) => Promise<void>,
): Promise<Prosaic> {
  const tokens = await oauth.completeAuthorization(callbackUrl, authorization);
  await persist(tokens);
  return new Prosaic({ accessToken: oauth.createTokenProvider(tokens, persist) });
}
