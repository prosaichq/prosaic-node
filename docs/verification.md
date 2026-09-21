# Local verification

Verified with Node.js 24.12.0 and Yarn 4.17.1 against the 7 September 2026 public API snapshot and isolated local test services.

- Contract export: 66 operations across all 53 public v1 route files; no missing operation mappings. Eight compiler/contract tests passed.
- SDK: 35 tests passed, covering transport, errors, pagination, OAuth, and generated resource behavior. Strict TypeScript, lint, formatting, and generation-drift checks passed.
- Package: the local tarball installed into a fresh consumer; ESM and CommonJS runtime imports and TypeScript declarations passed. Its allowlist excluded credentials, fixture state, tests, and private server source.
- Installed-package live checks: API-key authentication and invalid-key rejection, workspace selection, balanced posted journal creation/readback, multi-page journals and ledger iteration, real multipart file upload to local MinIO, and attachment using the logical journal ID.
- Real OAuth flows passed for public clients (`none`) and confidential clients (`client_secret_basic`, `client_secret_post`): S256 PKCE authorization and consent, code exchange, authenticated API access, refresh-token rotation, refreshed API access, revocation, and rejection of the revoked refresh token.

The live checks used isolated test services and a throwaway user, workspace and entity. No production data or credentials were used. A pre-authenticated fixture session bypassed email delivery, not OAuth authorization or token issuance. Server setup and private fixture material are maintained outside this repository.

Generated endpoint coverage is not the same as live execution of every endpoint. External banking/IRD integrations, extension-scoped upstream calls, background workers, production deployment, and registry publication were not exercised. Node.js 22 is configured in CI but has not been run locally. Reproduce checks with `docs/local-testing.md`; registry credentials and a public repository are not required.
