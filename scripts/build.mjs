import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

for (const format of ['esm', 'cjs']) {
  execFileSync(
    'yarn',
    [
      'tsc',
      '-p',
      'tsconfig.build.json',
      '--module',
      format === 'esm' ? 'NodeNext' : 'CommonJS',
      '--moduleResolution',
      format === 'esm' ? 'NodeNext' : 'Node',
      '--outDir',
      `dist/${format}`,
    ],
    { stdio: 'inherit' },
  );
}
mkdirSync('dist/cjs', { recursive: true });
writeFileSync('dist/cjs/package.json', '{"type":"commonjs"}\n');
