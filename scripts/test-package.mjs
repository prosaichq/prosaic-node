import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import ts from 'typescript';

const fixture = mkdtempSync(join(tmpdir(), 'prosaic-sdk-consumer-'));
const archive = join(fixture, 'sdk.tgz');
execFileSync('yarn', ['pack', '--out', archive], { stdio: 'pipe' });
const entries = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' }).trim().split('\n');
for (const entry of entries)
  if (
    !/^package\/(dist\/|skills\/prosaic-sdk\/|package\.json$|README\.md$|CHANGELOG\.md$|LICENSE$)/.test(
      entry,
    )
  )
    throw new Error(`Unexpected packed file: ${entry}`);
if (!entries.includes('package/skills/prosaic-sdk/SKILL.md'))
  throw new Error('The consumer skill is missing from the package');
const current = JSON.parse(readFileSync('package.json', 'utf8'));
writeFileSync(
  join(fixture, 'package.json'),
  JSON.stringify({
    private: true,
    type: 'module',
    packageManager: current.packageManager,
    dependencies: { 'prosaic-node': `file:${archive}` },
    devDependencies: {
      typescript: current.devDependencies.typescript,
      '@types/node': current.devDependencies['@types/node'],
    },
  }),
);
writeFileSync(join(fixture, '.yarnrc.yml'), 'nodeLinker: node-modules\n');
execFileSync('yarn', ['install', '--mode', 'skip-build', '--no-immutable'], {
  cwd: fixture,
  stdio: 'inherit',
});
const exercise = `const client = new Prosaic({ apiKey: 'package-test', fetch: async () => Response.json({data:{id:'packed'}}) }); const result = await client.me.retrieve(); if (result.data.id !== 'packed') throw new Error('Packed client failed');`;
writeFileSync(join(fixture, 'esm.mjs'), `import Prosaic from 'prosaic-node'; ${exercise}`);
writeFileSync(
  join(fixture, 'cjs.cjs'),
  `const {Prosaic} = require('prosaic-node'); (async()=>{ ${exercise} })().catch(error=>{console.error(error);process.exitCode=1});`,
);
for (const file of ['esm.mjs', 'cjs.cjs'])
  execFileSync(process.execPath, [file], { cwd: fixture, stdio: 'inherit' });
const typed = `import { Prosaic, type JournalsCreateParams } from 'prosaic-node'; const client = new Prosaic('test'); const p: JournalsCreateParams = { date:'2026-04-01', narration:'test', lines:[] }; void client.journals.create('e', p); void client.me.retrieve().then(result => result.data.id satisfies string); void client.transactions.list('e', { dateFrom: '2025-01-01', includePreConversion: 'true', reconciliationStatus: 'unreconciled', view: 'compact' }); void client.files.list('e', { search: 'statement', limit: 10 }); void client.invoices.create('e', { taxMode: 'NO_TAX', issueDate: '2026-10-21', recipientName: 'Acme', bankAccountId: 'b', bankAccountName: 'Oulton Family Trust', invoiceTemplateId: null, lines: [] }).then(result => result.data.bankAccountName satisfies string | null); const rows = [{ date: '2026-09-21', description: 'Fee', amount: -7 }]; void client.bankAccounts.importTransactions('e', 'b', { filename: 'statement.csv', transactions: rows }); void client.bankAccounts.createWithTransactions('e', { name: 'Business', institution: 'Bank', filename: 'statement.csv', transactions: rows }); // @ts-expect-error missing required narration and date\nvoid client.journals.create('e', { lines: [] }); // @ts-expect-error missing required name and institution\nvoid client.bankAccounts.createWithTransactions('e', { filename: 'statement.csv', transactions: rows });`;
writeFileSync(join(fixture, 'esm.mts'), typed);
writeFileSync(join(fixture, 'cjs.cts'), typed);
execFileSync(
  'yarn',
  [
    'tsc',
    '--strict',
    '--noEmit',
    '--skipLibCheck',
    '--target',
    'ES2022',
    '--module',
    'NodeNext',
    '--moduleResolution',
    'NodeNext',
    'esm.mts',
    'cjs.cts',
  ],
  { cwd: fixture, stdio: 'inherit' },
);
console.log(
  `Packed contents, ESM/CommonJS runtime imports and TypeScript consumers passed (${entries.length} files)`,
);
if (process.argv[2] === '--live') {
  if (!process.argv[3]) throw new Error('Pass the private local fixture path after --live');
  const source = readFileSync('scripts/live-test.ts', 'utf8');
  const localImport = "from '../src/index.js'";
  if (!source.includes(localImport))
    throw new Error('Live test SDK import changed; update the packed consumer harness');
  const compiled = ts.transpileModule(source.replace(localImport, "from 'prosaic-node'"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext },
  });
  writeFileSync(join(fixture, 'live.mjs'), compiled.outputText);
  execFileSync(process.execPath, ['live.mjs', resolve(process.argv[3])], {
    cwd: fixture,
    stdio: 'inherit',
  });
  console.log('Live verification passed using only the installed SDK tarball');
}
