import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import openapiTS, { astToString } from 'openapi-typescript';
import { generateResources, type SDKSpec } from './generate-resources.js';

const specPath = new URL('../openapi/prosaic.json', import.meta.url);
const spec = JSON.parse(readFileSync(specPath, 'utf8')) as SDKSpec;
const resources = generateResources(spec);
const types = astToString(await openapiTS(specPath));
const reference =
  '# API resource reference\n\nGenerated from the reviewed API snapshot. Path IDs come first, then query/body parameters, then request options.\n\n| SDK method | HTTP endpoint |\n| --- | --- |\n' +
  Object.entries(spec.paths)
    .flatMap(([path, methods]) =>
      Object.entries(methods).map(
        ([method, operation]) =>
          `| \`${operation.operationId}\` | \`${method.toUpperCase()} ${path}\` |`,
      ),
    )
    .sort()
    .join('\n') +
  '\n';
mkdirSync(new URL('../src', import.meta.url), { recursive: true });
mkdirSync(new URL('../docs', import.meta.url), { recursive: true });
for (const [file, content] of [
  ['src/resources.ts', resources],
  ['src/types.ts', types],
  ['docs/api-reference.md', reference],
]) {
  const path = new URL(`../${file}`, import.meta.url);
  if (process.argv.includes('--check')) {
    if (readFileSync(path, 'utf8') !== content)
      throw new Error(`${file} has drifted; run yarn generate`);
  } else writeFileSync(path, content!);
}
console.log(`SDK generation ${process.argv.includes('--check') ? 'verified' : 'completed'}`);
