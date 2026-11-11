// Recopie le « socle » CSS commun (jetons, polices, réinitialisations et classes utilitaires de
// assets/css/site.css) entre les marqueurs /* socle:debut */ … /* socle:fin */ de chaque
// <composant>.module.css. Les composants Wix sont des paquets séparés : chacun embarque ce socle.
// Usage : node wix-studio/outils/socle.mjs
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const dossier = join(ici, '../site-code/src/extensions/site/components');
const P = '../../../../lp-commun/polices/';

const SOCLE = `/* socle:debut — jetons, polices et classes communes de la maquette (assets/css/site.css). Généré par wix-studio/outils/socle.mjs */
@font-face { font-family: "Cormorant Garamond"; src: url("${P}cormorant-garamond.woff2") format("woff2"); font-weight: 300 700; font-style: normal; font-display: swap; }
@font-face { font-family: "Cormorant Garamond"; src: url("${P}cormorant-garamond-italic.woff2") format("woff2"); font-weight: 300 700; font-style: italic; font-display: swap; }
@font-face { font-family: "Inter Tight"; src: url("${P}inter-tight.woff2") format("woff2"); font-weight: 100 900; font-style: normal; font-display: swap; }
@font-face { font-family: "Inter Tight"; src: url("${P}inter-tight-italic.woff2") format("woff2"); font-weight: 100 900; font-style: italic; font-display: swap; }
.racine {
  --display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  overflow-x: clip;
}
.jetons {
  display: contents;
  color-scheme: dark;
  --ardoise-0: #101317; --ardoise-1: #171b20; --ardoise-2: #20262d; --ardoise-3: #2c333b; --ardoise-4: #3c444e;
  --graphite: #8a929b; --craie: #ece8e0; --craie-2: #c8c3b9; --cuivre: #c98048; --cuivre-clair: #e3a676; --mica: #a7b8c7; --teinte: #171b20;
  --f-display: "Cormorant Garamond", "Cormorant", Georgia, serif;
  --f-texte: "Inter Tight", "Helvetica Neue", Arial, sans-serif;
  --t-xs: 0.8125rem; --t-s: 0.9375rem; --t-m: 1.0625rem; --t-l: 1.375rem; --t-xl: 1.875rem;
  --t-2xl: clamp(2.25rem, 4.2vw, 3.5rem); --t-3xl: clamp(3rem, 7vw, 6rem); --t-geant: clamp(4.2rem, 15vw, 15rem);
  --marge: clamp(16px, 4.5vw, 72px);
  --col: min(1440px, 100% - 2 * var(--marge));
  --rayon: 2px;
  --ease: cubic-bezier(.2, .7, .1, 1);
  --logo-h: 84px; --logo-h-compact: 64px; --header-h: 104px; --header-h-compact: 80px;
  color: var(--craie);
  font-family: var(--f-texte);
  font-size: var(--t-m);
  line-height: 1.55;
  font-feature-settings: "kern", "liga";
  -webkit-font-smoothing: antialiased;
  text-align: start;
}
@media (max-width: 940px) {
  .jetons { --logo-h: 72px; --logo-h-compact: 60px; --header-h: 88px; --header-h-compact: 72px; }
}
:where(.racine) *, :where(.racine) *::before, :where(.racine) *::after { box-sizing: border-box; }
:where(.racine) img, :where(.racine) svg, :where(.racine) canvas, :where(.racine) video { display: block; max-width: 100%; }
:where(.racine) img { height: auto; }
:where(.racine) a { color: inherit; text-decoration: none; }
:where(.racine) button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
:where(.racine) input, :where(.racine) select, :where(.racine) textarea { font: inherit; color: inherit; }
:where(.racine) ::selection { background: var(--cuivre); color: var(--ardoise-0); }
:where(.racine) :focus-visible { outline: 2px solid var(--cuivre-clair); outline-offset: 3px; border-radius: 2px; }
:where(.racine) p { margin: 0 0 1em; }
.racine h1, .racine h2, .racine h3 { font-family: var(--f-display); font-weight: 400; margin: 0; letter-spacing: -.01em; color: var(--craie); }
.racine h2 { font-size: var(--t-3xl); line-height: .95; }
.racine h3 { font-size: var(--t-xl); line-height: 1.1; }
:where(.racine) figure { margin: 1em 40px; }
:where(.racine) dl, :where(.racine) dd { margin: 0; }
.fallbackDirection:not([dir]) { direction: var(--wix-opt-in-direction); }
.sr { position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0; }
.display { font-family: var(--f-display); font-weight: 300; line-height: .86; letter-spacing: -.02em; }
.lead { font-family: var(--f-display); font-size: clamp(1.45rem, 2.4vw, 2.1rem); line-height: 1.3; font-weight: 400; max-width: 34ch; }
.petit { font-size: var(--t-s); color: var(--craie-2); }
.mini { font-size: var(--t-xs); color: var(--graphite); }
.chiffres { font-variant-numeric: tabular-nums lining-nums; }
.lien { position: relative; display: inline-block; padding-bottom: 2px; }
.lien::after { content: ""; position: absolute; left: 0; right: 0; bottom: 0; height: 1px; background: currentColor; transform: scaleX(.25); transform-origin: left; transition: transform .5s var(--ease); }
.lien:hover::after, .lien:focus-visible::after { transform: scaleX(1); }
.bouton {
  position: relative; display: inline-flex; align-items: center; gap: .65em;
  padding: .95em 1.5em; border: 1px solid color-mix(in srgb, var(--craie) 45%, transparent);
  color: var(--craie); font-size: var(--t-s); font-weight: 500; letter-spacing: .01em; border-radius: 999px;
  overflow: hidden; isolation: isolate; transition: color .45s var(--ease), border-color .45s;
  will-change: transform;
  pointer-events: auto;
}
.bouton::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--craie); transform: translateY(101%); border-radius: inherit; transition: transform .5s var(--ease); }
.bouton:hover, .bouton:focus-visible { color: var(--ardoise-0); border-color: var(--craie); }
.bouton:hover::before, .bouton:focus-visible::before { transform: translateY(0); }
.bouton--plein { background: var(--craie); color: var(--ardoise-0); border-color: var(--craie); }
.bouton--plein::before { background: var(--cuivre); }
.bouton--plein:hover, .bouton--plein:focus-visible { color: var(--ardoise-0); border-color: var(--cuivre); }
.bouton[disabled] { opacity: .45; pointer-events: none; }
.actions { display: flex; flex-wrap: wrap; gap: 12px; }
.section { position: relative; padding: clamp(96px, 14vh, 180px) var(--marge); }
.contenu { width: var(--col); margin: 0 auto; }
.rang { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: clamp(16px, 2.2vw, 32px); }
.fond-image { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.fond-image img { width: 100%; height: 120%; object-fit: cover; position: absolute; top: -10%; left: 0; max-width: none; }
.fond-image::after { content: ""; position: absolute; inset: 0; background: linear-gradient(180deg, var(--ardoise-1) 0%, transparent 25%, transparent 70%, var(--ardoise-1) 100%); }
.intertitre { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; flex-wrap: wrap; margin-bottom: clamp(40px, 6vw, 80px); }
.intertitre p { max-width: 42ch; color: var(--craie-2); margin: 0; }
.clive { position: relative; display: inline-block; }
.strate { display: block; }
.strate + .strate { position: absolute; inset: 0; }
.fente { position: absolute; left: -2%; right: -2%; height: 1px; background: linear-gradient(90deg, transparent, var(--cuivre-clair), transparent); opacity: 0; }
.cartel { font-size: var(--t-xs); color: var(--craie-2); line-height: 1.5; }
.cartel strong { display: block; font-family: var(--f-display); font-size: 1.25rem; font-weight: 500; color: var(--craie); line-height: 1.15; margin-bottom: 2px; }
.cartel .prix { color: var(--cuivre-clair); font-variant-numeric: tabular-nums; }
.tel { white-space: nowrap; }
@media (max-width: 860px) {
  .lien { display: inline-flex; align-items: center; min-height: 44px; padding-bottom: 0; }
  .lien::after { bottom: calc(50% - .85em); }
}
@media (prefers-reduced-motion: reduce) {
  :where(.racine) *, :where(.racine) *::before, :where(.racine) *::after { animation-duration: .001ms !important; animation-iteration-count: 1 !important; transition-duration: .001ms !important; }
}
/* socle:fin */`;

