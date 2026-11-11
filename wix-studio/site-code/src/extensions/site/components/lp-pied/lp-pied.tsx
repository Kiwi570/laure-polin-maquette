/* Pied de page (base.js : monterPied) : le grand nom se dessine trait par trait puis se remplit,
   logo, coordonnées, réseaux, liens, note. */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-pied.module.css';
import type { LpPiedProps } from './lp-pied.props';
import { ARIAS } from './constants';
import { moteur, calme, rafraichir } from '../../../../lp-commun/moteur';
import { categorie, tailleWix, srcsetWix } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, telDe } from '../../../../lp-commun/react';
import { NOM } from '../../../../lp-commun/formes';

const LpPied: FC<LpPiedProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const ARIA = ARIAS[langue];
  const { id, className, direction, nomAccessible, logo, logoTexteAccessible, lienAccueil, liens, note, elementProps } = props;
  const edition = useEdition();
  const piedRef = useRef<HTMLElement>(null);
  const [liensCat, setLiensCat] = useState<Record<number, string>>({});
  const [statique, setStatique] = useState(false);
  const part = (cle: keyof NonNullable<LpPiedProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const logoP = { url: logo?.url || '', uri: logo?.uri || '', w: logo?.width || 334, h: logo?.height || 360 };

  useEffect(() => {
    let vivant = true;
    (liens || []).forEach((l, k) => {
      if (!l.categorie) return;
      categorie(l.categorie).then((c) => { if (vivant && c) setLiensCat((v) => ({ ...v, [k]: c.lien })); }).catch((): void => undefined);
    });
    return () => { vivant = false; };
  }, [liens]);

  useEffect(() => {
    const pied = piedRef.current;
    if (!pied) return undefined;
    const st = edition || calme();
    setStatique(st);
    if (st) return undefined;
    const { gsap } = moteur();
    const zone = pied.querySelector('[data-grand-nom]');
    const chemins = Array.from(pied.querySelectorAll<SVGPathElement>('[data-grand-nom] path'));
    const ctx = gsap.context(() => {
      chemins.forEach((p) => { const l = p.getTotalLength(); p.style.strokeDasharray = String(l); p.style.strokeDashoffset = String(l); });
      gsap.to(chemins, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.12, scrollTrigger: { trigger: zone, start: 'top 85%', once: true } });
      gsap.to(chemins, { fill: 'rgba(60,68,78,.55)', duration: 1.2, delay: 2.2, scrollTrigger: { trigger: zone, start: 'top 85%', once: true } });
    }, pied);
    rafraichir();
    return () => { ctx.revert(); chemins.forEach((p) => { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; }); rafraichir(); };
  }, [edition]);

  return (
    <div id={id} dir={direction} className={clsx('lp-pied', s.racine, s.fallbackDirection, statique && s.calme, className)}>
      <footer className={s.pied} ref={piedRef}>
        <div {...part('lpPiedNom', 'lp-pied-nom', 'grand-nom')} data-grand-nom="">
          <svg viewBox={`-20 0 ${NOM.w + 40} ${NOM.h}`} role="img" aria-label={nomAccessible}>
            {NOM.paths.map((d, i) => <path key={i} d={d} />)}
          </svg>
        </div>
        <div className={s.bas}>
          <a {...part('lpPiedLogo', 'lp-pied-logo', 'pied-logo')} href={lien(lienAccueil?.href || '/')} target={lienAccueil?.target} aria-label={logoTexteAccessible}>
            <img className={s['marque-logo']} src={tailleWix(logoP, 240)} srcSet={srcsetWix(logoP, [111, 167, 223, 334])} sizes="96px" alt="" width={625} height={673} loading="lazy" decoding="async" />
          </a>
          <address {...part('lpPiedCoordonnees', 'lp-pied-coordonnees', 'pied-coord')}>
            {props.coordLigne1}<br />{props.coordLigne2}<br />
            <a className={cx(s, 'lien chiffres tel')} href={telDe(props.telephone)}>{props.telephone}</a><br />
            <a className={s.lien} href={`mailto:${props.email}`}>{props.email}</a>
            <span className={s.reseaux}>
              <a className={s.lien} href={props.instagramLien?.href} target={props.instagramLien?.target || '_blank'} rel="noopener">{props.instagramTexte}<span className={s.sr}>{ARIA.nouvelOnglet}</span></a>
              <a className={s.lien} href={props.facebookLien?.href} target={props.facebookLien?.target || '_blank'} rel="noopener">{props.facebookTexte}<span className={s.sr}>{ARIA.nouvelOnglet}</span></a>
            </span>
          </address>
          <nav className={s.liens} aria-label={ARIA.liens}>
            {(liens || []).map((l, k) => (
              <a key={`${l.texte}-${k}`} {...part('lpPiedLien', 'lp-pied-lien', 'lien')} href={lien(l.lien?.href || liensCat[k] || (l.ancre ? `/#${l.ancre}` : '')) || undefined} target={l.lien?.target}>{l.texte}</a>
            ))}
          </nav>
        </div>
        <p {...part('lpPiedNote', 'lp-pied-note', 'note')}>{note}</p>
      </footer>
    </div>
  );
};

export default LpPied;
