/* En-tête du site (base.js : monterChrome, monterDefilement, monterTransitions, ouverture)
   et comportements de tout le site : défilement doux Lenis, rideau d'ouverture (une fois par session),
   rideau de transition entre pages, barre de progression, grain, notifications du panier Wix. */
import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { FC, HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import Lenis from 'lenis';
import s from './lp-entete.module.css';
import type { LpEnteteProps, Salle } from './lp-entete.props';
import { ARIAS, NOMS_LANGUES } from './constants';
import { moteur, calme, pointeurFin, session, signalerPret, piegeFixe, rafraichir, polices, lenis as lenisActif, attendrePret } from '../../../../lp-commun/moteur';
import { categorie, etatPanier, tailleWix, srcsetWix } from '../../../../lp-commun/donnees';
import type { DetailAjout } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, gabarit, nombreOeuvres } from '../../../../lp-commun/react';

const inerte = (on: boolean): HTMLAttributes<HTMLElement> => (on ? ({ inert: '' } as unknown as HTMLAttributes<HTMLElement>) : {});

const ICO = {
  sac: <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 7h12l-1 10H5L4 7z M7 7V5.5a3 3 0 0 1 6 0V7" stroke="currentColor" strokeWidth="1.3" fill="none" /></svg>,
  menu: <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.4" /></svg>,
  croix: <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.4" /></svg>,
};

type InfoSalle = { nombre: number; lien: string };

/* ---------- ouverture : le logo apparaît, reste lisible, puis l'ardoise s'ouvre en feuillets ---------- */
const Ouverture: FC<{ logo: string; logoSrcset?: string; fond: string; texte: string; onFin: () => void }> = ({ logo, logoSrcset, fond, texte, onFin }) => {
  const ref = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, '');
  useEffect(() => {
    const o = ref.current;
    if (!o) return undefined;
    const { gsap } = moteur();
    const chemin = o.querySelector<SVGPathElement>('[data-trait]');
    const logoEl = o.querySelector('[data-logo]');
    const signature = o.querySelector('[data-signature]');
    const cv = o.querySelector('canvas');
    if (!chemin || !logoEl || !signature || !cv) return undefined;
    const L = chemin.getTotalLength();
    gsap.set(chemin, { strokeDasharray: L, strokeDashoffset: L });
    const ctx = cv.getContext('2d');
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
    const grains: Array<{ x: number; y: number; vx: number; vy: number; v: number; s: number }> = [];
    const souffle = () => {
      const r = signature.getBoundingClientRect();
      for (let i = 0; i < 420; i++) {
        grains.push({ x: r.left + Math.random() * r.width, y: r.top + Math.random() * r.height, vx: (Math.random() - 0.3) * 6, vy: (Math.random() - 0.7) * 4, v: 1, s: Math.random() * 2.2 + 0.4 });
      }
    };
    const anime = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const g of grains) {
        g.x += g.vx; g.y += g.vy; g.vx *= 0.985; g.vy = g.vy * 0.985 - 0.02; g.v *= 0.975;
        ctx.fillStyle = `rgba(236,232,224,${g.v * 0.8})`;
        ctx.fillRect(g.x * dpr, g.y * dpr, g.s * dpr, g.s * dpr);
      }
    };
    gsap.ticker.add(anime);
    let pret = false;
    const dire = () => { if (!pret) { pret = true; signalerPret(); } };
    const tl = gsap.timeline({ paused: true, onComplete: () => { gsap.ticker.remove(anime); dire(); onFin(); } });
    const passer = () => { if (tl.progress() < 1) tl.progress(1); };
    addEventListener('pointerdown', passer, { once: true });
    addEventListener('keydown', passer, { once: true });
    tl.from(logoEl, { opacity: 0, y: 16, filter: 'blur(8px)', duration: 0.9, ease: 'power3.out' }, 0.05)
      .to(chemin, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, 0.5)
      .add(souffle, 2.5)
      .to(signature, { opacity: 0, scale: 0.97, filter: 'blur(8px)', duration: 0.45, ease: 'power2.in' }, 2.5)
      .add(dire, 2.6)
      .to(o.querySelectorAll('[data-feuillet]'), {
        xPercent: (i: number) => (i % 2 ? 104 : -104), duration: 0.85, ease: 'expo.inOut', stagger: { each: 0.04, from: 'center' },
      }, 2.55);
    polices().then(() => tl.play());
    return () => {
      tl.kill(); gsap.ticker.remove(anime);
      removeEventListener('pointerdown', passer); removeEventListener('keydown', passer);
      dire();
    };
  }, [onFin]);
  const n = 7;
  return (
    <div className={s.ouverture} aria-hidden="true" ref={ref}>
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className={s.feuillet} data-feuillet="" style={{ top: `${(i * 100) / n}%`, height: `${100 / n + 0.2}%`, backgroundImage: `url("${fond}")`, backgroundPosition: `center ${(i * 100) / (n - 1)}%` }} />
      ))}
      <svg width="0" height="0" style={{ position: 'absolute' }}><filter id={`craie-${uid}`}><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves={2} seed={4} /><feDisplacementMap in="SourceGraphic" scale={3.2} /></filter></svg>
      <div className={s.scene}>
        <div className={s.signature} data-signature="">
          <img className={s['logo-ouverture']} data-logo="" src={logo} srcSet={logoSrcset} sizes="(max-width: 600px) 46vw, 260px" alt="" width={625} height={673} decoding="async" />
          <svg className={s.trait} viewBox="0 0 400 14" preserveAspectRatio="none"><path data-trait="" d="M4 9 C 90 3, 210 13, 396 5" style={{ filter: `url(#craie-${uid})` }} /></svg>
        </div>
      </div>
      <div className={cx(s, 'compteur chiffres')}>{texte}</div>
      <canvas />
    </div>
  );
};

