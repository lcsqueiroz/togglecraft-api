import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distDir = new URL('../dist', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

async function fixDeclarationFiles(dir){
  for(const entry of await readdir(dir, { withFileTypes: true })){
    const path = join(dir, entry.name);
    if(entry.isDirectory()){
      await fixDeclarationFiles(path);
      continue;
    }
    if(!entry.name.endsWith('.d.ts')){
      continue;
    }
    const content = await readFile(path, 'utf8');
    const fixed = content.replace(/(from\s+['"][^'"]+)\.ts(['"])/g, '$1.js$2');
    if(fixed !== content){
      await writeFile(path, fixed, 'utf8');
    }
  }
}

await fixDeclarationFiles(distDir);
