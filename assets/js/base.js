/* Laure Polin — socle commun : en-tete, defilement, curseur, son, panier, transitions, ouverture. */
import { Lenis } from '../vendor/lenis.mjs';
import { MONO, NOM } from './formes.js';

const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;
gsap.registerPlugin(ScrollTrigger);
if (window.CustomEase) {
  gsap.registerPlugin(window.CustomEase);
  window.CustomEase.create('taille', 'M0,0 C0.2,0.7 0.1,1 1,1');
}

/* ---------- stockage prudent ---------- */
const memo = {
  lire(k, d = null) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  ecrire(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
  session(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } },
};

/* ---------- etat global ---------- */
const prefereCalme = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const calme = memo.lire('lp-calme', prefereCalme);
const pointeurFin = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const etroit = () => window.innerWidth < 861;
const glDispo = (() => {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); } catch (e) { return false; }
})();
document.documentElement.classList.toggle('calme', calme);

export const LP = {
  gsap, ScrollTrigger, memo, calme, pointeurFin, etroit, gl: glDispo && !calme,
  oeuvres: window.OEUVRES || [],
  ordre: window.SERIES_ORDRE || {},
  lenis: null,
};
LP.parId = Object.fromEntries(LP.oeuvres.map((o) => [o.id, o]));

/* ---------- utilitaires ---------- */
const fmt = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 });
LP.prix = (n) => (n ? `${fmt.format(n)} €` : 'Prix sur demande');
LP.esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
LP.srcset = (img) => img.tailles.map(([suf, w]) => `assets/${img.src}-${suf}.webp ${w}w`).join(', ');
LP.src = (img, cible = 800) => {
  const t = img.tailles.find(([, w]) => w >= cible) || img.tailles[img.tailles.length - 1];
  return `assets/${img.src}-${t[0]}.webp`;
};
/* ancre lue dans l'adresse ou un lien : jamais de querySelector sur une valeur brute (#_=_, #1…) */
LP.cible = (hash) => { try { return hash && hash.length > 1 ? document.getElementById(decodeURIComponent(hash.slice(1))) : null; } catch (e) { return null; } };
LP.visuel = (o) => o.detoure || (o.photos.find((p) => p.role !== 'signature') || null);
LP.estDetoure = (o) => !!o.detoure;
LP.dims = (o) => {
  const d = o.dimensions;
  if (!d) return '';
  const parts = [];
  const n = (v) => String(v).replace('.', ',');
  if (d.h) parts.push(`H ${n(d.h)}`);
  if (d.l) parts.push(`L ${n(d.l)}`);
  if (d.p) parts.push(`P ${n(d.p)}`);
  let s = parts.length ? `${parts.join(' × ')} cm` : '';
  if (d.note) s += s ? ` (${d.note})` : d.note;
  return s;
};
LP.matiereCourte = (o) => {
  const t = (o.technique.join(' ') + ' ' + o.series.join(' ')).toLowerCase();
  const m = [];
  if (/bronze/.test(t)) m.push('bronze');
  if (/ardoise/.test(t)) m.push('ardoise');
  if (/pneu|chambre/.test(t)) m.push('pneu recyclé');
  if (/terre cuite/.test(t)) m.push('terre cuite');
  if (/\bbois\b/.test(t) && !m.length) m.push('bois');
  if (/cuivre/.test(t) && !m.includes('bronze')) m.push('cuivre');
  if (/étain/.test(t)) m.push('étain');
  return m.length ? m.join(', ').replace(/^./, (c) => c.toUpperCase()) : '';
};
LP.statut = (o) => {
  if (o.statut === 'collection') return { txt: 'En collection privée', cls: '' };
  if (o.statut === 'vendue') return { txt: 'Vendue', cls: '' };
  return { txt: 'Disponible', cls: 'etat--dispo' };
};
LP.lienOeuvre = (o) => `oeuvre.html?o=${encodeURIComponent(o.id)}`;
LP.serie = (s) => (LP.ordre[s] || []).filter((id, i, a) => a.indexOf(id) === i).map((id) => LP.parId[id]).filter(Boolean);
LP.NOMS_SERIES = { ardoise: 'Ardoise', bronze: 'Bronze', pneu: 'Pneu recyclé', 'petits-formats': 'Petits formats', collection: 'Collection privée' };

const ICO = {
  plus: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>',
  ok: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>',
  sac: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7h12l-1 10H5L4 7z M7 7V5.5a3 3 0 0 1 6 0V7" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>',
  calme: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 12c2.5-3 4.5-3 7 0s4.5 3 7 0" stroke="currentColor" stroke-width="1.3" fill="none"/></svg>',
  fleche: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>',
  menu: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h14M3 13h14" stroke="currentColor" stroke-width="1.4"/></svg>',
  croix: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.4"/></svg>',
};
LP.ICO = ICO;

LP.monoSVG = (cls = '') => `<svg class="${cls}" viewBox="0 0 ${MONO.w} ${MONO.h}" aria-hidden="true"><path d="${MONO.d}" fill-rule="evenodd"/></svg>`;

