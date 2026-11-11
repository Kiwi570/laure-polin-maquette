/* Hero de l'accueil (accueil.js : « hero : une œuvre après l'autre, en vraie photo »).
   Fond d'ardoise WebGL (ardoise-gl.js) ou image de repli, titre en clivage, diaporama des œuvres
   de la catégorie choisie, cartel, pause, traits de progression, composition en particules (poussiere.js). */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-ouverture.module.css';
import type { LpOuvertureProps } from './lp-ouverture.props';
import { ARIAS } from './constants';
import { moteur, calme, glDispo, pointeurFin, attendrePret, animerClive, rafraichir, aimants } from '../../../../lp-commun/moteur';
import { oeuvresDe, couleursPhoto, tailleWix, srcsetWix, prix, teinteSombre } from '../../../../lp-commun/donnees';
import type { Oeuvre } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates, gabarit } from '../../../../lp-commun/react';
import { fondArdoise } from '../../../../lp-commun/ardoise-gl';
import { poussiere } from '../../../../lp-commun/poussiere';

const DUREE = 4;
const TRANSITION = 1.1;
const altOeuvre = (o: Oeuvre) => `${o.titre}${o.matiere ? `, sculpture en ${o.matiere.toLowerCase()}` : ''}, de Laure Polin`;

const Cartel: FC<{ o: Oeuvre | null; langue: 'fr' | 'en' }> = ({ o, langue }) => {
  if (!o) return null;
  return (
    <>
      <strong>{o.titre}</strong>
      {o.matiere}
      {o.matiere && o.dimensions ? ', ' : ''}
      {o.dimensions ? <span className={s.chiffres}>{o.dimensions}</span> : null}
      {o.prix && !o.vendue ? <><br /><span className={s.prix}>{prix(o.prix, langue)}</span></> : null}
    </>
  );
};

