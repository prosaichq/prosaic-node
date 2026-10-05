# Changelog

## 0.1.0-alpha.2 (unreleased)

- Regenerated from the 5 October 2026 API snapshot: 73 operations across 23 resource groups.
- Added `contacts` with `list`, `create`, `retrieve`, `update`, `del`, `archive` and `restore`.
- `rules.list()` now follows the paginated rules endpoint, so automatic iteration reads every page.
- Updated request and response types for clients, rules, invoices and fixed assets to match the current API.

## 0.1.0-alpha.1 (unreleased)

- Typed resource methods for the 66 public API v1 operations in the 7 September 2026 snapshot, with a reproducible contract. See README.md for known compatibility gaps with newer server versions.
- API-key and OAuth bearer access, workspace selection, S256 PKCE, callback validation, refresh rotation, and token revocation.
- Pagination, multipart uploads, typed errors, response metadata, cancellation and bounded safe-read retries.
- ESM/CommonJS packaging, local testing guidance, and consumer/maintainer agent skills.
- Public source at prosaichq/prosaic-node, archive installation instructions, and a shareable quickstart. npm publication remains pending.