/* ---------- dialogues : le reste de la page devient inerte ---------- */
LP.isoler = (dialogue, on) => {
  document.documentElement.classList.toggle('verrou', on);
  [...document.body.children].forEach((el) => {
    if (el === dialogue || el.contains(dialogue) || el.matches('script, .curseur, .curseur-anneau, .toast, .voile, .rideau')) return;
    if (on) { if (!el.inert) { el.inert = true; el.dataset.inertLp = '1'; } } else if (el.dataset.inertLp) { el.inert = false; delete el.dataset.inertLp; }
  });
};
/* ---------- chrome : en-tete, menu, panier, curseur ---------- */
const VEDETTES = { ardoise: 'a-contre-courant', bronze: 'la-danse-du-voile', pneu: 'le-de-du-chaos', 'petits-formats': 'profil', collection: 'cheveux-au-vent' };
function salles() {
  return ['ardoise', 'bronze', 'pneu', 'petits-formats', 'collection'].map((k) => {
    const v = LP.parId[VEDETTES[k]];
    const im = v ? (v.detoure || v.photos[0]) : null;
    return `<a class="salle-lien" href="salle.html?s=${k}"><span class="vig">${im ? `<img src="${LP.src(im, 300)}" alt="" loading="lazy">` : ''}</span><span class="t">${LP.NOMS_SERIES[k]}</span><span class="n chiffres">${LP.serie(k).length} œuvres</span></a>`;
  }).join('');
}
function monterChrome() {
  const page = document.body.dataset.page || '';
  const cur = (p) => (p === page ? ' aria-current="page"' : '');
  const entete = document.createElement('header');
  entete.className = 'entete';
  entete.innerHTML = `
    <a class="marque" href="index.html" aria-label="Laure Polin, accueil">${LP.monoSVG()}<span>Laure Polin</span></a>
    <nav class="nav" aria-label="Navigation principale">
      <div class="nav-oeuvres">
        <button type="button" class="nav-bouton"${page === 'salle' || page === 'oeuvre' ? ' aria-current="page"' : ''} aria-expanded="false" aria-controls="panneau-oeuvres">Les œuvres<svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" stroke-width="1.3"/></svg></button>
        <div class="panneau-oeuvres" id="panneau-oeuvres" hidden>${salles()}</div>
      </div>
      <a href="index.html#ardoisier">L’Ardoisier</a>
      <a href="index.html#livre">Le livre</a>
      <a href="index.html#ou-voir">Expositions</a>
      <a href="index.html#contact"${cur('contact')}>L’atelier</a>
    </nav>
    <div class="outils">
      <button class="outil" type="button" data-son aria-pressed="false" title="Ambiance sonore de l’atelier"><span class="onde" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="lib">Son</span><span class="sr">Activer le son de l’atelier</span></button>
      <button class="outil" type="button" data-calme aria-pressed="${calme}" title="Réduire les animations">${ICO.calme}<span class="lib">Mode calme</span></button>
      <button class="outil" type="button" data-panier-ouvrir>${ICO.sac}<span class="sr" data-panier-nom>Ouvrir le panier</span><span class="pastille" data-compte aria-hidden="true">0</span></button>
      <button class="outil menu-bouton" type="button" data-menu aria-expanded="false" aria-controls="menu-plein" aria-label="Ouvrir le menu">${ICO.menu}</button>
    </div>`;
  document.body.prepend(entete);
  // menu deroulant des salles
  const navO = entete.querySelector('.nav-oeuvres');
  const btnO = navO.querySelector('button'); const panO = navO.querySelector('.panneau-oeuvres');
  let tempo;
  const ouvrirO = (on) => {
    clearTimeout(tempo);
    btnO.setAttribute('aria-expanded', String(on));
    if (on) { panO.hidden = false; requestAnimationFrame(() => panO.classList.add('ouvert')); }
    else { panO.classList.remove('ouvert'); tempo = setTimeout(() => { panO.hidden = true; }, 350); }
  };
  btnO.addEventListener('click', () => ouvrirO(btnO.getAttribute('aria-expanded') !== 'true'));
  if (pointeurFin) {
    navO.addEventListener('pointerenter', () => ouvrirO(true));
    navO.addEventListener('pointerleave', () => { tempo = setTimeout(() => ouvrirO(false), 220); });
  }
  navO.addEventListener('focusout', (e) => { if (!navO.contains(e.relatedTarget)) ouvrirO(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && btnO.getAttribute('aria-expanded') === 'true') { ouvrirO(false); btnO.focus(); } });
  document.addEventListener('click', (e) => { if (!navO.contains(e.target) && btnO.getAttribute('aria-expanded') === 'true') ouvrirO(false); });
  const evite = document.createElement('a');
  evite.className = 'evite'; evite.href = '#principal'; evite.textContent = 'Aller au contenu';
  document.body.prepend(evite);

  const menu = document.createElement('div');
  menu.className = 'menu-plein'; menu.id = 'menu-plein'; menu.inert = true; menu.setAttribute('data-lenis-prevent', '');
  menu.setAttribute('role', 'dialog'); menu.setAttribute('aria-modal', 'true'); menu.setAttribute('aria-label', 'Menu');
  menu.innerHTML = `
    <button class="outil fermer" type="button" data-menu-fermer aria-label="Fermer le menu">${ICO.croix}</button>
    ${['ardoise', 'bronze', 'pneu', 'petits-formats', 'collection'].map((k) => `<a href="salle.html?s=${k}">${LP.NOMS_SERIES[k]}<small>${LP.serie(k).length}</small></a>`).join('')}
    <span class="menu-sep" aria-hidden="true"></span>
    <a class="menu-second" href="index.html#ardoisier">L’Ardoisier</a><a class="menu-second" href="index.html#livre">Le livre</a><a class="menu-second" href="index.html#ou-voir">Expositions</a><a class="menu-second" href="index.html#contact">L’atelier et contact</a>`;
  document.body.append(menu);

  const voile = document.createElement('div'); voile.className = 'voile'; voile.dataset.voile = '';
  const panier = document.createElement('aside');
  panier.className = 'panier'; panier.setAttribute('data-lenis-prevent', ''); panier.setAttribute('role', 'dialog'); panier.setAttribute('aria-modal', 'true'); panier.setAttribute('aria-label', 'Panier'); panier.setAttribute('aria-hidden', 'true'); panier.inert = true;
  panier.innerHTML = `
    <header><h2>Panier</h2><button class="outil" type="button" data-panier-fermer aria-label="Fermer le panier">${ICO.croix}</button></header>
    <div class="liste" data-panier-liste></div>
    <footer data-panier-pied></footer>`;
  document.body.append(voile, panier);

  const prog = document.createElement('div');
  prog.className = 'empreinte-progression'; prog.setAttribute('aria-hidden', 'true');
  prog.innerHTML = '<div class="trace"></div>';
  document.body.append(prog);

  const toast = document.createElement('div');
  toast.className = 'toast'; toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite');
  document.body.append(toast);

  if (pointeurFin && !calme) {
    const c = document.createElement('div'); c.className = 'curseur';
    const a = document.createElement('div'); a.className = 'curseur-anneau'; a.innerHTML = '<span>Voir</span>';
    document.body.append(c, a);
  }
  const rideau = document.createElement('div');
  rideau.className = 'rideau'; rideau.setAttribute('aria-hidden', 'true');
  rideau.innerHTML = '<i></i><i></i><i></i><i></i><i></i><i></i>';
  document.body.append(rideau);

  // menu mobile
  const btnMenu = entete.querySelector('[data-menu]');
  const ouvrirMenu = (on) => {
    menu.classList.toggle('ouvert', on);
    btnMenu.setAttribute('aria-expanded', String(on));
    LP.isoler(menu, on);
    menu.inert = !on;
    if (on) { LP.lenis?.stop(); menu.querySelector('a').focus(); } else { LP.lenis?.start(); btnMenu.focus(); }
  };
  btnMenu.addEventListener('click', () => ouvrirMenu(true));
  menu.querySelector('[data-menu-fermer]').addEventListener('click', () => ouvrirMenu(false));
  menu.querySelectorAll('a').forEach((l) => l.addEventListener('click', () => ouvrirMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('ouvert')) ouvrirMenu(false); });

  // mode calme
  entete.querySelector('[data-calme]').addEventListener('click', () => {
    memo.ecrire('lp-calme', !calme);
    location.reload();
  });
}