const LpOuverture: FC<LpOuvertureProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const ARIA = ARIAS[langue];
  const {
    id, className, direction, titreLigne1, titreLigne2, texte, boutonPrincipalTexte, boutonPrincipalLien,
    boutonSecondaireTexte, boutonSecondaireLien, texteDefiler, lienDefiler, fondArdoise: fondImg, fondArdoisePortrait,
    categorieDiaporama, autoPlay, pauseButtonVisibility, elementProps,
  } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const repliRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const cadreRef = useRef<HTMLDivElement>(null);
  const cartelRef = useRef<HTMLParagraphElement>(null);
  const pointsRef = useRef<HTMLDivElement>(null);
  const [oeuvres, setOeuvres] = useState<Array<Oeuvre>>([]);
  const [actif, setActif] = useState(0);
  const [visibles, setVisibles] = useState<Array<number>>([0]);
  const [cartelIdx, setCartelIdx] = useState(0);
  const [pauseManuelle, setPauseManuelle] = useState(!(autoPlay ?? true));
  const [lecture, setLecture] = useState(false);
  const ctrl = useRef<{ aller: (n: number) => void; pause: (on: boolean) => void } | null>(null);

  const fondUrl = fondImg?.url ? tailleWix({ url: fondImg.url, uri: fondImg.uri || '', w: 1920, h: 1080 }, 1920) : '';
  const fondPortraitUrl = fondArdoisePortrait?.url ? tailleWix({ url: fondArdoisePortrait.url, uri: fondArdoisePortrait.uri || '', w: 1080, h: 1920 }, 1080) : '';

  const part = (cle: keyof NonNullable<LpOuvertureProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });

  /* ---------- œuvres du diaporama (catégorie Wix Stores, dans son ordre) ---------- */
  useEffect(() => {
    let vivant = true;
    if (!categorieDiaporama) return undefined;
    oeuvresDe(categorieDiaporama).then((l) => { if (vivant) setOeuvres(l.filter((o) => o.photos.length)); }).catch(() => undefined);
    return () => { vivant = false; };
  }, [categorieDiaporama]);

  useEffect(() => { setPauseManuelle(!(autoPlay ?? true) || (typeof window !== 'undefined' && calme())); }, [autoPlay]);

  /* ---------- fond, titre, entrée du texte, parallaxe ---------- */
  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const { gsap } = moteur();
    const statique = edition || calme();
    let fond: { detruire: () => void } | null = null;
    if (!statique && glDispo() && fondUrl) {
      fond = fondArdoise(sec, { image: fondUrl, imageMobile: fondPortraitUrl || undefined });
      if (fond && repliRef.current) repliRef.current.style.display = 'none';
    }
    const ctx = gsap.context(() => {
      if (statique) return;
      const titres = Array.from(sec.querySelectorAll<HTMLElement>('[data-clive]'));
      const tls = titres.map((t, i) => animerClive(t, { strates: 5, ecart: 160, declencheur: false, delai: i * 0.12, duree: 1.7 }));
      const entrants = sec.querySelectorAll('[data-entree]');
      gsap.set(entrants, { opacity: 0, y: 20 });
      attendrePret().then(() => {
        ctx.add(() => {
          tls.forEach((t) => t && t.play());
          gsap.to(entrants, { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.6 });
          gsap.to(sec.querySelector('[data-grille]'), { yPercent: -12, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
          rafraichir();
        });
      });
    }, sec);
    aimants(sec);
    return () => { ctx.revert(); fond?.detruire(); if (repliRef.current) repliRef.current.style.display = ''; rafraichir(); };
  }, [edition, fondUrl, fondPortraitUrl]);

  /* ---------- diaporama ---------- */
  useEffect(() => {
    const zone = zoneRef.current; const cadre = cadreRef.current; const cartel = cartelRef.current; const points = pointsRef.current;
    if (!zone || !cadre || !cartel || !points || !oeuvres.length) return undefined;
    const { gsap } = moteur();
    const statique = edition || calme();
    const diapos = Array.from(cadre.querySelectorAll<HTMLElement>('[data-diapo]'));
    const barres = Array.from(points.querySelectorAll<HTMLElement>('[data-point] i'));
    const imgDe = (k: number) => diapos[k]?.querySelector('img') as HTMLImageElement | null;
    const N = oeuvres.length;
    const couleurs: Array<{ fond: string; couleur: string } | null> = oeuvres.map(() => null);
    const ratioDe = (k: number) => { const p = oeuvres[k].photos[0]; return p.w / p.h; };
    const fondDe = (k: number) => couleurs[k]?.fond || '#d9d9d9';
    const lireCouleur = (k: number) => couleursPhoto(oeuvres[k].photos[0].url).then((c) => { couleurs[k] = c; return c; });
    let actifL = 0; let enCours = false; let minuteur: gsap.core.Tween | null = null;
    let pauseL = !(autoPlay ?? true) || statique; let survol = false; let visible = true; let fini = false;
    const etat = { lance: false };
    setActif(0); setVisibles([0]); setCartelIdx(0);
    const charger = (img: HTMLImageElement | null): Promise<void> => {
      if (!img) return Promise.resolve();
      if (img.loading === 'lazy') img.loading = 'eager';
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise((ok) => { img.addEventListener('load', () => ok(), { once: true }); img.addEventListener('error', () => ok(), { once: true }); setTimeout(ok, 2500); });
    };
    const majPoints = () => barres.forEach((b, k) => gsap.set(b, { scaleX: k < actifL ? 1 : 0 }));
    const lancerMinuteur = () => {
      if (minuteur) minuteur.kill();
      if (fini) return;
      minuteur = gsap.fromTo(barres[actifL], { scaleX: 0 }, { scaleX: 1, duration: DUREE, ease: 'none', onComplete: () => { aller((actifL + 1) % N); } });
      if (pauseL || survol || !visible || document.hidden) minuteur.pause();
    };
    const reprendre = () => { if (minuteur && !pauseL && !survol && visible && !enCours && !document.hidden) minuteur.resume(); setLecture(!pauseL && !survol); };
    const suspendre = () => { if (minuteur) minuteur.pause(); setLecture(false); };
    const aller = async (n: number) => {
      if (n === actifL || enCours || !etat.lance) return;
      enCours = true; suspendre();
      const ancien = diapos[actifL]; const nouveau = diapos[n];
      const img = imgDe(n);
      await Promise.all([charger(img), lireCouleur(n)]);
      charger(imgDe((n + 1) % N)); lireCouleur((n + 1) % N);
      const precedent = actifL;
      actifL = n; majPoints();
      setActif(n); setVisibles([precedent, n]);
      gsap.set(nouveau, { zIndex: 2 }); gsap.set(ancien, { zIndex: 1 });
      const terminer = () => {
        setVisibles([n]);
        gsap.set(ancien, { zIndex: 0, clearProps: 'clipPath,opacity' }); gsap.set(imgDe(precedent), { clearProps: 'transform,opacity' });
        enCours = false; lancerMinuteur();
      };
      if (statique) {
        gsap.set(zone, { '--ratio': ratioDe(n), '--fond-cadre': fondDe(n) });
        setCartelIdx(n);
        gsap.fromTo(nouveau, { opacity: 0 }, { opacity: 1, duration: 0.6, onComplete: () => { gsap.set(nouveau, { clearProps: 'opacity' }); terminer(); } });
        return;
      }
      // la nouvelle photo monte comme une feuille d'ardoise qu'on dégage, le cadre prend ses proportions
      const fente = cadre.querySelector('[data-fente-cadre]');
      const T = TRANSITION;
      gsap.timeline({ onComplete: terminer })
        .to(zone, { '--ratio': ratioDe(n), '--fond-cadre': fondDe(n), duration: T, ease: 'expo.inOut' }, 0)
        .fromTo(nouveau, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: T, ease: 'expo.inOut' }, 0)
        .fromTo(img, { scale: 1.1, yPercent: 4 }, { scale: 1, yPercent: 0, duration: T + 0.3, ease: 'expo.out' }, 0.12)
        .to(imgDe(precedent), { scale: 0.95, opacity: 0.35, duration: T, ease: 'expo.inOut' }, 0)
        .fromTo(fente, { top: '100%', opacity: 0 }, { top: '0%', opacity: 1, duration: T, ease: 'expo.inOut' }, 0)
        .to(fente, { opacity: 0, duration: 0.3 }, T - 0.25)
        .to(cartel, { opacity: 0, y: -8, duration: 0.3, ease: 'power2.in' }, 0)
        .add(() => { setCartelIdx(n); }, 0.35)
        .fromTo(cartel, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45);
    };
    ctrl.current = {
      aller: (n) => { aller(n); },
      pause: (on) => { pauseL = on; if (on) suspendre(); else reprendre(); },
    };
    // commandes : survol, focus, visibilité, onglet caché, balayage au doigt
    const surEntree = () => { if (!pointeurFin()) return; survol = true; suspendre(); };
    const surSortie = () => { if (!pointeurFin()) return; survol = false; reprendre(); };
    const surFocusIn = () => { survol = true; suspendre(); };
    const surFocusOut = () => { survol = false; reprendre(); };
    cadre.addEventListener('pointerenter', surEntree); cadre.addEventListener('pointerleave', surSortie);
    cadre.addEventListener('focusin', surFocusIn); cadre.addEventListener('focusout', surFocusOut);
    let x0: number | null = null; let y0 = 0; let balaye = false;
    const pd = (ev: PointerEvent) => { if (ev.pointerType === 'mouse') return; x0 = ev.clientX; y0 = ev.clientY; balaye = false; };
    const pc = () => { x0 = null; };
    const pu = (ev: PointerEvent) => {
      if (x0 === null) return;
      const dx = ev.clientX - x0; const dy = ev.clientY - y0; x0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { balaye = true; aller((actifL + (dx < 0 ? 1 : -1) + N) % N); }
    };
    const clic = (ev: MouseEvent) => { if (balaye) { ev.preventDefault(); ev.stopPropagation(); balaye = false; } };
    cadre.addEventListener('pointerdown', pd); cadre.addEventListener('pointercancel', pc); cadre.addEventListener('pointerup', pu); cadre.addEventListener('click', clic, true);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) reprendre(); else suspendre(); }, { threshold: 0.25 });
    io.observe(cadre);
    const vis = () => { if (document.hidden) suspendre(); else reprendre(); };
    document.addEventListener('visibilitychange', vis);

    // première œuvre : proportions et couleur de son fond ; entrée en particules après l'ouverture
    const premiere = imgDe(0);
    gsap.set(zone, { '--ratio': ratioDe(0) });
    lireCouleur(0).then((c) => {
      if (fini) return;
      if (statique) gsap.set(zone, { '--fond-cadre': c.fond });
      else gsap.set(zone, { '--fond-cadre': teinteSombre(c.fond, 0.12) });
    });
    if (!statique && premiere) gsap.set(premiere, { opacity: 0 });
    attendrePret().then(async () => {
      if (fini) return;
      const c = await lireCouleur(0);
      if (fini) return;
      etat.lance = true;
      if (statique) { majPoints(); lancerMinuteur(); return; }
      const gl = glDispo();
      gsap.to(zone, { '--fond-cadre': c.fond, duration: 0.9, ease: 'power1.inOut', delay: gl ? 1.3 : 0.3 });
      await charger(premiere);
      const entree = gl && premiere ? poussiere(premiere, zone, { duree: 2.1, depuis: 'gauche' }) : gsap.to(premiere, { opacity: 1, duration: 1.2, delay: 0.3 });
      Promise.resolve(entree).then(() => { if (fini) return; charger(imgDe(1)); lireCouleur(1 % N); majPoints(); lancerMinuteur(); setLecture(!pauseL); });
    });
    return () => {
      fini = true; ctrl.current = null;
      if (minuteur) minuteur.kill();
      io.disconnect(); document.removeEventListener('visibilitychange', vis);
      cadre.removeEventListener('pointerenter', surEntree); cadre.removeEventListener('pointerleave', surSortie);
      cadre.removeEventListener('focusin', surFocusIn); cadre.removeEventListener('focusout', surFocusOut);
      cadre.removeEventListener('pointerdown', pd); cadre.removeEventListener('pointercancel', pc); cadre.removeEventListener('pointerup', pu); cadre.removeEventListener('click', clic, true);
      gsap.killTweensOf([zone, cartel, ...diapos, ...barres]);
    };
  }, [oeuvres, edition, autoPlay]);

  const basculerPause = () => { const on = !pauseManuelle; setPauseManuelle(on); ctrl.current?.pause(on); };
  const surTouche = (ev: React.KeyboardEvent) => {
    if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft' || !oeuvres.length) return;
    ev.preventDefault();
    const n = (actif + (ev.key === 'ArrowRight' ? 1 : -1) + oeuvres.length) % oeuvres.length;
    ctrl.current?.aller(n);
    pointsRef.current?.querySelectorAll<HTMLElement>('[data-point]')[n]?.focus();
  };
  const cartelO = oeuvres[cartelIdx] || null;

  return (
    <div id={id} dir={direction} className={clsx('lp-ouverture', s.racine, s.fallbackDirection, className)} data-pause-button-visibility={pauseButtonVisibility}>
      <section className={s.hero} id="hero" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={s['gl-repli']} ref={repliRef} aria-hidden="true" style={fondUrl ? { backgroundImage: `url("${fondUrl}")` } : undefined} />
        <div className={s['hero-grille']} data-grille="">
          <div>
            <h1 {...part('lpOuvertureTitre', 'lp-ouverture-titre', 'hero-titre', 'display')} id={`${id}-titre`}>
              <span className={s.ligne}><span className={s.clive} data-clive=""><Strates n={5} s={s}>{titreLigne1}</Strates></span></span>
              <span className={s.ligne}><span className={s.clive} data-clive=""><Strates n={5} s={s}>{titreLigne2}</Strates></span></span>
            </h1>
            <div className={s['hero-texte']}>
              <p {...part('lpOuvertureTexte', 'lp-ouverture-texte', 'hero-texte-p')} data-entree="">{texte}</p>
              <div className={s.actions} data-entree="">
                <a {...part('lpOuvertureBoutonPrincipal', 'lp-ouverture-bouton-principal', 'bouton', 'bouton--plein')} data-bouton="" href={boutonPrincipalLien}><span>{boutonPrincipalTexte}</span></a>
                <a {...part('lpOuvertureBoutonSecondaire', 'lp-ouverture-bouton-secondaire', 'bouton')} data-bouton="" href={boutonSecondaireLien}><span>{boutonSecondaireTexte}</span></a>
              </div>
            </div>
          </div>
          <div className={s['hero-oeuvre']} ref={zoneRef}>
            <div {...part('lpOuvertureCadre', 'lp-ouverture-cadre', 'hero-cadre')} ref={cadreRef}>
              {oeuvres.map((o, k) => {
                const p = o.photos[0];
                const active = visibles.includes(k);
                return (
                  <a
                    key={o.id}
                    className={cx(s, 'hero-diapo', active && 'est-active')}
                    data-diapo=""
                    href={lien(o.lien)}
                    aria-label={gabarit(ARIA.voirFiche, { titre: o.titre })}
                    aria-hidden={k !== actif ? 'true' : undefined}
                    tabIndex={k !== actif ? -1 : undefined}
                  >
                    <img
                      className={s.oeuvre}
                      src={tailleWix(p, 800)}
                      srcSet={srcsetWix(p)}
                      sizes="(max-width: 860px) 70vw, 34vw"
                      alt={p.alt || altOeuvre(o)}
                      width={p.w}
                      height={p.h}
                      crossOrigin="anonymous"
                      decoding="async"
                      loading={k < 2 ? 'eager' : 'lazy'}
                      data-opaque="1"
                    />
                  </a>
                );
              })}
              <span className={s['hero-fente']} data-fente-cadre="" aria-hidden="true" />
            </div>
            <div className={s['hero-pied']} data-entree="">
              <p {...part('lpOuvertureCartel', 'lp-ouverture-cartel', 'cartel', 'chiffres')} ref={cartelRef} aria-live={lecture ? 'off' : 'polite'} aria-atomic="false"><Cartel o={cartelO} langue={langue} /></p>
              <div className={s['hero-points']} ref={pointsRef} onKeyDown={surTouche}>
                <button
                  type="button"
                  {...part('lpOuverturePause', 'lp-ouverture-pause', 'hero-pause')}
                  aria-pressed={pauseManuelle}
                  aria-label={pauseManuelle ? ARIA.lecture : ARIA.pause}
                  onClick={basculerPause}
                >
                  <svg viewBox="0 0 16 16" aria-hidden="true"><path className={s.p} d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.6" /><path className={s.l} d="M5 3l8 5-8 5z" fill="currentColor" /></svg>
                </button>
                {oeuvres.map((o, k) => (
                  <button
                    key={o.id}
                    type="button"
                    {...part('lpOuverturePoint', 'lp-ouverture-point', 'hero-point')}
                    data-point=""
                    aria-label={gabarit(ARIA.point, { n: String(k + 1), total: String(oeuvres.length), titre: o.titre })}
                    aria-current={k === actif ? 'true' : 'false'}
                    onClick={() => ctrl.current?.aller(k)}
                  >
                    <i />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <a {...part('lpOuvertureDefiler', 'lp-ouverture-defiler', 'indice')} href={lienDefiler} aria-label={ARIA.defiler} data-entree="">
          <span>{texteDefiler}</span>
          <i aria-hidden="true" />
        </a>
      </section>
    </div>
  );
};

export default LpOuverture;
