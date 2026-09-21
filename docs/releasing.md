# Releasing

The initial version is `0.1.0-alpha.1` and has not been published to npm. The public source repository is [prosaichq/prosaic-node](https://github.com/prosaichq/prosaic-node). The intended package is `@prosaic/sdk`; confirm ownership of that registry scope before a first release. Resolve the compatibility gaps documented in README.md before publishing a package for the current server API.

1. Export the current server contract and review its diff. Run `yarn generate`; document breaking changes and new methods in CHANGELOG.md. Public method names, request/response types and supported Node versions are compatibility commitments.
2. Run `yarn test`, `yarn typecheck`, `yarn generate:check`, `yarn lint`, `yarn format:check`, and the live tests for changed behavior.
3. Update package.json's version and the SDK user-agent version together. Run `yarn pack --out prosaic-sdk.tgz` and inspect `tar -tzf prosaic-sdk.tgz`. Only dist, skills, README, CHANGELOG, LICENSE and package metadata should be included; no environment files, fixture state, tests, or private server files.
4. Install the tarball in a fresh consumer and exercise both ESM and CommonJS, including TypeScript module resolution. The `test:package` command automates this without publishing.
5. After publication is authorized and npm credentials/scope are configured, publish with `yarn npm publish --access public --tag next` for prereleases. Use `latest` only for a stable version. Do not publish an alpha under `latest`.
6. Verify the exact registry version and install it into a fresh consumer. Create the matching source tag/release under the authorized repository workflow. Record the released version and server-contract revision.

Registry publication is not required for local end-to-end testing. Configure npm trusted publishing/provenance once the repository and registry identities are known; never store an npm token in this repository. A published version cannot be reused: fix defects in a new version, and deprecate or roll back the distribution tag when appropriate.
