---
name: sdk-endpoints
description: Add or update a Prosaic SDK endpoint from a reviewed public API contract, generate types and resource methods, and validate a consumer. Use for SDK maintenance, not ordinary application usage.
---

# Maintain endpoint support

Read CLAUDE.md and CONTRIBUTING.md. `openapi/prosaic.json` is the reviewed public contract. Obtain an updated contract from the Prosaic maintainers; server implementation and export tooling stay outside this public repository. Never hand-edit generated `src/types.ts` or `src/resources.ts`.

Require stable `resource.method` operation IDs and resolved request/response schemas in the supplied contract. Keep existing method names compatible. Do not fill unresolved schemas with `any` or invent an endpoint when the authoritative contract is unavailable.

Inspect the snapshot diff against the documented API behavior. Check status codes and raw versus `{data}` envelopes, nullable fields, decimal/date serialization, input defaults, path parameters, array-query encoding, pagination and auth restrictions. TypeScript types do not encode every server validation refinement. Preserve or add the relevant documentation.

Run `yarn generate`, then a failing consumer/transport test for any new behavior before implementing it. Add a compile-checked example of the new method and check that omitted required fields are rejected. Run the SDK tests, typecheck, regeneration check and packed-consumer test. For auth, uploads or financial writes, exercise the relevant local live test too.

Update CHANGELOG.md with the consumer-visible change and choose a compatible version under the release policy. Prepare the package locally; use the release skill for publication only within the user's authorized scope.