/* ---------- defilement fluide ---------- */
function monterDefilement() {
  if (!calme) {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
    LP.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.documentElement.classList.add('lenis');
    // apres un defilement natif provoque par le focus clavier, Lenis repart de la vraie position
    document.addEventListener('focusin', () => requestAnimationFrame(() => requestAnimationFrame(() => { if (lenis.isScrolling !== 'smooth') lenis.reset(); })));
  }
  // ancres internes
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"], a[href^="index.html#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    const hash = href.slice(href.indexOf('#'));
    if (href.startsWith('index.html') && document.body.dataset.page !== 'accueil') return;
    const cible = LP.cible(hash);
    if (!cible) return;
    e.preventDefault();
    if (LP.lenis) LP.lenis.scrollTo(cible, { offset: 0, duration: a.classList.contains('evite') ? 0.6 : 1.6 });
    else cible.scrollIntoView({ behavior: calme ? 'auto' : 'smooth' });
    history.replaceState(null, '', hash);
    // le focus clavier suit l'ancre
    if (!cible.matches('a, button, input, textarea, select, [tabindex]')) cible.setAttribute('tabindex', '-1');
    cible.focus({ preventScroll: true });
  });
  // les liens qui ouvrent un nouvel onglet le disent
  document.querySelectorAll('a[target="_blank"]').forEach((a) => {
    if (!a.querySelector('.sr')) a.insertAdjacentHTML('beforeend', '<span class="sr"> (nouvel onglet)</span>');
  });
  // en-tete qui se cache
  const entete = document.querySelector('.entete');
  let dernier = 0;
  const trace = document.querySelector('.empreinte-progression .trace');
  const maj = () => {
    const y = window.scrollY;
    entete.classList.toggle('est-plein', y > 40);
    entete.classList.toggle('est-cache', y > 300 && y > dernier + 2 && !document.querySelector('.menu-plein.ouvert'));
    if (y < dernier - 2) entete.classList.remove('est-cache');
    dernier = y;
    const h = document.documentElement.scrollHeight - innerHeight;
    trace.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
  };
  addEventListener('scroll', maj, { passive: true });
  maj();
  entete.addEventListener('focusin', () => entete.classList.remove('est-cache'));
  if (location.hash && document.body.dataset.page === 'accueil') {
    const cible = LP.cible(location.hash);
    if (cible) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      LP.pret.then(() => setTimeout(() => {
        ScrollTrigger.refresh();
        const y = cible.getBoundingClientRect().top + scrollY;
        if (LP.lenis) { LP.lenis.resize(); LP.lenis.scrollTo(y, { immediate: true, force: true }); } else scrollTo(0, y);
      }, 450));
    }
  }
}

