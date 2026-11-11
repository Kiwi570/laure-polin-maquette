// Libellés français des réglages : tirés des commentaires JSDoc des props et appliqués
// comme surcharge du manifeste (data.<prop>.displayName) dans <nom>.libelles.ts.
// Usage : node wix-studio/outils/libelles.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const dossier = join(ici, '../site-code/src/extensions/site/components');
for (const nom of readdirSync(dossier)) {
  if (!nom.startsWith('lp-')) continue;
  const props = readFileSync(join(dossier, nom, `${nom}.props.ts`), 'utf8');
  const debut = props.search(/export type Lp\w+Props = \{/);
  const bloc = props.slice(debut, props.indexOf('\n};', debut));
  const data = {};
  for (const m of bloc.matchAll(/\/\*\* (.+?) \*\/\n\s+(\w+)\??:/g)) {
    let lib = m[1].replace(/\s*@\w+.*$/, '').trim();
    if (lib.length > 60) lib = `${lib.slice(0, 57).trim()}…`;
    data[m[2]] = { displayName: lib };
  }
  const corps = Object.entries(data).map(([k, v]) => `    ${k}: { displayName: ${JSON.stringify(v.displayName)} },`).join('\n');
  writeFileSync(join(dossier, nom, `${nom}.libelles.ts`), `// Généré par wix-studio/outils/libelles.mjs à partir des commentaires de ${nom}.props.ts\nexport const libelles = {\n  data: {\n${corps}\n  },\n};\n`);
  const ext = join(dossier, nom, `${nom}.extension.ts`);
  let e = readFileSync(ext, 'utf8');
  if (!e.includes('libelles')) {
    e = e.replace(`import { defaultProps } from './${nom}.props';`, `import { defaultProps } from './${nom}.props';\nimport { libelles } from './${nom}.libelles';`);
    e = e.replace('  editorElement: deepmerge(\n    editorElementWithDefaults,\n', '  editorElement: deepmerge(\n    editorElementWithDefaults,\n    libelles,\n');
    writeFileSync(ext, e);
  }
  console.log(nom, Object.keys(data).length);
}