// ne garde, pour chaque composant, que les règles du socle dont toutes les classes servent dans son TSX
// (sinon la génération du manifeste signale des classes « absentes du rendu initial »)
const blocs = (css) => {
  const out = []; let i = 0;
  while (i < css.length) {
    const o = css.indexOf('{', i); if (o < 0) break;
    let n = 1; let j = o + 1;
    while (j < css.length && n) { if (css[j] === '{') n++; else if (css[j] === '}') n--; j++; }
    out.push({ sel: css.slice(i, o).trim(), corps: css.slice(o + 1, j - 1) });
    i = j;
  }
  return out;
};
const filtrer = (css, mots) => blocs(css).map(({ sel, corps }) => {
  const propre = sel.replace(/\/\*[\s\S]*?\*\//g, '').trim();
  if (propre.startsWith('@font-face')) return `${sel} {${corps}}`;
  if (propre.startsWith('@media')) { const dedans = filtrer(corps, mots); return dedans.trim() ? `${sel} {\n${dedans}\n}` : ''; }
  const classes = [...propre.matchAll(/\.([A-Za-z][\w-]*)/g)].map((m) => m[1]).filter((c) => c !== 'racine' && c !== 'fallbackDirection');
  return classes.every((c) => mots.has(c)) ? `${sel} {${corps}}` : '';
}).filter(Boolean).join('\n');

for (const nom of readdirSync(dossier)) {
  if (!nom.startsWith('lp-') || nom === 'lp-test-code') continue;
  const f = join(dossier, nom, `${nom}.module.css`);
  let css;
  try { css = readFileSync(f, 'utf8'); } catch (e) { continue; }
  const tsx = readdirSync(join(dossier, nom)).filter((f) => f.endsWith('.tsx')).map((f) => readFileSync(join(dossier, nom, f), 'utf8')).join('\n');
  const mots = new Set([...tsx.matchAll(/'([^'\n]*)'|\bs\.(\w+)|\bs\['([\w-]+)'\]/g)].flatMap((m) => (m[1] ?? m[2] ?? m[3] ?? '').split(/\s+/)).filter(Boolean));
  mots.add('jetons');
  if (/<Strates/.test(tsx)) ['strate', 'fente', 'clive'].forEach((m) => mots.add(m));
  const debut = SOCLE.indexOf('\n') + 1; const fin = SOCLE.lastIndexOf('\n');
  const socle = `${SOCLE.slice(0, debut)}${filtrer(SOCLE.slice(debut, fin), mots)}\n${SOCLE.slice(fin + 1)}`;
  const re = /\/\* socle:debut[\s\S]*?socle:fin \*\//;
  css = re.test(css) ? css.replace(re, socle) : `${socle}\n\n${css}`;
  writeFileSync(f, css);
  console.log('socle →', nom);
}
