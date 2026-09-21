# Prosaic SDK

Read README.md and CONTRIBUTING.md before changing code. This is a public repository: never copy credentials, customer data, private server source, encrypted environment files, or local fixture state into it.

Use Yarn, strict TypeScript, Vitest, Oxlint and Oxfmt. The runtime has no package dependencies and targets Node.js 22+. Preserve ESM and CommonJS consumers. Changes in runtime behavior follow TDD: write the failing test, observe red, implement, then observe green. Prefer a distinct boundary or regression test over duplicate examples.

The source of API truth is `openapi/prosaic.json`, exported from the Prosaic server's route and model types. `src/resources.ts` and `src/types.ts` are generated. Change the server contract and regenerate rather than editing generated files. `yarn generate:check` rejects drift. Explicit operation IDs are consumer API names and must remain stable across compatible releases.

Preserve JSON response envelopes, decimal strings, and financial date strings. Do no financial arithmetic with native numbers; use Decimal.js in applications that calculate money. Do not implicitly parse dates or apply the developer machine's timezone.

Never retry mutations or token exchanges automatically. Do not follow credential-bearing HTTP redirects. Validate origin/path construction, OAuth callback state, and PKCE. Never log tokens, client secrets, verifiers or request bodies. Token storage and cross-process refresh coordination belong to consumers; keep their responsibilities explicit in examples.

Before finishing, run `yarn test`, `yarn typecheck`, `yarn generate:check`, `yarn lint`, `yarn format:check`, and a package build/consumer smoke test. Runtime and generated type changes need a matching changelog entry. Never claim live API verification from mocked HTTP tests.

Relevant skills live in `skills/`: `prosaic-sdk` for consumers, `sdk-endpoints` for adding endpoint support, and `sdk-release` for packaging and publication. Read the matching SKILL.md. Publication, remote repository creation, credentials, and registry ownership are separate from preparing and testing a local package; preserve the user's authorization scope.
