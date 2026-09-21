# Local end-to-end testing

Unit tests use an injected fetch boundary and need no server or credentials. Run `yarn test` for those checks, or `yarn test:package` to verify an installed SDK archive with ESM, CommonJS and TypeScript consumers.

`scripts/live-test.ts` is an SDK client exercise against isolated local test services. It sends HTTP requests using this SDK; it contains no server implementation. It only accepts the origin `http://localhost:3024`.

Live checks require a test environment and a private fixture file supplied separately by a Prosaic maintainer. Server setup, database provisioning and fixture generation are maintained outside this public repository. The fixture contains throwaway test credentials and resource IDs; never commit it, include it in a package, or paste it into an issue. The default `.e2e-state.json` filename is ignored by Git.

Once the test services are running and you have a valid fixture, run:

```sh
yarn test:live /absolute/path/to/private/.e2e-state.json
# Exercise the same flow using only the installed SDK archive:
yarn test:package --live /absolute/path/to/private/.e2e-state.json
```

The exercise checks API-key authentication, invalid-key rejection, workspace selection, journal creation and readback, journal/ledger pagination, file upload and attachment, and OAuth authorization, refresh rotation and revocation. It covers public clients and both supported confidential-client authentication methods.

These checks create test records and OAuth registrations in the isolated environment. Use only the disposable fixture supplied for that purpose. Ask the maintainer to renew expired fixture credentials and coordinate test-service cleanup after verification.
