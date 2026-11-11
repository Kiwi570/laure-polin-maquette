/* Collection privée (accueil.js : « collection privée : deux rails ») : deux bandeaux en boucle infinie,
   sens opposés, vitesse accélérée par la vitesse de défilement (Lenis), arrêt progressif au survol ou au focus. */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-collection.module.css';
import type { LpCollectionProps, OeuvreCollection } from './lp-collection.props';
import { ARIAS } from './constants';
import { moteur, calme, animerClive, rafraichir, lenis } from '../../../../lp-commun/moteur';
import { tailleWix } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates } from '../../../../lp-commun/react';

const LpCollection: FC<LpCollectionProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const ARIA = ARIAS[langue];
  const { id, className, direction, titre, texte, oeuvres, legendeStatut, autoPlay, pauseButtonVisibility, elementProps } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const [isPlayOn, setIsPlayOn] = useState(autoPlay ?? true);
  const [statique, setStatique] = useState(false);
  const lectureRef = useRef(isPlayOn);
  lectureRef.current = isPlayOn;
  useEffect(() => { setIsPlayOn((autoPlay ?? true) && !calme()); setStatique(edition || calme()); }, [autoPlay, edition]);

  const part = (cle: keyof NonNullable<LpCollectionProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const avecPhoto = (oeuvres || []).filter((o) => o.photo?.url);
  const moitie = Math.ceil(avecPhoto.length / 2);
  const rangs = [avecPhoto.slice(0, moitie), avecPhoto.slice(moitie)];

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const { gsap } = moteur();
    const st = edition || calme();
    const ctx = gsap.context(() => {
      if (!st) animerClive(sec.querySelector('[data-clive]'), { strates: 4, ecart: 70 });
    }, sec);
    const nettoyer: Array<() => void> = [];
    if (!st) {
      sec.querySelectorAll<HTMLElement>('[data-rail]').forEach((rail) => {
        const sens = parseFloat(rail.dataset.rail || '1');
        let x = 0; let vitesse = 0.45;
        const largeur = () => rail.scrollWidth / 2;
        let survol = false; let visible = false;
        const on = () => { survol = true; }; const off = () => { survol = false; };
        rail.addEventListener('pointerenter', on); rail.addEventListener('pointerleave', off);
        rail.addEventListener('focusin', on); rail.addEventListener('focusout', off);
        const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '100px' });
        io.observe(rail);
        const tick = () => {
          if (!visible || document.hidden) return;
          const l = lenis();
          const v = l ? l.velocity : 0;
          const arret = survol || !lectureRef.current;
          vitesse += ((arret ? 0 : 0.45 + Math.min(4, Math.abs(v) * 0.08)) - vitesse) * 0.06;
          x -= vitesse * sens;
          const L = largeur();
          if (L > 0) { if (x <= -L) x += L; if (x > 0) x -= L; }
          rail.style.transform = `translate3d(${x}px,0,0)`;
        };
        gsap.ticker.add(tick);
        nettoyer.push(() => {
          gsap.ticker.remove(tick); io.disconnect();
          rail.removeEventListener('pointerenter', on); rail.removeEventListener('pointerleave', off);
          rail.removeEventListener('focusin', on); rail.removeEventListener('focusout', off);
          rail.style.transform = '';
        });
      });
    }
    rafraichir();
    return () => { nettoyer.forEach((f) => f()); ctx.revert(); rafraichir(); };
  }, [edition, avecPhoto.length]);

  const vignette = (o: OeuvreCollection, k: number, copie: boolean) => {
    const ph = o.photo;
    const src = ph?.url ? tailleWix({ url: ph.url, uri: ph.uri || '', w: ph.width || 700, h: ph.height || 900 }, 700) : '';
    const contenu = (
      <>
        <img src={src} alt={copie ? '' : (ph?.alt || o.titre || '')} width={ph?.width} height={ph?.height} loading="lazy" decoding="async" />
        <span className={s.legende}><strong className={s['legende-titre']}>{o.titre}</strong><br />{legendeStatut}</span>
      </>
    );
    const cle = `${copie ? 'c' : 'o'}-${k}`;
    const commun = { ...part('lpCollectionVignette', 'lp-collection-vignette', 'vignette'), ...(copie ? { 'aria-hidden': true as const, tabIndex: -1 } : {}) };
    return o.lien
      ? <a key={cle} {...commun} href={lien(o.lien)}>{contenu}</a>
      : <span key={cle} {...commun} tabIndex={copie ? -1 : 0}>{contenu}</span>;
  };

  return (
    <div id={id} dir={direction} className={clsx('lp-collection', s.racine, s.fallbackDirection, statique && s.calme, className)} data-pause-button-visibility={pauseButtonVisibility}>
      <section className={cx(s, 'section collection')} id="collection" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={s.contenu}>
          <div className={s.intertitre}>
            <h2 {...part('lpCollectionTitre', 'lp-collection-titre', 'clive')} id={`${id}-titre`} data-clive=""><Strates n={4} s={s}>{titre}</Strates></h2>
            <p {...part('lpCollectionTexte', 'lp-collection-texte', 'intro')}>{texte}</p>
          </div>
        </div>
        {rangs.map((liste, i) => (
          <div key={i} className={s.bandeau}>
            <div className={s.rail} data-rail={i === 0 ? '1' : '-1'}>
              {liste.map((o, k) => vignette(o, k, false))}
              {liste.map((o, k) => vignette(o, k, true))}
            </div>
          </div>
        ))}
        <button
          type="button"
          {...part('lpCollectionPause', 'lp-collection-pause', 'pause')}
          aria-label={isPlayOn ? ARIA.pause : ARIA.lecture}
          aria-pressed={!isPlayOn}
          onPointerDown={(e) => e.stopPropagation()}
          onPointerUp={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); setIsPlayOn((v) => !v); }}
        >
          {isPlayOn
            ? <svg className={s.icone} viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="1.6" /></svg>
            : <svg className={s.icone} viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l8 5-8 5z" fill="currentColor" /></svg>}
        </button>
      </section>
    </div>
  );
};

export default LpCollection;