/* ---------- curseur et aimants ---------- */
function monterCurseur() {
  if (!pointeurFin || calme) return;
  document.documentElement.classList.add('curseur-actif');
  const point = document.querySelector('.curseur');
  const anneau = document.querySelector('.curseur-anneau');
  const lib = anneau.querySelector('span');
  const px = gsap.quickTo(point, 'x', { duration: 0.08 }); const py = gsap.quickTo(point, 'y', { duration: 0.08 });
  const ax = gsap.quickTo(anneau, 'x', { duration: 0.45, ease: 'power3' }); const ay = gsap.quickTo(anneau, 'y', { duration: 0.45, ease: 'power3' });
  addEventListener('pointermove', (e) => { document.documentElement.classList.add('curseur-vu'); px(e.clientX); py(e.clientY); ax(e.clientX); ay(e.clientY); LP.souris = { x: e.clientX, y: e.clientY }; }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const v = e.target.closest('[data-curseur]');
    const l = e.target.closest('a, button, label, select');
    anneau.classList.toggle('voir', !!v);
    lib.textContent = v ? (v.dataset.curseur || 'Voir') : 'Voir';
    anneau.classList.toggle('lien-on', !v && !!l);
  });
  document.addEventListener('pointerleave', () => { gsap.to([point, anneau], { opacity: 0, duration: 0.3 }); });
  document.addEventListener('pointerenter', () => { gsap.to([point, anneau], { opacity: 1, duration: 0.3 }); });
}

LP.aimants = (racine = document) => {
  if (!pointeurFin || calme) return;
  racine.querySelectorAll('.bouton, [data-aimant]').forEach((el) => {
    if (el.dataset.aimantOk) return;
    el.dataset.aimantOk = '1';
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.36);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });
};

LP.inclinaison = (racine = document) => {
  if (!pointeurFin || calme) return;
  racine.querySelectorAll('[data-tilt]').forEach((el) => {
    if (el.dataset.tiltOk) return;
    el.dataset.tiltOk = '1';
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
      ry((x - 0.5) * 14); rx((0.5 - y) * 12);
      el.style.setProperty('--rx', `${x * 100}%`); el.style.setProperty('--ry', `${y * 100}%`);
    });
    el.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
};

/* ---------- clivage : un titre se fend en feuillets puis se ressoude ---------- */
LP.cliver = (el, { strates = 4, ecart = 90, scrub = false, declencheur, debut = 'top 82%', delai = 0, duree = 1.5 } = {}) => {
  if (!el || el.dataset.cliveOk) return null;
  el.dataset.cliveOk = '1';
  const html = el.innerHTML;
  el.classList.add('clive');
  el.innerHTML = '';
  const couches = [];
  for (let i = 0; i < strates; i++) {
    const s = document.createElement('span');
    s.className = 'strate';
    s.innerHTML = html;
    if (i > 0) s.setAttribute('aria-hidden', 'true');
    const haut = (i / strates) * 100; const bas = 100 - ((i + 1) / strates) * 100;
    s.style.clipPath = `inset(${haut - 0.6}% -10% ${bas - 0.6}% -10%)`;
    el.append(s);
    couches.push(s);
  }
  const fente = document.createElement('span'); fente.className = 'fente'; fente.setAttribute('aria-hidden', 'true');
  el.append(fente);
  if (calme) return null;
  const tl = gsap.timeline({ paused: !scrub, delay: delai });
  couches.forEach((c, i) => {
    const sens = i % 2 ? 1 : -1;
    tl.fromTo(c, { xPercent: 0, x: sens * (ecart * (0.6 + Math.random() * 0.8)), y: (i - strates / 2) * 6, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: duree, ease: 'expo.out' }, i * 0.07);
  });
  tl.fromTo(fente, { top: '50%', opacity: 0, scaleX: 0 }, { opacity: 0.9, scaleX: 1, duration: 0.35, ease: 'power2.out' }, 0.25)
    .to(fente, { opacity: 0, duration: 0.6 }, 0.75);
  if (scrub) {
    ScrollTrigger.create({ trigger: declencheur || el, start: debut, end: 'bottom 40%', scrub: 1, animation: tl });
  } else if (declencheur !== false) {
    ScrollTrigger.create({ trigger: declencheur || el, start: debut, once: true, onEnter: () => tl.play() });
  }
  return tl;
};

