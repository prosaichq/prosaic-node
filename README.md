# Prosaic Node.js SDK

Build accounting integrations with Prosaic in TypeScript or JavaScript. Read transactions, create journals and work with financial reports through typed resource methods, with automatic pagination and OAuth helpers built in.

[Developer documentation](https://developer.prosaic.works/) · [API resource reference](docs/api-reference.md) · [Examples](examples) · [One-page quickstart](docs/sdk-quickstart.pdf)

**Node.js 22+ · TypeScript types included · ESM and CommonJS · No runtime dependencies**

> **Alpha — `0.1.0-alpha.1`.** The package is not published to npm yet. Install an archive using the steps below. Contacts endpoints and newer rules pagination are not supported in this version; see [compatibility](#alpha-compatibility).

## Installation

If you received `prosaic-sdk.tgz` from Prosaic, install it from your application directory:

```sh
yarn add ./prosaic-sdk.tgz
```

Otherwise, build the archive from this repository:

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

The repository is `prosaic-node`; the package you import is **`@prosaic/sdk`**.

## Your first API request

Use an API key for your own server-side integration. See the [developer documentation](https://developer.prosaic.works/) for API authentication and setup. Keep the key in your server environment.

Save this as `quickstart.mts`:

```ts
import Prosaic from '@prosaic/sdk';

const apiKey = process.env.PROSAIC_API_KEY;
if (!apiKey) throw new Error('Set PROSAIC_API_KEY before running this example.');

const prosaic = new Prosaic(apiKey);

// Confirm that authentication works.
const { data: me } = await prosaic.me.retrieve();
console.log(`Connected as ${me.name}`);

// Find the entity IDs to use in subsequent requests.
for await (const entity of prosaic.entities.list()) {
  console.log(entity.id, entity.name);
}
```

With `PROSAIC_API_KEY` set, run it using `tsx`:

```sh
yarn add --dev tsx
yarn tsx quickstart.mts
```

The client connects to `https://app.prosaic.works` by default. CommonJS applications can use `const { Prosaic } = require('@prosaic/sdk')` inside their existing async code.

## Examples

These examples use the `prosaic` client above. Replace `YOUR_ENTITY_ID` with an ID from `entities.list()`.

### Read transactions across every page

```ts
for await (const transaction of prosaic.transactions.list('YOUR_ENTITY_ID', {
  dateFrom: '2026-04-01',
  dateTo: '2026-04-30',
  pageSize: 100,
})) {
  console.log(transaction.id, transaction.date, transaction.amount);
}
```

`for await` fetches subsequent pages as you need them. To collect a bounded number of results into an array:

```ts
const transactions = await prosaic.transactions
  .list('YOUR_ENTITY_ID')
  .autoPagingToArray({ limit: 50 });
```

Awaiting `prosaic.transactions.list(...)` directly returns one page, including its response envelope. You can also use `autoPagingEach()` and return `false` to stop early. Pagination does not provide a fixed snapshot: records can change while you iterate.

### Create a balanced draft journal

This creates a **draft** with `autoPost: false`. Use account codes from `entityAccounts.list(entityId)` and a tax rate ID appropriate to your entity. Replace all placeholders before running it against a test entity.

```ts
import type { JournalsCreateParams } from '@prosaic/sdk';

const params: JournalsCreateParams = {
  date: '2026-04-01',
  narration: 'Opening balance',
  taxMode: 'NO_TAX',
  autoPost: false,
  lines: [
    {
      entityAccountCode: 'YOUR_DEBIT_ACCOUNT_CODE',
      taxRateId: 'YOUR_TAX_RATE_ID',
      debit: '10.25',
    },
    {
      entityAccountCode: 'YOUR_CREDIT_ACCOUNT_CODE',
      taxRateId: 'YOUR_TAX_RATE_ID',
      credit: '10.25',
    },
  ],
};

const journal = await prosaic.journals.create('YOUR_ENTITY_ID', params);
console.log(journal.id, journal.status);
```

Journal creation returns the journal directly. Most other resources return a `{ data }` envelope. The SDK preserves the API's response shape; exported TypeScript types show what each method returns.

## Authentication and workspaces

Keep API keys and confidential-client secrets on your server, outside browser bundles and source control. API keys and OAuth access tokens are sent as Bearer credentials.

To select a workspace, set `workspaceId` on the client or override it on an individual request:

```ts
const workspaceClient = new Prosaic(apiKey, {
  workspaceId: 'YOUR_WORKSPACE_ID',
});

const { data: me } = await workspaceClient.me.retrieve({
  workspaceId: 'ANOTHER_WORKSPACE_ID',
});
```

Workspace selection does not grant permissions or override a token pinned to a different workspace.

### Connect users with OAuth

Use OAuth when users authorise your application to access Prosaic on their behalf. Register an OAuth application first, then begin an authorisation-code flow with PKCE:

```ts
import { OAuth } from '@prosaic/sdk';

const clientId = process.env.PROSAIC_CLIENT_ID;
if (!clientId) throw new Error('Set PROSAIC_CLIENT_ID before starting OAuth.');

const oauth = new OAuth({
  clientId,
  clientSecret: process.env.PROSAIC_CLIENT_SECRET, // Omit for a public client.
});

const authorization = oauth.createAuthorization({
  redirectUri: 'https://your-app.example/oauth/callback',
});

// Store authorization in the initiating user's server-side session.
// Redirect their browser to authorization.url.
```

On the callback, consume the stored authorisation once and enforce a short expiry. `oauth.completeAuthorization(callbackUrl, authorization)` checks the redirect destination and state before exchanging the code. Persist the returned tokens securely, including `expires_at` and the refresh token.

Pass `oauth.createTokenProvider(tokens, persistTokens)` as the client's `accessToken` option to refresh expiring tokens automatically. Your `persistTokens` callback must atomically save the updated tokens and return a promise. See the [OAuth example](examples/oauth.ts) for a typed callback helper that connects these steps.

The default scopes are `openid profile email offline_access`. Create one token provider per user grant; applications with multiple processes must coordinate refresh-token rotation across them. An `invalid_grant` error requires the user to authorise again. The SDK returns ID tokens unchanged and does not verify them for application login.

## Errors and request options

Catch `APIError` for HTTP errors and use its status, code and request ID to diagnose a failed request:

```ts
import { APIError } from '@prosaic/sdk';

try {
  const { data: payload, requestId } = await prosaic.me.retrieve().withResponse();
  console.log(payload.data.name, requestId);
} catch (error) {
  if (error instanceof APIError) {
    console.error(error.status, error.code, error.requestId);
  } else {
    throw error;
  }
}
```

Typed errors include `AuthenticationError`, `PermissionError`, `NotFoundError`, `ValidationError`, `ConflictError` and `RateLimitError`. Transport failures use `ConnectionError`, `TimeoutError` or `InvalidResponseError`; OAuth failures use `OAuthError`. Validation details are available in `error.details` when the API supplies them. Keep those details out of public logs because they may contain application data.

| Option              | Default                     | Purpose                                                    |
| ------------------- | --------------------------- | ---------------------------------------------------------- |
| `baseUrl`           | `https://app.prosaic.works` | Server origin, without `/api/public/v1`.                   |
| `timeout`           | `30000`                     | Total request deadline in milliseconds, including retries. |
| `maxNetworkRetries` | `2`                         | Maximum retries for transient GET/HEAD failures.           |
| `workspaceId`       | Unset                       | Workspace to select for requests.                          |

Set defaults in the second argument to `new Prosaic(apiKey, options)`. Override `timeout`, `maxNetworkRetries` or `workspaceId` in a method's final request-options argument; pass `signal` there to cancel a request. For local development, `baseUrl: 'http://localhost:3024'` is supported. Other non-loopback origins require HTTPS.

Retries respect `Retry-After` within the request deadline. **Writes and OAuth token requests are never automatically retried.** There is no general idempotency-key contract, so check the outcome of a failed mutation before trying it again. Credential-bearing redirects are not followed.

## Working with financial data

- **Amounts:** preserve values as returned. Many financial decimals are strings; some endpoints, including invoice responses, return numbers. Use Decimal.js for calculations. Invoice line quantities, unit prices and tax rates are decimal strings on input.
- **Dates:** supply financial calendar dates as `YYYY-MM-DD`. The SDK leaves date strings unchanged; avoid converting calendar dates through your machine's timezone.
- **Responses:** most methods return `{ data }`; journal creation, reports and uploads return plain objects. Request and response types are exported, including `JournalsCreateParams`, `InvoicesCreateParams` and `EntitiesListResponse`.

<details>
<summary>Endpoint-specific details</summary>

- `charts.listAccounts(chartId)` lists a template's accounts. With `includeHidden: true`, the response is unpaginated.
- Chart reads expose display tax labels; writes need machine tax codes from entity tax rates.
- `journals.void()` and `journals.attachFiles()` take `logicalJournalId`, not the journal version's `id`.
- `files.upload(entityId, file)` accepts a `File` or `Blob`. Use a named `File`, or pass a `filename` request option for a `Blob`.
- Scheduled-task input `schedule` is a cadence/time object; its response `schedule` is display text.
- `extensions.request()` requires an extension-scoped token. Ordinary API keys and user OAuth tokens cannot call it. An upstream error is represented by embedded `status`/`ok` fields inside an HTTP 200 response.

</details>

## API coverage

This alpha includes 66 operations across 22 resource groups, generated from the checked-in [API contract](openapi/prosaic.json).

| Area                      | Resources                                                  |
| ------------------------- | ---------------------------------------------------------- |
| Identity and setup        | `me`, `version`, `entities`, `clients`                     |
| Accounts and dimensions   | `charts`, `entityAccounts`, `globalAccounts`, `dimensions` |
| Transactions and journals | `transactions`, `journals`, `changeSets`                   |
| Financial reporting       | `ledger`, `generalLedger`, `reports`, `gstReturns`         |
| Invoices and assets       | `invoices`, `fixedAssets`, `fixedAssetTypes`, `files`      |
| Automation and extensions | `rules`, `scheduledTasks`, `extensions`                    |

Use the [API resource reference](docs/api-reference.md) to find a method, and the [developer documentation](https://developer.prosaic.works/) for the wider API.

### Alpha compatibility

The SDK targets the **7 September 2026** API snapshot. The developer documentation may describe newer API capabilities.

- **Contacts:** newer contacts endpoints are not included in this alpha.
- **Rules pagination:** `rules.list()` has no pagination contract in this snapshot. Against the newer paginated endpoint, awaiting it returns only the first page; automatic iteration fails when more pages exist. Do not rely on it to enumerate every rule.
- **Generated code:** `yarn generate:check` confirms that code matches the checked-in snapshot. It does not verify compatibility with later server changes.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and API contract updates.

```sh
yarn install --immutable
yarn test
yarn typecheck
yarn generate:check
yarn lint
yarn format:check
yarn test:package
```

The package smoke test builds the SDK and checks installation in ESM and CommonJS consumers. See [local API testing](docs/local-testing.md), [release instructions](docs/releasing.md) and the [SDK skill](skills/prosaic-sdk/SKILL.md) for agent-assisted integrations.

Found an SDK bug? [Open an issue](https://github.com/prosaichq/prosaic-node/issues) with a minimal reproduction, SDK version and request ID where available. Remove credentials and customer data before sharing.

## License

[MIT](LICENSE).
