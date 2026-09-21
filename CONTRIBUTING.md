# Contributing

Use Node.js 22 or 24 and Yarn 4. Run `yarn install` to install development tools. Consumers need no runtime dependencies.

## Change an endpoint

Obtain a reviewed public API contract from the Prosaic maintainers and replace `openapi/prosaic.json`. This repository contains the SDK and its public contract; server implementation and export tooling stay outside it. Regenerate and verify the SDK locally:

```sh
yarn generate
yarn test
yarn typecheck
yarn generate:check
```

Each operation needs a stable `resource.method` operation ID, request parameters, successful response schemas and any pagination or authentication requirements. Preserve optional defaults and date/decimal serialization. Runtime validation is enforced by the API; TypeScript is not a replacement for it.

Review the snapshot and generated diff together. Watch response envelopes, nullable fields, defaulted input, money serialization, page-number lists, route IDs injected by the server, and unusual auth requirements. A new method needs a server-side test that fails first and a consumer example/type assertion proving its intended call works. Never fill an unresolved contract with `any`.

For transport/OAuth changes, extend the nearest tests with a distinct failure mode and observe red before implementing. Test redirects, cancellation, mutation non-replay, state checks and token rotation when those boundaries change. Run a packed consumer smoke test before releasing; direct source imports cannot prove package exports work.

The public snapshot is checked in so contributors can test, typecheck and build without access to the private server. CI verifies regeneration is deterministic. Maintainers review a fresh public contract to detect new or changed endpoints; do not silently regenerate from a production URL during a build.