/* ---------- son d'atelier synthetise ---------- */
const Atelier = {
  ctx: null, actif: false, maitre: null, minuteurs: [],
  creer() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    const ctx = this.ctx = new AC();
    const maitre = this.maitre = ctx.createGain(); maitre.gain.value = 0; maitre.connect(ctx.destination);
    const echo = ctx.createDelay(1); echo.delayTime.value = 0.19;
    const retour = ctx.createGain(); retour.gain.value = 0.22;
    echo.connect(retour); retour.connect(echo); echo.connect(maitre);
    this.echo = echo;
    // bruit brun
    const len = ctx.sampleRate * 3; const buf = ctx.createBuffer(1, len, ctx.sampleRate); const d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    this.bruit = buf;
    // ambiance de piece
    const piece = ctx.createBufferSource(); piece.buffer = buf; piece.loop = true;
    const pb = ctx.createBiquadFilter(); pb.type = 'lowpass'; pb.frequency.value = 260;
    const pg = ctx.createGain(); pg.gain.value = 0.35;
    piece.connect(pb).connect(pg).connect(maitre); piece.start();
    // poncage
    const ponce = ctx.createBufferSource(); ponce.buffer = buf; ponce.loop = true;
    const bp = ctx.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 1300; bp.Q.value = 0.6;
    const hp = ctx.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 500;
    const pgain = this.pgain = ctx.createGain(); pgain.gain.value = 0;
    ponce.connect(bp).connect(hp).connect(pgain).connect(maitre); ponce.start();
    return true;
  },
  passes() {
    if (!this.actif) return;
    const ctx = this.ctx; const t = ctx.currentTime; const g = this.pgain.gain;
    const n = 3 + Math.floor(Math.random() * 5);
    let at = t;
    for (let i = 0; i < n; i++) {
      const dur = 0.45 + Math.random() * 0.35;
      g.setValueAtTime(0.0001, at); g.linearRampToValueAtTime(0.55 + Math.random() * 0.3, at + dur * 0.4); g.linearRampToValueAtTime(0.0001, at + dur);
      at += dur + 0.06;
    }
    this.minuteurs.push(setTimeout(() => this.passes(), (at - t) * 1000 + 1600 + Math.random() * 3800));
  },
  coups() {
    if (!this.actif) return;
    const k = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < k; i++) setTimeout(() => this.coup(0.5 + Math.random() * 0.4), i * (230 + Math.random() * 120));
    this.minuteurs.push(setTimeout(() => this.coups(), 2600 + Math.random() * 5200));
  },
  coup(force = 0.7) {
    if (!this.ctx || !this.actif) return;
    const ctx = this.ctx; const t = ctx.currentTime;
    const src = ctx.createBufferSource(); src.buffer = this.bruit;
    const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 2200 + Math.random() * 900; f.Q.value = 3;
    const g = ctx.createGain(); g.gain.setValueAtTime(force, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    src.connect(f).connect(g); g.connect(this.maitre); g.connect(this.echo);
    src.start(t, Math.random() * 2, 0.12);
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = 1500 + Math.random() * 700;
    const og = ctx.createGain(); og.gain.setValueAtTime(force * 0.18, t); og.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    o.connect(og).connect(this.maitre); o.start(t); o.stop(t + 0.16);
  },
  basculer() {
    if (!this.ctx && !this.creer()) return false;
    this.actif = !this.actif;
    const t = this.ctx.currentTime;
    if (this.actif) {
      this.ctx.resume();
      this.maitre.gain.cancelScheduledValues(t); this.maitre.gain.setTargetAtTime(0.16, t, 0.6);
      this.passes(); this.coups();
    } else {
      this.maitre.gain.cancelScheduledValues(t); this.maitre.gain.setTargetAtTime(0, t, 0.25);
      this.minuteurs.forEach(clearTimeout); this.minuteurs = [];
    }
    return this.actif;
  },
};
LP.son = Atelier;
function monterSon() {
  const b = document.querySelector('[data-son]');
  b.addEventListener('click', () => {
    const on = Atelier.basculer();
    b.setAttribute('aria-pressed', String(on));
    b.classList.toggle('son-on', on);
    b.querySelector('.sr').textContent = on ? "Couper le son de l’atelier" : "Activer le son de l’atelier";
  });
  document.addEventListener('click', (e) => { if (Atelier.actif && e.target.closest('.bouton, .ajout, .filtre')) Atelier.coup(0.6); });
}

/* ---------- notifications ---------- */
let minuterieToast;
LP.toast = (msg) => {
  const t = document.querySelector('.toast');
  t.textContent = msg; t.classList.add('on');
  clearTimeout(minuterieToast); minuterieToast = setTimeout(() => t.classList.remove('on'), 3200);
};

