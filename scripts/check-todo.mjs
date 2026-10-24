// Lists every todo('...') left in content and fails when any remain.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../src/content/', import.meta.url).pathname;
const found = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx)$/.test(name) && name !== 'types.ts') {
      readFileSync(path, 'utf8')
        .split('\n')
        .forEach((line, i) => {
          for (const m of line.matchAll(/todo\('([^']+)'\)/g)) found.push(`${path.slice(root.length)}:${i + 1}  ${m[1]}`);
        });
    }
  }
}

walk(root);
if (found.length) {
  console.log(`${found.length} TODO(s) in content:\n${found.join('\n')}`);
  process.exit(1);
}
console.log('No TODOs in content.');
