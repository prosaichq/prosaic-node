---
name: prosaic-sdk
description: Build a TypeScript integration with the Prosaic SDK using API keys or OAuth, resource methods, financial data, pagination and uploads. Use for SDK consumers, not for implementing Prosaic server endpoints.
---

# Integrate with Prosaic

Read the installed SDK README and the relevant exported method types. Prefer the typed resource method over inventing HTTP paths. The package is `@prosaic/sdk`; instantiate `new Prosaic(apiKey)` or `new Prosaic({ accessToken })`. `baseUrl` is an origin, not an API path.

Use an API key for a user's own server-side integration. Use `OAuth` for delegated user access: S256 PKCE, state stored in the initiating user's session, `completeAuthorization` on callback, secure token persistence, and `offline_access` when refresh is needed. Do not use a decoded access or ID token as proof of identity. The SDK does not verify ID tokens. Consume pending login state once and expire it promptly.

Use one `createTokenProvider` per user grant. Persist rotated refresh tokens atomically and coordinate refreshes across application processes. `invalid_grant` requires reauthorization; do not repeatedly retry an invalid refresh token. Never expose keys or confidential client secrets in browser bundles.

Keep JSON envelopes: most results have `.data`; reports, uploads and journal creation return plain objects. Keep dates as strings and monetary values exactly as returned; use Decimal.js for arithmetic. Input invoice amounts are decimal strings. Account tax labels in responses are not necessarily valid machine tax codes for writes.

Await a list for one page, or use `for await`/`autoPagingToArray({ limit })`. Pass `workspaceId` and `signal` in the last request-options argument. Workspace selection does not bypass permissions. Never automatically retry a financial mutation after a connection error: its outcome may be unknown and the API has no general idempotency key.

Test against a local server or an injected fetch boundary. Never perform a production mutation just to demonstrate usage. Provide runnable examples and check their TypeScript types. For request failures, use `APIError.status`, `.code`, `.details`, and `.requestId`; keep credentials and response details out of public logs.