/* ---------- panier simule ---------- */
const Panier = {
  items: memo.lire('lp-panier', []),
  sauver() { memo.ecrire('lp-panier', this.items); this.rendre(); },
  a(id) { return this.items.some((i) => i.id === id); },
  ajouter(id, depuis) {
    const o = LP.parId[id];
    if (!o || !o.prix) return;
    const exist = this.items.find((i) => i.id === id);
    if (exist) {
      if (id === 'dialogues-sculptes') exist.q += 1; else { LP.toast(`${o.titre} est déjà dans votre panier (pièce unique).`); this.ouvrir(); return; }
    } else this.items.push({ id, q: 1 });
    this.sauver();
    this.vol(depuis);
    LP.toast(`${o.titre} ajouté au panier.`);
    document.querySelectorAll(`[data-ajout="${id}"]`).forEach((b) => this.etatBouton(b));
  },
  retirer(id) { this.items = this.items.filter((i) => i.id !== id); this.sauver(); document.querySelectorAll(`[data-ajout="${id}"]`).forEach((b) => this.etatBouton(b)); },
  quantite(id, d) { const it = this.items.find((i) => i.id === id); if (!it) return; it.q = Math.max(1, Math.min(9, it.q + d)); this.sauver(); },
  total() { return this.items.reduce((s, i) => s + (LP.parId[i.id]?.prix || 0) * i.q, 0); },
  nombre() { return this.items.reduce((s, i) => s + i.q, 0); },
  etatBouton(b) {
    const dedans = this.a(b.dataset.ajout);
    b.classList.toggle('dans-panier', dedans);
    if (b.classList.contains('ajout')) {
      b.innerHTML = dedans ? ICO.ok : ICO.plus;
      const o = LP.parId[b.dataset.ajout];
      b.setAttribute('aria-label', dedans ? `${o?.titre} est dans le panier` : `Ajouter ${o?.titre} au panier`);
    } else if (b.dataset.libelle) {
      b.querySelector('span').textContent = dedans && b.dataset.ajout !== 'dialogues-sculptes' ? 'Dans votre panier' : b.dataset.libelle;
    }
  },
  vol(depuis) {
    if (calme || !depuis) return;
    const img = depuis.closest('[data-carte]')?.querySelector('img') || depuis.querySelector?.('img');
    const cible = document.querySelector('[data-panier-ouvrir]');
    if (!img || !cible) return;
    const r = img.getBoundingClientRect(); const c = cible.getBoundingClientRect();
    const v = img.cloneNode(); v.className = 'vol'; v.removeAttribute('srcset'); v.style.left = `${r.left + r.width / 2 - 30}px`; v.style.top = `${r.top + r.height / 2 - 30}px`;
    document.body.append(v);
    gsap.timeline({ onComplete: () => v.remove() })
      .to(v, { duration: 0.9, ease: 'power2.in', x: c.left + c.width / 2 - (r.left + r.width / 2), scale: 0.3 }, 0)
      .to(v, { duration: 0.9, ease: 'back.in(1.6)', y: c.top + c.height / 2 - (r.top + r.height / 2) }, 0)
      .to(v, { opacity: 0, duration: 0.2 }, 0.75)
      .fromTo(cible, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1 }, 0.82);
  },
  ouvrir() {
    document.querySelector('.panier').classList.add('ouvert');
    document.querySelector('.panier').setAttribute('aria-hidden', 'false');
    document.querySelector('.panier').inert = false;
    document.querySelector('[data-voile]').classList.add('on');
    LP.lenis?.stop();
    this.retour = document.activeElement;
    LP.isoler(document.querySelector('.panier'), true);
    setTimeout(() => document.querySelector('[data-panier-fermer]').focus(), 300);
  },
  fermer() {
    const p = document.querySelector('.panier');
    if (!p.classList.contains('ouvert')) return;
    p.classList.remove('ouvert');
    p.setAttribute('aria-hidden', 'true');
    p.inert = true;
    document.querySelector('[data-voile]').classList.remove('on');
    LP.isoler(p, false);
    LP.lenis?.start();
    if (this.retour && document.contains(this.retour)) this.retour.focus();
  },
  etape: 'liste',
  rendre() {
    const n = this.nombre();
    const p = document.querySelector('[data-compte]');
    p.textContent = n; p.classList.toggle('on', n > 0);
    const nom = document.querySelector('[data-panier-nom]');
    if (nom) nom.textContent = n ? `Ouvrir le panier, ${n} ${n > 1 ? 'articles' : 'article'}` : 'Ouvrir le panier';
    const liste = document.querySelector('[data-panier-liste]');
    const pied = document.querySelector('[data-panier-pied]');
    if (this.etape === 'fait') {
      liste.innerHTML = `<div class="vide"><p class="lead">Commande simulée enregistrée.</p><p class="petit">Aucun paiement n’a été effectué : dans cette maquette, le panier montre le parcours d’achat. Le paiement réel sera branché sur la solution choisie par Laure Polin.</p></div>`;
      pied.innerHTML = `<button class="bouton" type="button" data-panier-fermer2>Revenir aux œuvres</button>`;
      pied.querySelector('[data-panier-fermer2]').addEventListener('click', () => { this.etape = 'liste'; this.rendre(); this.fermer(); });
      return;
    }
    if (!n) {
      liste.innerHTML = `<div class="vide"><p>Votre panier est vide.</p><p class="petit">Les œuvres disponibles sont des pièces uniques ou des tirages numérotés : ajoutez-en une, ou demandez à Laure Polin d’autres photos.</p><a class="bouton" href="salle.html?s=ardoise">Voir les œuvres</a></div>`;
      pied.innerHTML = '';
      return;
    }
    liste.innerHTML = this.items.map((it) => {
      const o = LP.parId[it.id]; if (!o) return '';
      const v = LP.visuel(o);
      const qte = it.id === 'dialogues-sculptes'
        ? `<span class="mini">Quantité <button type="button" data-moins="${it.id}" aria-label="Retirer un exemplaire">−</button> ${it.q} <button type="button" data-plus="${it.id}" aria-label="Ajouter un exemplaire">+</button></span>`
        : '<span class="mini">Pièce unique</span>';
      return `<div class="ligne-panier">
        <img src="${v ? LP.src(v, 200) : ''}" alt="">
        <div><div class="t">${LP.esc(o.titre)}</div>${qte}<br><button type="button" data-retirer="${it.id}">Retirer</button></div>
        <div class="chiffres">${LP.prix(o.prix * it.q)}</div></div>`;
    }).join('');
    if (this.etape === 'paiement') {
      pied.innerHTML = `
        <div class="total"><span>Total</span><strong class="chiffres">${LP.prix(this.total())}</strong></div>
        <p class="mini">Livraison ou retrait à l’atelier de Bagnolet : <span class="a-completer">conditions à compléter</span>. Mentions de TVA : <span class="a-completer">à confirmer</span>.</p>
        <div class="moyens" aria-label="Moyens de paiement"><span>Moyens de paiement : à compléter</span></div>
        <button class="bouton bouton--plein" type="button" data-payer><span>Valider la commande simulée</span></button>
        <button class="lien mini" type="button" data-retour style="justify-self:start">Revenir au panier</button>`;
      pied.querySelector('[data-payer]').addEventListener('click', () => { this.items = []; this.etape = 'fait'; this.sauver(); document.querySelectorAll('[data-ajout]').forEach((b) => this.etatBouton(b)); });
      pied.querySelector('[data-retour]').addEventListener('click', () => { this.etape = 'liste'; this.rendre(); });
    } else {
      pied.innerHTML = `
        <div class="total"><span>Sous-total</span><strong class="chiffres">${LP.prix(this.total())}</strong></div>
        <p class="mini">Paiement simulé : aucune donnée bancaire n’est demandée dans cette maquette.</p>
        <button class="bouton bouton--plein" type="button" data-commander><span>Passer commande</span></button>`;
      pied.querySelector('[data-commander]').addEventListener('click', () => { this.etape = 'paiement'; this.rendre(); });
    }
  },
};
LP.panier = Panier;
function monterPanier() {
  document.querySelector('[data-panier-ouvrir]').addEventListener('click', () => Panier.ouvrir());
  document.querySelector('[data-panier-fermer]').addEventListener('click', () => Panier.fermer());
  document.querySelector('[data-voile]').addEventListener('click', () => Panier.fermer());
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') Panier.fermer(); });
  document.querySelector('.panier').addEventListener('click', (e) => {
    const r = e.target.closest('[data-retirer]'); if (r) Panier.retirer(r.dataset.retirer);
    const m = e.target.closest('[data-moins]'); if (m) Panier.quantite(m.dataset.moins, -1);
    const p = e.target.closest('[data-plus]'); if (p) Panier.quantite(p.dataset.plus, 1);
  });
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-ajout]');
    if (!b) return;
    e.preventDefault();
    if (Panier.a(b.dataset.ajout) && b.dataset.ajout !== 'dialogues-sculptes') { Panier.ouvrir(); return; }
    Panier.ajouter(b.dataset.ajout, b);
  });
  Panier.rendre();
}
LP.majBoutonsPanier = (racine = document) => racine.querySelectorAll('[data-ajout]').forEach((b) => Panier.etatBouton(b));

