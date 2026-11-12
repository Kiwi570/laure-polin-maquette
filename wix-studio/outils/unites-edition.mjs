// Mode conception de l'éditeur Wix : l'iframe de l'éditeur prend la hauteur de la page, si bien que
// 100vh / 100svh y valent la hauteur du document et que les sections grandissent sans fin (mesuré :
// #hero 33 554 428 px). Ce script fait passer toutes les hauteurs d'écran des modules CSS par deux variables :
//   N vh  -> calc(N * var(--u-vh, 1vh))      N svh -> calc(N * var(--u-svh, 1svh))
// Sans la classe .edition (site visiteur), les variables sont absentes : le rendu est identique.
// Avec .edition (posée par component.preview.tsx via useEdition), elles sont bornées et calculées sur la LARGEUR.
// Idempotent : un fichier qui contient déjà « --u-vh » n'est pas retransformé.
// Usage : node wix-studio/outils/unites-edition.mjs && node wix-studio/outils/socle.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const dossier = join(ici, '../site-code/src/extensions/site/components');

export const transformer = (css) => css
  .replace(/(\d*\.?\d+)svh\b/g, 'calc($1 * var(--u-svh, 1svh))')
  .replace(/(\d*\.?\d+)vh\b/g, (m, n, i, s) => (s[i - 1] === 's' ? m : `calc(${n} * var(--u-vh, 1vh))`));

export const REGLES_EDITION = `/* Mode conception (classe .edition) : hauteurs d'écran bornées, fonction de la largeur de l'iframe de l'éditeur */
.edition { --u-svh: clamp(7px, 0.5625vw, 9.5px); --u-vh: clamp(7px, 0.5625vw, 9.5px); }
@media (max-width: 860px) { .edition { --u-svh: clamp(6px, 2.1vw, 9px); --u-vh: clamp(6px, 2.1vw, 9px); } }`;

// 1. socle commun (outils/socle.mjs)
const socleMjs = join(ici, 'socle.mjs');
let s = readFileSync(socleMjs, 'utf8');
const debut = s.indexOf('const SOCLE = `'), fin = s.indexOf('/* socle:fin */`;', debut);
if (debut < 0 || fin < 0) throw new Error('SOCLE introuvable');
let corps = s.slice(debut, fin);
if (!corps.includes('--u-vh')) {
  corps = transformer(corps);
  corps = corps.trimEnd() + '\n' + REGLES_EDITION + '\n';
  s = s.slice(0, debut) + corps + s.slice(fin);
  writeFileSync(socleMjs, s);
  console.log('socle.mjs transformé');
}

// 2. CSS propre à chaque composant (hors socle, regénéré par socle.mjs)
for (const c of readdirSync(dossier).filter((d) => d.startsWith('lp-'))) {
  const f = join(dossier, c, `${c}.module.css`);
  let css = readFileSync(f, 'utf8');
  const re = /\/\* socle:debut[\s\S]*?socle:fin \*\//;
  const m = css.match(re);
  const avant = m ? css.slice(0, m.index) : '';
  const apres = m ? css.slice(m.index + m[0].length) : css;
  if (apres.includes('--u-vh') || apres.includes('--u-svh')) continue;
  const n = (apres.match(/\d*\.?\d+s?vh\b/g) || []).length;
  css = avant + (m ? m[0] : '') + transformer(apres);
  writeFileSync(f, css);
  console.log(c, n, 'hauteurs converties');
}
