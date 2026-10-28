# Releasing

The SDK is published to npm as [`prosaic-node`](https://www.npmjs.com/package/prosaic-node) from [prosaichq/prosaic-node](https://github.com/prosaichq/prosaic-node). Releases run through the **Publish to npm** workflow, which authenticates with npm trusted publishing. No npm token is stored in this repository or its secrets. Prereleases go to the `next` dist-tag; use `latest` only for a stable version.

## Prepare a release

1. Export the current server contract and review its diff. Run `yarn generate`; document breaking changes and new methods in CHANGELOG.md. Public method names, request/response types and supported Node versions are compatibility commitments.
2. Update package.json's version and the user-agent version in `src/transport.ts` together.
3. Run `yarn test`, `yarn typecheck`, `yarn generate:check`, `yarn lint`, `yarn format:check`, `yarn test:package`, and the live tests for changed behavior. `test:package` packs the SDK, rejects anything other than dist, the consumer skill, README, CHANGELOG, LICENSE and package metadata, and installs the archive in fresh ESM, CommonJS and TypeScript consumers.
4. Merge, tag the merge commit `v<version>` and push the tag.

## Publish

1. In GitHub Actions, run **Publish to npm** with the tag. Select **dry run** to check and pack without publishing.
2. The workflow checks the tag against package.json and the user-agent version, repeats the release checks, packs the archive and lists its contents. Publishing waits for a maintainer's approval in the `npm-publish` environment, then publishes that archive. npm attaches provenance automatically.
3. Install the exact registry version into a fresh consumer and check ESM and CommonJS. Record the released version and server-contract revision.

A published version cannot be reused: fix defects in a new version, and deprecate or move the dist-tag when appropriate. If a publish fails or times out, check the registry for that exact version before retrying.

## Registry setup

A package owner completes these steps once:

1. npm only accepts a trusted publisher for an existing package, so publish the first version manually from a checkout of its tag, after running the release checks:

   ```sh
   yarn pack --out prosaic-node.tgz
   npm publish prosaic-node.tgz --access public --tag next
   ```

2. In the repository settings, create the `npm-publish` environment with required reviewers.
3. On npmjs.com, add a trusted publisher to the package: GitHub Actions, organization `prosaichq`, repository `prosaic-node`, workflow `publish.yml`, environment `npm-publish`. npm removes a trusted publisher that is not used within two days, so add it shortly before the first workflow release.
4. After the first workflow release succeeds, set the package's publishing access to require two-factor authentication and disallow tokens.
