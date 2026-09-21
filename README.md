# Prosaic TypeScript SDK

Typed access to the Prosaic public API, with resource methods inspired by [Stripe's Node SDK](https://github.com/stripe/stripe-node). Supports Node.js 22+, ESM and CommonJS. This is an initial alpha; the package has not been published to npm.

## Install the alpha

The repository is `prosaichq/prosaic-node`; the package and import name are `@prosaic/sdk`. Build an installable archive from this source:

```sh
git clone https://github.com/prosaichq/prosaic-node.git
cd prosaic-node
corepack enable
yarn install --immutable
yarn pack --out prosaic-sdk.tgz
```

Then, from your application directory:

```sh
yarn add /absolute/path/prosaic-node/prosaic-sdk.tgz
```

If Prosaic supplied an archive, install it directly with `yarn add ./prosaic-sdk.tgz`. See the [one-page quickstart](docs/sdk-quickstart.pdf) for installation, authentication and two examples.

**Alpha compatibility:** the checked-in contract covers 66 operations from the 7 September 2026 server snapshot. Newer contacts endpoints and rules pagination are not included yet. Against the newer paginated rules endpoint, `rules.list()` returns only the first page and automatic iteration can fail when more pages exist. Do not depend on complete rules enumeration with this alpha. Regeneration checks validate the checked-in snapshot, not compatibility with later server changes.

## Quick start

```ts
import Prosaic from '@prosaic/sdk';

const prosaic = new Prosaic(process.env.PROSAIC_API_KEY!);
const { data: me } = await prosaic.me.retrieve();
const { data: entities } = await prosaic.entities.list();
console.log(
  me.name,
  entities.map((entity) => entity.name),
);
```

For local development, pass `{ baseUrl: 'http://localhost:3024' }` as the second argument. `baseUrl` is the server origin, without `/api/public/v1`. HTTPS is required except on loopback hosts. Keep keys and confidential-client secrets on your server.

For CommonJS: `const { Prosaic } = require('@prosaic/sdk')`.

## Authentication

API keys and OAuth access tokens both travel as Bearer credentials. Select a workspace with a client default or per-request `workspaceId`:

```ts
const prosaic = new Prosaic({
  accessToken: tokens.access_token,
  workspaceId: selectedWorkspaceId,
});
const me = await prosaic.me.retrieve({ workspaceId: anotherWorkspaceId });
```

A workspace header does not grant permissions or override a token pinned to another workspace. Permission checks remain on the server.

### OAuth authorization code with PKCE

Register an OAuth application with Prosaic first. Public clients use PKCE without a secret; confidential web applications also authenticate with their client secret. See [OAuth security guidance](https://www.rfc-editor.org/rfc/rfc9700.html).

```ts
import { OAuth, Prosaic } from '@prosaic/sdk';

const oauth = new OAuth({
  clientId: process.env.PROSAIC_CLIENT_ID!,
  clientSecret: process.env.PROSAIC_CLIENT_SECRET, // omit for a public client
});

const authorization = oauth.createAuthorization({
  redirectUri: 'https://your-app.example/oauth/callback',
});
// Store authorization in the initiating user's server-side session, then
// redirect their browser to authorization.url. Do not log the verifier.

// On callback, consume that session record once; enforce a short login expiry.
const tokens = await oauth.completeAuthorization(callbackUrl, authorization);
// Save tokens, including expires_at and the rotated refresh_token, securely.

const tokenProvider = oauth.createTokenProvider(tokens, async (updated) => {
  await saveTokensForThisUser(updated);
});
const prosaic = new Prosaic({ accessToken: tokenProvider });
const { data: me } = await prosaic.me.retrieve();
```

The default scopes are `openid profile email offline_access`. Request `offline_access` for refresh tokens. Supported client authentication methods are `none`, `client_secret_basic` (the confidential-client default), and `client_secret_post`. You can also call `exchangeCode`, `refreshToken`, and `revokeToken` directly. `completeAuthorization` checks the redirect destination and state before sending a code.

Create one token provider per user grant. It shares a single refresh across concurrent requests in that instance and waits for persistence before returning a rotated token. Applications with multiple processes need a distributed lock around refresh-token rotation. Handle `invalid_grant` by asking the user to authorize again. Tokens without expiry metadata cannot be proactively refreshed; persist the returned `expires_at` value. ID tokens are returned unchanged; this SDK does not verify them or turn their claims into an authenticated application session.

## Resources and types

The 66 supported operations are generated from the checked-in [API contract](openapi/prosaic.json). See the [resource reference](docs/api-reference.md). Request and response types are exported by method, such as `JournalsCreateParams`, `InvoicesCreateParams`, and `EntitiesListResponse`.

```ts
import type { JournalsCreateParams } from '@prosaic/sdk';

const params: JournalsCreateParams = {
  date: '2026-04-01',
  narration: 'Opening journal',
  taxMode: 'NO_TAX',
  lines: [
    { entityAccountCode: '1000', taxRateId, debit: '10.25' },
    { entityAccountCode: '4000', taxRateId, credit: '10.25' },
  ],
};
const journal = await prosaic.journals.create(entityId, params);
```

Responses preserve the API's exact JSON envelope. Most return `{ data }`; journal creation, reports and uploads return plain objects. Dates stay strings. Financial decimals stay strings where the server serializes Decimal values; some endpoints, including invoices, return numeric amounts. Use Decimal.js for calculations. Supply financial calendar dates as `YYYY-MM-DD`; do not shift them through your machine's timezone.

Some contracts need special care:

- `charts.listAccounts(chartId)` lists a template's accounts. With `includeHidden: true`, the server returns an unpaginated list.
- Chart reads expose display tax labels; writes need machine tax codes from entity tax rates.
- `journals.void` and `journals.attachFiles` take the returned `logicalJournalId`, not the journal version's `id`.
- Invoice line quantities, unit prices and tax rates are decimal strings on input.
- Scheduled-task input `schedule` is a cadence/time object; its response `schedule` is display text.
- `extensions.request` requires an extension-scoped token. Ordinary API keys and user OAuth tokens cannot call it. An upstream error is represented by its embedded `status`/`ok` inside an HTTP 200 response.

## Pagination, uploads and errors

```ts
for await (const transaction of prosaic.transactions.list(entityId, { pageSize: 100 })) {
  console.log(transaction.id);
}
const first50 = await prosaic.journals.list(entityId).autoPagingToArray({ limit: 50 });
const uploaded = await prosaic.files.upload(
  entityId,
  new File([bytes], 'receipt.pdf', {
    type: 'application/pdf',
  }),
);
```

Awaiting a list returns one page. Iteration follows the API's page-number pagination; it also works for unpaginated lists. Use `autoPagingEach` and return `false` to stop early. Page contents can change while you iterate; the API does not promise a snapshot.

```ts
import { APIError } from '@prosaic/sdk';

try {
  const { data, response, requestId } = await prosaic.me.retrieve().withResponse();
} catch (error) {
  if (error instanceof APIError) {
    console.error(error.status, error.code, error.requestId);
    // error.details carries validation details when supplied by the API.
  }
}
```

Errors include `AuthenticationError`, `PermissionError`, `NotFoundError`, `ValidationError`, `ConflictError`, `RateLimitError`, `ConnectionError`, `TimeoutError`, `InvalidResponseError`, and `OAuthError`. HTTP error metadata does not retain request headers or bodies. Treat response error details as potentially sensitive application data.

The default timeout is 30 seconds. GET/HEAD requests retry transient failures at most twice, honoring `Retry-After` within the total deadline. Writes and OAuth token requests are never automatically retried: the server has no general idempotency-key contract. Configure `timeout`/`maxNetworkRetries` globally or per request; pass `signal` for cancellation. Credential-bearing redirects are not followed.

## Local development

```sh
yarn install
yarn test
yarn typecheck
yarn generate:check
yarn lint
yarn format:check
yarn build
yarn pack --out prosaic-sdk.tgz
```

Install the tarball in a separate consumer with `yarn add /absolute/path/prosaic-sdk.tgz`. See [CONTRIBUTING.md](CONTRIBUTING.md) for contract updates, [local end-to-end testing](docs/local-testing.md), and [release instructions](docs/releasing.md). The API snapshot makes this repository buildable without the private Prosaic monorepo. See [skills](skills/prosaic-sdk/SKILL.md) for agent-assisted use and maintenance.
