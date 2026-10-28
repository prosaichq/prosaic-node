---
name: sdk-release
description: Prepare, verify and publish a Prosaic TypeScript SDK release, including contract drift, package contents, ESM/CommonJS consumers and release tags. Use when packaging or releasing this SDK.
---

# Release the SDK

Read `docs/releasing.md` and preserve the user's authorization scope. A request for a local build or package does not authorize registry publication, a GitHub release or a production deployment. When publication is authorized, prepare and verify the exact artifact before the final external action; do not ask again for authority already given.

Review the snapshot/generated diff, CHANGELOG and version. The package is `prosaic-node`, published from the public `prosaichq/prosaic-node` repository. Run tests, typecheck, generation drift checks, lint, format checks and `yarn test:package`; run affected live tests. Inspect the packed file list for secrets, private source and fixture state. The package should contain only runtime/declaration artifacts, the consumer skill, README, CHANGELOG, LICENSE and metadata.

Publish through the **Publish to npm** workflow described in `docs/releasing.md`; it waits for a maintainer's approval before publishing. Do not publish from a workstation except the documented first version. Do not send an alpha to `latest`. Never log registry credentials. Verify the published version by installing it in a fresh consumer and checking both ESM and CommonJS before reporting success. If publishing fails, inspect registry state for that exact version before retrying; do not assume a timed-out upload failed.

Report the exact version, artifact checks, registry result and any unresolved setup. A successful local pack is not a published release.