/* ---------- transitions de page en feuillets ---------- */
function monterTransitions() {
  const lames = [...document.querySelectorAll('.rideau i')];
  if (memo.session('lp-transition') === '1' && !calme) {
    memo.session('lp-transition', '0');
    gsap.set(lames, { scaleX: 1, transformOrigin: 'right' });
    gsap.to(lames, { scaleX: 0, duration: 0.7, ease: 'expo.inOut', stagger: { each: 0.05, from: 'random' }, delay: 0.05 });
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || calme || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || !/\.html$|\/$/.test(url.pathname) && !url.pathname.endsWith('/')) {
      if (url.origin !== location.origin) return;
    }
    const norm = (p) => p.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
    if (norm(url.pathname) === norm(location.pathname) && url.search === location.search) return;
    if (a.getAttribute('href').startsWith('#')) return;
    e.preventDefault();
    memo.session('lp-transition', '1');
    gsap.set(lames, { transformOrigin: 'left' });
    gsap.to(lames, { scaleX: 1, duration: 0.6, ease: 'expo.inOut', stagger: { each: 0.045, from: 'random' }, onComplete: () => { location.href = url.href; } });
  });
  addEventListener('pageshow', (e) => { if (e.persisted) gsap.set(lames, { scaleX: 0 }); });
}

