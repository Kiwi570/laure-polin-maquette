/* Socle partagé des composants Laure Polin.
   Chaque composant est un paquet séparé : la première copie de GSAP chargée sur la page
   s'enregistre dans window.__lpGsap et toutes les autres l'utilisent (un seul ticker,
   un seul registre ScrollTrigger). Lenis est créé une seule fois par lp-entete
   (window.__lpLenis) et lu à la demande par les autres. */
import { gsap as gsapLib } from 'gsap';
import { ScrollTrigger as ScrollTriggerLib } from 'gsap/ScrollTrigger';
import { CustomEase as CustomEaseLib } from 'gsap/CustomEase';

export type Moteur = {
  gsap: typeof gsapLib;
  ScrollTrigger: typeof ScrollTriggerLib;
  CustomEase: typeof CustomEaseLib;
};

type LenisLike = {
  raf: (t: number) => void;
  scrollTo: (cible: number | string | HTMLElement, o?: Record<string, unknown>) => void;
  on: (ev: string, f: (...a: Array<unknown>) => void) => void;
  stop: () => void;
  start: () => void;
  resize: () => void;
  reset: () => void;
  destroy: () => void;
  velocity: number;
  isScrolling: boolean | string;
};

declare global {
  interface Window {
    __lpGsap?: Moteur;
    __lpLenis?: LenisLike | null;
    __lpPret?: boolean;
    __lpOuvertureEnCours?: boolean;
    __lpMinuterieRafraichir?: number;
  }
}

export function moteur(): Moteur {
  const w = window;
  if (!w.__lpGsap) {
    gsapLib.registerPlugin(ScrollTriggerLib, CustomEaseLib);
    // déclarée dans la maquette (base.js), conservée telle quelle
    CustomEaseLib.create('taille', 'M0,0 C0.2,0.7 0.1,1 1,1');
    w.__lpGsap = { gsap: gsapLib, ScrollTrigger: ScrollTriggerLib, CustomEase: CustomEaseLib };
  }
  return w.__lpGsap;
}

export const lenis = (): LenisLike | null => (typeof window === 'undefined' ? null : window.__lpLenis || null);

/* Après la création des ScrollTrigger d'un composant : on remet tout dans l'ordre de la page
   puis on recalcule (sinon les déclencheurs créés avant les épinglages se jouent trop tôt :
   voir accueil.js, « lancer »). Regroupé : un seul recalcul pour plusieurs composants. */
export function rafraichir(delai = 120): void {
  if (typeof window === 'undefined') return;
  window.clearTimeout(window.__lpMinuterieRafraichir);
  window.__lpMinuterieRafraichir = window.setTimeout(() => {
    const { ScrollTrigger } = moteur();
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    lenis()?.resize();
  }, delai);
}

/* ---------- réglages de l'appareil (lus côté client seulement) ---------- */
export const calme = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const pointeurFin = (): boolean => window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const etroit = (): boolean => window.innerWidth < 861;
export const glDispo = (): boolean => {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch (e) {
    return false;
  }
};
export const session = (k: string, v?: string): string | null => {
  try {
    if (v === undefined) return sessionStorage.getItem(k);
    sessionStorage.setItem(k, v);
  } catch (e) {
    /* stockage indisponible */
  }
  return null;
};

/* ---------- l'ouverture (rideau d'entrée de lp-entete) ---------- */
export function signalerPret(): void {
  window.__lpPret = true;
  window.__lpOuvertureEnCours = false;
  window.dispatchEvent(new Event('lp:pret'));
}
/** Résout quand l'ouverture est finie (ou tout de suite s'il n'y en a pas). */
export function attendrePret(max = 4200): Promise<void> {
  return new Promise((ok) => {
    if (window.__lpPret) { ok(); return; }
    const attendue = window.__lpOuvertureEnCours || (session('lp-vu') !== '1' && !calme());
    if (!attendue) { ok(); return; }
    let fait = false;
    const fin = () => { if (!fait) { fait = true; ok(); } };
    window.addEventListener('lp:pret', fin, { once: true });
    window.setTimeout(fin, max);
  });
}

/* ---------- polices : les fichiers de la maquette, déclarés dans chaque CSS de composant ---------- */
export function polices(): Promise<unknown> {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  return Promise.all([
    document.fonts.load('300 40px "Cormorant Garamond"'),
    document.fonts.load('400 40px "Cormorant Garamond"'),
    document.fonts.load('500 40px "Cormorant Garamond"'),
    document.fonts.load('600 40px "Cormorant Garamond"'),
    document.fonts.load('italic 400 40px "Cormorant Garamond"'),
    document.fonts.load('400 16px "Inter Tight"'),
    document.fonts.load('500 16px "Inter Tight"'),
  ]).catch(() => undefined).then(() => document.fonts.ready);
}