const LpEntete: FC<LpEnteteProps> = (propsBrutes) => {
  const { langue, lien, autre } = useLangue();
  const props = traduire(propsBrutes, langue);
  const ARIA = ARIAS[langue];
  const {
    id, className, direction, logo, logoTexteAccessible, lienAccueil, libelleOeuvres, salles, motOeuvre, motOeuvres,
    libelleLivre, lienLivre, libelleExpositions, lienExpositions, libelleContact, lienContact, titreMenuSalles,
    lienPanier, texteOuverture, fondOuverture, messageAjout, messageDeja, messageErreur,
    ouvertureAnimee, defilementDoux, transitionsPages, isOpen, elementProps, selecteurLangue, boutonFrancais, boutonAnglais,
  } = props;
  const edition = useEdition();
  const idPanneau = `panneau-oeuvres-${useId().replace(/:/g, '')}`;
  const idMenu = `menu-plein-${useId().replace(/:/g, '')}`;
  const racineRef = useRef<HTMLDivElement>(null);
  const enteteRef = useRef<HTMLElement>(null);
  const traceRef = useRef<HTMLDivElement>(null);
  const rideauRef = useRef<HTMLDivElement>(null);
  const panierRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const btnMenuRef = useRef<HTMLButtonElement>(null);
  const [portail, setPortail] = useState<HTMLElement | null>(null);
  const [plein, setPlein] = useState(false);
  const [cache, setCache] = useState(false);
  const [panneau, setPanneau] = useState(Boolean(isOpen));
  const [panneauVu, setPanneauVu] = useState(Boolean(isOpen));
  const [menu, setMenu] = useState(false);
  const [nombre, setNombre] = useState(0);
  const [infos, setInfos] = useState<Record<number, InfoSalle>>({});
  const [toast, setToast] = useState({ on: false, txt: '' });
  const [ouverture, setOuverture] = useState(false);
  const [statique, setStatique] = useState(false);

  const logoP = { url: logo?.url || '', uri: logo?.uri || '', w: logo?.width || 334, h: logo?.height || 360 };
  const logoSrc = tailleWix(logoP, 240);
  const logoSrcset = srcsetWix(logoP, [111, 167, 223, 334]);
  const fond = fondOuverture?.url ? tailleWix({ url: fondOuverture.url, uri: fondOuverture.uri || '', w: 1920, h: 1080 }, 1920) : '';

  const part = (cle: keyof NonNullable<LpEnteteProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });

  /* ---------- menu des salles (ouverture au survol ou au clic) ---------- */
  const tempo = useRef<number>(0);
  const parSurvol = useRef(false);
  const ouvrirPanneau = useCallback((on: boolean) => {
    window.clearTimeout(tempo.current);
    setPanneau(on);
    if (on) { setPanneauVu(true); } else { tempo.current = window.setTimeout(() => setPanneauVu(false), 350); }
  }, []);
  useEffect(() => { ouvrirPanneau(Boolean(isOpen)); }, [isOpen, ouvrirPanneau]);
  const [panneauOuvert, setPanneauOuvert] = useState(Boolean(isOpen));
  useEffect(() => {
    if (!panneau) { setPanneauOuvert(false); return undefined; }
    const r = requestAnimationFrame(() => setPanneauOuvert(true));
    return () => cancelAnimationFrame(r);
  }, [panneau]);

  /* ---------- montage : portail si un ancêtre piège position: fixed, réglages de l'appareil ---------- */
  useEffect(() => {
    const st = edition || calme();
    setStatique(st);
    if (edition) return undefined;
    if (piegeFixe(racineRef.current)) {
      const d = document.createElement('div');
      document.body.append(d);
      setPortail(d);
      return () => { d.remove(); };
    }
    return undefined;
  }, [edition]);

  /* ---------- nombre d'œuvres et adresses des salles (catégories Wix Stores) ---------- */
  useEffect(() => {
    let vivant = true;
    salles.forEach((sa, k) => {
      if (!sa.categorie) return;
      categorie(sa.categorie).then((c) => { if (vivant && c) setInfos((v) => ({ ...v, [k]: { nombre: c.nombre, lien: c.lien } })); }).catch((): void => undefined);
    });
    return () => { vivant = false; };
  }, [salles]);

  /* ---------- panier Wix : pastille, notification, vol de la photo ---------- */
  useEffect(() => {
    let minuterie = 0;
    const montrer = (txt: string) => {
      setToast({ on: true, txt });
      window.clearTimeout(minuterie);
      minuterie = window.setTimeout(() => setToast((t) => ({ ...t, on: false })), 3200);
    };
    const surEtat = (e: Event) => setNombre((e as CustomEvent<{ nombre: number }>).detail.nombre);
    const surAjout = (e: Event) => {
      const d = (e as CustomEvent<DetailAjout>).detail;
      if (d.erreur) { montrer(messageErreur || ''); return; }
      if (d.deja) { montrer(gabarit(messageDeja, { titre: d.titre })); return; }
      montrer(gabarit(messageAjout, { titre: d.titre }));
      const cible = panierRef.current;
      if (calme() || !d.depuis || !d.image || !cible) return;
      const { gsap } = moteur();
      const r = d.depuis; const c = cible.getBoundingClientRect();
      const v = document.createElement('img');
      v.src = d.image; v.alt = ''; v.className = s.vol;
      v.style.left = `${r.left + r.width / 2 - 30}px`; v.style.top = `${r.top + r.height / 2 - 30}px`;
      document.body.append(v);
      gsap.timeline({ onComplete: () => v.remove() })
        .to(v, { duration: 0.9, ease: 'power2.in', x: c.left + c.width / 2 - (r.left + r.width / 2), scale: 0.3 }, 0)
        .to(v, { duration: 0.9, ease: 'back.in(1.6)', y: c.top + c.height / 2 - (r.top + r.height / 2) }, 0)
        .to(v, { opacity: 0, duration: 0.2 }, 0.75)
        .fromTo(cible, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1 }, 0.82);
    };
    window.addEventListener('lp:panier-etat', surEtat);
    window.addEventListener('lp:panier', surAjout);
    if (!edition) etatPanier().then((e) => setNombre(e.nombre)).catch((): void => undefined);
    return () => { window.removeEventListener('lp:panier-etat', surEtat); window.removeEventListener('lp:panier', surAjout); window.clearTimeout(minuterie); };
  }, [edition, messageAjout, messageDeja, messageErreur]);

  /* ---------- défilement doux, ancres, en-tête qui se cache, progression ---------- */
  useEffect(() => {
    if (edition) { signalerPret(); return undefined; }
    const { gsap, ScrollTrigger } = moteur();
    const html = document.documentElement;
    let l = lenisActif();
    let cree = false;
    let tick: ((t: number) => void) | null = null;
    let surFocus: (() => void) | null = null;
    if (!calme() && defilementDoux && !l) {
      const nouveau = new Lenis({ duration: 1.15, smoothWheel: true, wheelMultiplier: 0.95, touchMultiplier: 1.4 });
      l = nouveau as unknown as NonNullable<typeof l>;
      window.__lpLenis = l;
      cree = true;
      nouveau.on('scroll', ScrollTrigger.update);
      tick = (t: number) => nouveau.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      html.style.scrollBehavior = 'auto';
      // après un défilement natif provoqué par le focus clavier, Lenis repart de la vraie position
      surFocus = () => requestAnimationFrame(() => requestAnimationFrame(() => { if (nouveau.isScrolling !== 'smooth') (nouveau as unknown as { reset: () => void }).reset(); }));
      document.addEventListener('focusin', surFocus);
      rafraichir();
    }
    // ancres internes de la page
    const surClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a || e.defaultPrevented) return;
      const href = a.getAttribute('href') || '';
      const i = href.indexOf('#');
      if (i < 0) return;
      const chemin = href.slice(0, i);
      if (chemin && chemin !== location.pathname && !(chemin === '/' && (location.pathname === '' || location.pathname === '/'))) return;
      let cible: HTMLElement | null = null;
      try { cible = href.length > i + 1 ? document.getElementById(decodeURIComponent(href.slice(i + 1))) : null; } catch (er) { cible = null; }
      if (!cible) return;
      e.preventDefault();
      const ln = lenisActif();
      if (ln) ln.scrollTo(cible, { offset: 0, duration: 1.6 });
      else cible.scrollIntoView({ behavior: calme() ? 'auto' : 'smooth' });
      history.replaceState(null, '', href.slice(i));
      if (!cible.matches('a, button, input, textarea, select, [tabindex]')) cible.setAttribute('tabindex', '-1');
      cible.focus({ preventScroll: true });
    };
    document.addEventListener('click', surClic);
    // en-tête compact, caché en descendant, barre de progression
    let dernier = 0;
    const maj = () => {
      const y = window.scrollY;
      setPlein(y > 40);
      const menuOuvert = !!menuRef.current?.dataset.ouvert;
      if (y > 300 && y > dernier + 2 && !menuOuvert) setCache(true);
      if (y < dernier - 2) setCache(false);
      dernier = y;
      const h = document.documentElement.scrollHeight - innerHeight;
      if (traceRef.current) traceRef.current.style.transform = `scaleX(${h > 0 ? Math.min(1, y / h) : 0})`;
    };
    addEventListener('scroll', maj, { passive: true });
    maj();
    // arrivée sur une ancre (« /#contact » depuis une autre page)
    if (location.hash) {
      attendrePret().then(() => window.setTimeout(() => {
        let cible: HTMLElement | null = null;
        try { cible = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch (er) { cible = null; }
        if (!cible) return;
        ScrollTrigger.refresh();
        const y = cible.getBoundingClientRect().top + scrollY;
        const ln = lenisActif();
        if (ln) { ln.resize(); ln.scrollTo(y, { immediate: true, force: true }); } else scrollTo(0, y);
      }, 450));
    }
    return () => {
      removeEventListener('scroll', maj);
      document.removeEventListener('click', surClic);
      if (surFocus) document.removeEventListener('focusin', surFocus);
      if (cree && l) {
        if (tick) gsap.ticker.remove(tick);
        l.destroy();
        window.__lpLenis = null;
        html.style.scrollBehavior = '';
      }
    };
  }, [edition, defilementDoux]);

  /* ---------- rideau de transition entre les pages ---------- */
  const allerVers = useCallback((href: string) => {
    const lames = rideauRef.current ? Array.from(rideauRef.current.children) : [];
    if (calme() || !transitionsPages || !lames.length) { location.href = href; return; }
    const { gsap } = moteur();
    session('lp-transition', '1');
    gsap.set(lames, { transformOrigin: 'left' });
    gsap.to(lames, { scaleX: 1, duration: 0.6, ease: 'expo.inOut', stagger: { each: 0.045, from: 'random' }, onComplete: () => { location.href = href; } });
  }, [transitionsPages]);
  useEffect(() => {
    if (edition) return undefined;
    const { gsap } = moteur();
    const lames = rideauRef.current ? Array.from(rideauRef.current.children) : [];
    if (session('lp-transition') === '1' && !calme() && lames.length) {
      session('lp-transition', '0');
      gsap.set(lames, { scaleX: 1, transformOrigin: 'right' });
      gsap.to(lames, { scaleX: 0, duration: 0.7, ease: 'expo.inOut', stagger: { each: 0.05, from: 'random' }, delay: 0.05 });
    }
    if (!transitionsPages || calme()) return undefined;
    const surClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank' || a.hasAttribute('download')) return;
      const brut = a.getAttribute('href') || '';
      if (brut.startsWith('#')) return;
      let url: URL;
      try { url = new URL(a.href, location.href); } catch (er) { return; }
      if (url.origin !== location.origin || !/^https?:$/.test(url.protocol)) return;
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      allerVers(url.href);
    };
    const surRetour = (e: PageTransitionEvent) => { if (e.persisted) gsap.set(lames, { scaleX: 0 }); };
    // en phase de capture : passe avant le routeur du site, qui ignore un clic déjà traité
    window.addEventListener('click', surClic, true);
    addEventListener('pageshow', surRetour);
    return () => { window.removeEventListener('click', surClic, true); removeEventListener('pageshow', surRetour); };
  }, [edition, transitionsPages, allerVers, portail]);

  /* ---------- ouverture (première page vue de la session) ---------- */
  useEffect(() => {
    if (edition) { signalerPret(); return; }
    if (!ouvertureAnimee || calme() || session('lp-vu') === '1') { signalerPret(); return; }
    session('lp-vu', '1');
    window.__lpOuvertureEnCours = true;
    window.__lpPret = false;
    setOuverture(true);
  }, [edition, ouvertureAnimee]);
  const finOuverture = useCallback(() => setOuverture(false), []);

  /* ---------- menu plein écran (≤ 940 px) ---------- */
  const ouvrirMenu = (on: boolean) => {
    setMenu(on);
    const ln = lenisActif();
    document.documentElement.style.overflow = on ? 'hidden' : '';
    if (on) { ln?.stop(); requestAnimationFrame(() => menuRef.current?.querySelector<HTMLElement>('[data-menu-salle]')?.focus()); } else { ln?.start(); btnMenuRef.current?.focus(); }
  };
  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (menuRef.current?.dataset.ouvert) ouvrirMenu(false);
      if (panneau) { ouvrirPanneau(false); enteteRef.current?.querySelector<HTMLElement>('[data-nav-bouton]')?.focus(); }
    };
    const surClicDehors = (e: MouseEvent) => {
      const nav = enteteRef.current?.querySelector('[data-nav-oeuvres]');
      if (panneau && nav && !nav.contains(e.target as Node)) ouvrirPanneau(false);
    };
    document.addEventListener('keydown', surTouche);
    document.addEventListener('click', surClicDehors);
    return () => { document.removeEventListener('keydown', surTouche); document.removeEventListener('click', surClicDehors); };
  });

  const infoDe = (sa: Salle, k: number): InfoSalle => ({ nombre: infos[k]?.nombre || 0, lien: sa.lien || infos[k]?.lien || '' });
  const compte = (n: number) => nombreOeuvres(n, motOeuvre, motOeuvres);
  const libellePanier = nombre ? gabarit(ARIA.panierArticles, { n: String(nombre), articles: nombre > 1 ? ARIA.articles : ARIA.article }) : ARIA.panier;
  const imgLogo = <img className={s['marque-logo']} src={logoSrc} srcSet={logoSrcset} sizes="(max-width: 940px) 68px, 80px" alt="" width={625} height={673} decoding="async" />;

  const langues = (menuPlein: boolean) => (selecteurLangue ? (
    <div className={cx(s, 'langues', menuPlein && 'langues--menu')} role="group" aria-label={ARIA.langues}>
      {(['fr', 'en'] as const).map((l, k) => (
        <React.Fragment key={l}>
          {k ? <span aria-hidden="true">/</span> : null}
          <button type="button" {...part('lpEnteteLangue', 'lp-entete-langue', 'langue')} lang={l} aria-pressed={langue === l} aria-label={NOMS_LANGUES[l]} onClick={() => { if (l !== langue) allerVers(autre(l)); }}>
            {l === 'fr' ? boutonFrancais : boutonAnglais}
          </button>
        </React.Fragment>
      ))}
    </div>
  ) : null);

  const contenu = (
    <>
      <header ref={enteteRef} className={cx(s, 'entete', plein && 'est-plein', cache && !menu && 'est-cache')} onFocus={() => setCache(false)}>
        <a {...part('lpEnteteLogo', 'lp-entete-logo', 'marque')} href={lien(lienAccueil)} aria-label={logoTexteAccessible}>{imgLogo}</a>
        <nav className={s.nav} aria-label={ARIA.navigation}>
          <div
            className={s['nav-oeuvres']}
            data-nav-oeuvres=""
            onPointerEnter={() => { if (!pointeurFin()) return; if (!panneau) parSurvol.current = true; ouvrirPanneau(true); }}
            onPointerLeave={() => { if (!pointeurFin()) return; window.clearTimeout(tempo.current); tempo.current = window.setTimeout(() => ouvrirPanneau(false), 220); }}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) ouvrirPanneau(false); }}
          >
            <button
              type="button"
              {...part('lpEnteteMenuOeuvres', 'lp-entete-menu-oeuvres', 'nav-bouton')}
              data-nav-bouton=""
              aria-expanded={panneau}
              aria-controls={idPanneau}
              onClick={() => {
                // un clic juste après l'ouverture au survol garde le panneau ouvert
                if (parSurvol.current && panneau) { parSurvol.current = false; return; }
                parSurvol.current = false;
                ouvrirPanneau(!panneau);
              }}
            >
              {libelleOeuvres}
              <svg viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.3" /></svg>
            </button>
            <div className={cx(s, 'panneau-oeuvres', panneauOuvert && 'ouvert')} id={idPanneau} hidden={!panneauVu && !panneau} aria-hidden={!panneau}>
              {salles.map((sa, k) => {
                const inf = infoDe(sa, k);
                const im = sa.image?.url ? { url: sa.image.url, uri: sa.image.uri || '', w: sa.image.width || 800, h: sa.image.height || 1100 } : null;
                return (
                  <a key={`${sa.titre}-${k}`} {...part('lpEnteteSalle', 'lp-entete-salle', 'salle-lien')} href={lien(inf.lien) || undefined}>
                    <span className={s.vig}>{im ? <img src={tailleWix(im, 300)} alt="" loading="lazy" /> : null}</span>
                    <span className={s.t}>{sa.titre}</span>
                    <span className={cx(s, 'n chiffres')} hidden={!sa.categorie || !inf.nombre}>{inf.nombre ? compte(inf.nombre) : ''}</span>
                  </a>
                );
              })}
            </div>
          </div>
          <a {...part('lpEnteteLien', 'lp-entete-lien', 'nav-lien')} href={lien(lienLivre)}>{libelleLivre}</a>
          <a {...part('lpEnteteLien', 'lp-entete-lien', 'nav-lien')} href={lien(lienExpositions)}>{libelleExpositions}</a>
          <a {...part('lpEnteteContact', 'lp-entete-contact', 'nav-lien', 'nav-contact')} href={lien(lienContact)}>{libelleContact}</a>
        </nav>
        <div className={s.outils}>
          {langues(false)}
          <button ref={panierRef} type="button" {...part('lpEntetePanier', 'lp-entete-panier', 'outil')} onClick={() => allerVers(lien(lienPanier || '/cart-page') || '/cart-page')}>
            {ICO.sac}
            <span className={s.sr}>{libellePanier}</span>
            <span className={cx(s, 'pastille', nombre > 0 && 'on')} aria-hidden="true">{nombre}</span>
          </button>
          <button ref={btnMenuRef} type="button" {...part('lpEnteteMenuBouton', 'lp-entete-menu-bouton', 'outil', 'menu-bouton')} aria-expanded={menu} aria-controls={idMenu} aria-label={ARIA.ouvrirMenu} onClick={() => ouvrirMenu(true)}>
            {ICO.menu}
          </button>
        </div>
      </header>
      <div
        ref={menuRef}
        className={cx(s, 'menu-plein', menu && 'ouvert')}
        id={idMenu}
        role="dialog"
        aria-modal="true"
        aria-label={ARIA.menu}
        data-lenis-prevent=""
        data-ouvert={menu ? '1' : undefined}
        {...inerte(!menu)}
      >
        <a className={s['menu-logo']} href={lien(lienAccueil)} aria-label={logoTexteAccessible} onClick={() => ouvrirMenu(false)}>{imgLogo}</a>
        <button type="button" className={cx(s, 'outil fermer')} aria-label={ARIA.fermerMenu} onClick={() => ouvrirMenu(false)}>{ICO.croix}</button>
        <p {...part('lpEnteteMenuTitre', 'lp-entete-menu-titre', 'menu-titre', 'mini')}>{titreMenuSalles}</p>
        {salles.map((sa, k) => {
          const inf = infoDe(sa, k);
          return (
            <a
              key={`${sa.titre}-${k}`}
              {...part('lpEnteteMenuSalle', 'lp-entete-menu-salle', 'menu-salle')}
              data-menu-salle=""
              href={lien(inf.lien) || undefined}
              aria-label={sa.categorie && inf.nombre ? `${sa.titre}, ${compte(inf.nombre)}` : undefined}
              onClick={() => ouvrirMenu(false)}
            >
              <span>{sa.titre}</span>
              <small className={s.chiffres} aria-hidden="true" hidden={!sa.categorie || !inf.nombre}>{inf.nombre || ''}</small>
            </a>
          );
        })}
        <span className={s['menu-sep']} aria-hidden="true" />
        <a {...part('lpEnteteMenuLien', 'lp-entete-menu-lien', 'menu-second')} href={lien(lienLivre)} onClick={() => ouvrirMenu(false)}>{libelleLivre}</a>
        <a {...part('lpEnteteMenuLien', 'lp-entete-menu-lien', 'menu-second')} href={lien(lienExpositions)} onClick={() => ouvrirMenu(false)}>{libelleExpositions}</a>
        <a {...part('lpEnteteMenuLien', 'lp-entete-menu-lien', 'menu-second')} href={lien(lienContact)} onClick={() => ouvrirMenu(false)}>{libelleContact}</a>
        {langues(true)}
      </div>
      <div className={s['empreinte-progression']} aria-hidden="true"><div className={s.trace} ref={traceRef} /></div>
      <div {...part('lpEnteteNotification', 'lp-entete-notification', 'toast', toast.on && 'on')} role="status" aria-live="polite">{toast.txt}</div>
      <div className={s.rideau} aria-hidden="true" ref={rideauRef}><i /><i /><i /><i /><i /><i /></div>
      <div className={s.grain} aria-hidden="true" />
      {ouverture ? <Ouverture logo={tailleWix(logoP, 334)} logoSrcset={logoSrcset} fond={fond} texte={texteOuverture || ''} onFin={finOuverture} /> : null}
    </>
  );

  const classes = clsx('lp-entete', s.racine, s.fallbackDirection, (edition || statique) && s.calme, edition && s.edition, className);
  return (
    <div id={id} dir={direction} className={classes} ref={racineRef}>
      {portail ? createPortal(<div className={clsx(s.racine, statique && s.calme)} dir={direction}>{contenu}</div>, portail) : contenu}
    </div>
  );
};

export default LpEntete;