/* ---------- ouverture : monogramme a la craie, poussiere, feuillets ---------- */
function ouverture() {
  return new Promise((resoudre) => {
    const premiere = memo.session('lp-vu') !== '1';
    if (!premiere || calme || document.body.dataset.ouverture === 'non') { document.documentElement.classList.add('deja-vu'); resoudre(); return; }
    memo.session('lp-vu', '1');
    const o = document.createElement('div');
    o.className = 'ouverture'; o.setAttribute('aria-hidden', 'true');
    const n = 7;
    let feuillets = '';
    for (let i = 0; i < n; i++) feuillets += `<div class="feuillet" style="top:${(i * 100) / n}%;height:${100 / n + 0.2}%;background-position:center ${(i * 100) / (n - 1)}%"></div>`;
    o.innerHTML = `${feuillets}
      <svg width="0" height="0" style="position:absolute"><filter id="craie"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></svg>
      <div class="scene"><div class="signature">
        <svg class="mono" viewBox="-6 -6 ${MONO.w + 12} ${MONO.h + 12}"><path d="${MONO.d}" fill-rule="evenodd"/></svg>
        <div class="nom">${'Laure Polin'.split('').map((c) => `<span>${c === ' ' ? '&nbsp;' : c}</span>`).join('')}</div>
      </div></div>
      <div class="compteur chiffres">Sculptures, Bagnolet</div>
      <canvas></canvas>`;
    document.body.append(o);
    const chemin = o.querySelector('.mono path');
    const L = chemin.getTotalLength();
    gsap.set(chemin, { strokeDasharray: L, strokeDashoffset: L });
    const lettres = o.querySelectorAll('.nom span');
    const cv = o.querySelector('canvas');
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    const grains = [];
    const souffle = () => {
      const r = o.querySelector('.signature').getBoundingClientRect();
      for (let i = 0; i < 420; i++) {
        grains.push({ x: r.left + Math.random() * r.width, y: r.top + Math.random() * r.height, vx: (Math.random() - 0.3) * 6, vy: (Math.random() - 0.7) * 4, v: 1, s: Math.random() * 2.2 + 0.4 });
      }
    };
    const anime = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const g of grains) {
        g.x += g.vx; g.y += g.vy; g.vx *= 0.985; g.vy = g.vy * 0.985 - 0.02; g.v *= 0.975;
        ctx.fillStyle = `rgba(236,232,224,${g.v * 0.8})`;
        ctx.fillRect(g.x * dpr, g.y * dpr, g.s * dpr, g.s * dpr);
      }
    };
    gsap.ticker.add(anime);
    const tl = gsap.timeline({
      onComplete: () => { gsap.ticker.remove(anime); o.remove(); },
    });
    const passer = () => { if (tl.progress() < 1) tl.progress(1); };
    addEventListener('pointerdown', passer, { once: true });
    addEventListener('keydown', passer, { once: true });
    tl.to(chemin, { strokeDashoffset: 0, duration: 1.15, ease: 'power2.inOut' })
      .to(chemin, { fill: 'rgba(236,232,224,1)', duration: 0.35 }, 0.95)
      .from(lettres, { opacity: 0, y: 14, filter: 'blur(6px)', duration: 0.6, stagger: 0.035, ease: 'power3.out' }, 0.55)
      .add(souffle, 1.6)
      .to(o.querySelector('.signature'), { opacity: 0, scale: 0.96, filter: 'blur(8px)', duration: 0.45, ease: 'power2.in' }, 1.6)
      .add(() => resoudre(), 1.75)
      .to(o.querySelectorAll('.feuillet'), {
        xPercent: (i) => (i % 2 ? 104 : -104), duration: 0.95, ease: 'expo.inOut', stagger: { each: 0.05, from: 'center' },
      }, 1.7);
  });
}

/* ---------- pied de page : nom trace ---------- */
function monterPied() {
  const pied = document.querySelector('.pied');
  if (!pied) return;
  const zone = pied.querySelector('[data-grand-nom]');
  if (zone) {
    zone.innerHTML = `<svg viewBox="-20 0 ${NOM.w + 40} ${NOM.h}" role="img" aria-label="Laure Polin">${NOM.paths.map((d) => `<path d="${d}"/>`).join('')}</svg>`;
    if (!calme) {
      const chemins = zone.querySelectorAll('path');
      chemins.forEach((p) => { const l = p.getTotalLength(); p.style.strokeDasharray = l; p.style.strokeDashoffset = l; });
      gsap.to(chemins, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.12, scrollTrigger: { trigger: zone, start: 'top 85%', once: true } });
      gsap.to(chemins, { fill: 'rgba(60,68,78,.55)', duration: 1.2, delay: 2.2, scrollTrigger: { trigger: zone, start: 'top 85%', once: true } });
    } else {
      zone.querySelectorAll('path').forEach((p) => { p.style.fill = 'rgba(60,68,78,.55)'; });
    }
  }
}

/* ---------- retour arriere : la page revient a l'endroit quitte ---------- */
function memoirePosition() {
  const cle = `lp-pos:${location.pathname}${location.search}`;
  const lire = () => { try { return sessionStorage.getItem(cle); } catch (e) { return null; } };
  addEventListener('pagehide', () => { try { sessionStorage.setItem(cle, String(Math.round(scrollY))); } catch (e) { /* stockage indisponible */ } });
  const nav = performance.getEntriesByType?.('navigation')[0];
  const y = Number(lire());
  if (!nav || nav.type !== 'back_forward' || !y || location.hash) return;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  LP.pret.then(() => setTimeout(() => {
    ScrollTrigger.refresh();
    if (LP.lenis) { LP.lenis.resize(); LP.lenis.scrollTo(y, { immediate: true, force: true }); } else scrollTo(0, y);
  }, 350));
}

/* ---------- demarrage ---------- */
let resoudrePret;
LP.pret = new Promise((r) => { resoudrePret = r; });
export function demarrer() {
  monterChrome();
  monterDefilement();
  monterCurseur();
  monterSon();
  monterPanier();
  monterTransitions();
  monterPied();
  LP.aimants();
  LP.inclinaison();
  memoirePosition();
  const go = () => ouverture().then(() => resoudrePret());
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
  addEventListener('load', () => ScrollTrigger.refresh());
  return LP;
}
export default LP;