/* Un ancêtre transformé, filtré ou « contenu » capture les éléments position: fixed
   (épinglage ScrollTrigger, en-tête). On le détecte pour choisir pinType ou un portail. */
export function piegeFixe(el: Element | null): boolean {
  let n = el?.parentElement || null;
  while (n && n !== document.body && n !== document.documentElement) {
    const s = getComputedStyle(n);
    if (
      (s.transform && s.transform !== 'none') ||
      (s.perspective && s.perspective !== 'none') ||
      (s.filter && s.filter !== 'none') ||
      ((s as CSSStyleDeclaration & { backdropFilter?: string }).backdropFilter || 'none') !== 'none' ||
      /layout|paint|strict|content/.test(s.contain || '') ||
      /transform|perspective|filter/.test(s.willChange || '') ||
      ((s as CSSStyleDeclaration & { containerType?: string }).containerType || 'normal') !== 'normal'
    ) return true;
    n = n.parentElement;
  }
  return false;
}

/* ---------- clivage : un titre se fend en feuillets puis se ressoude (LP.cliver) ----------
   Le balisage (strates + fente) est rendu par React ; ici on ne fait que l'animer. */
export type OptionsClive = {
  strates?: number;
  ecart?: number;
  scrub?: boolean;
  declencheur?: Element | false | null;
  debut?: string;
  delai?: number;
  duree?: number;
};
export function animerClive(el: HTMLElement | null, o: OptionsClive = {}): gsap.core.Timeline | null {
  if (!el) return null;
  const { gsap, ScrollTrigger } = moteur();
  const { ecart = 90, scrub = false, declencheur, debut = 'top 82%', delai = 0, duree = 1.5 } = o;
  const couches = Array.from(el.querySelectorAll<HTMLElement>(':scope > [data-strate]'));
  const strates = couches.length;
  const fente = el.querySelector<HTMLElement>(':scope > [data-fente]');
  if (!strates) return null;
  const tl = gsap.timeline({ paused: !scrub, delay: delai });
  couches.forEach((c, i) => {
    const sens = i % 2 ? 1 : -1;
    tl.fromTo(c, { xPercent: 0, x: sens * (ecart * (0.6 + Math.random() * 0.8)), y: (i - strates / 2) * 6, opacity: 0 },
      { x: 0, y: 0, opacity: 1, duration: duree, ease: 'expo.out' }, i * 0.07);
  });
  if (fente) {
    tl.fromTo(fente, { top: '50%', opacity: 0, scaleX: 0 }, { opacity: 0.9, scaleX: 1, duration: 0.35, ease: 'power2.out' }, 0.25)
      .to(fente, { opacity: 0, duration: 0.6 }, 0.75);
  }
  if (scrub) {
    ScrollTrigger.create({ trigger: declencheur || el, start: debut, end: 'bottom 40%', scrub: 1, animation: tl });
  } else if (declencheur !== false) {
    ScrollTrigger.create({ trigger: declencheur || el, start: debut, once: true, onEnter: () => { tl.play(); } });
  }
  return tl;
}
/** clip-path de la strate i sur n (identique à LP.cliver) */
export const clipStrate = (i: number, n: number): string => {
  const haut = (i / n) * 100;
  const bas = 100 - ((i + 1) / n) * 100;
  return `inset(${haut - 0.6}% -10% ${bas - 0.6}% -10%)`;
};

/* ---------- boutons magnétiques (LP.aimants) ---------- */
export function aimants(racine: ParentNode): void {
  if (!pointeurFin() || calme()) return;
  const { gsap } = moteur();
  racine.querySelectorAll<HTMLElement>('[data-bouton], [data-aimant]').forEach((el) => {
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
}

/* ---------- défilement vers une ancre de la page (Lenis si présent) ---------- */
export function allerA(cible: Element | number, duree = 1.6): void {
  const l = lenis();
  if (l) l.scrollTo(cible as HTMLElement, { offset: 0, duration: duree });
  else if (typeof cible === 'number') window.scrollTo({ top: cible, behavior: calme() ? 'auto' : 'smooth' });
  else (cible as HTMLElement).scrollIntoView({ behavior: calme() ? 'auto' : 'smooth' });
}
