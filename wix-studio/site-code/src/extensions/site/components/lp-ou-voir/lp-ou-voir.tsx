/* Où voir les œuvres (accueil.js : construireCarte, rendreExpositions) : carte de France tracée,
   point cuivré et halo sur Bagnolet, lieux séparés par des filets, expositions passées. */
import React, { useEffect, useRef } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-ou-voir.module.css';
import type { LpOuVoirProps } from './lp-ou-voir.props';
import { SRS } from './constants';
import { moteur, calme, animerClive, rafraichir } from '../../../../lp-commun/moteur';
import { tailleWix } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates, telDe } from '../../../../lp-commun/react';
import type { Link } from '@wix/editor-react-types';
import { FRANCE } from '../../../../lp-commun/formes';

const LpOuVoir: FC<LpOuVoirProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const SR = SRS[langue];
  const { id, className, direction, titre, texte, etiquetteCarte, descriptionCarte, passeeAffiche, elementProps } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const part = (cle: keyof NonNullable<LpOuVoirProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const [bx, by] = FRANCE.pts.bagnolet;
  const affiche = passeeAffiche?.url ? { url: passeeAffiche.url, uri: passeeAffiche.uri || '', w: passeeAffiche.width || 1121, h: passeeAffiche.height || 598 } : null;

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const { gsap } = moteur();
    const ctx = gsap.context(() => {
      if (edition || calme()) return;
      animerClive(sec.querySelector('[data-clive]'), { strates: 4, ecart: 70 });
      const z = sec.querySelector('[data-carte-fr]');
      const pays = sec.querySelector<SVGPathElement>('[data-pays]');
      if (!z || !pays) return;
      const L = pays.getTotalLength();
      pays.style.strokeDasharray = String(L); pays.style.strokeDashoffset = String(L);
      gsap.timeline({ scrollTrigger: { trigger: z, start: 'top 75%', once: true } })
        .to(pays, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut' })
        .from(pays, { fillOpacity: 0, duration: 1 }, 1.4)
        .from(z.querySelectorAll('[data-repere]'), { opacity: 0, scale: 0, transformOrigin: 'center', stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, 1.8);
    }, sec);
    rafraichir();
    return () => { ctx.revert(); const p = sec.querySelector<SVGPathElement>('[data-pays]'); if (p) { p.style.strokeDasharray = ''; p.style.strokeDashoffset = ''; } rafraichir(); };
  }, [edition]);

  const lienExterne = (texteLien?: string, l?: Link, sr: string = SR.nouvelOnglet, precision = '') => (
    <a {...part('lpOuVoirLien', 'lp-ou-voir-lien', 'lien', 'mini')} href={l?.href} target={l?.target || '_blank'} rel="noopener">
      {texteLien}{precision ? <span className={s.sr}>{` ${precision}`}</span> : null}<span className={s.sr}>{sr}</span>
    </a>
  );

  return (
    <div id={id} dir={direction} className={clsx('lp-ou-voir', s.racine, s.fallbackDirection, (edition) && s.calme, className)}>
      <section className={cx(s, 'section ou-voir')} id="ou-voir" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={s.contenu}>
          <div className={s.intertitre}>
            <h2 {...part('lpOuVoirTitre', 'lp-ou-voir-titre', 'clive')} id={`${id}-titre`} data-clive=""><Strates n={4} s={s}>{titre}</Strates></h2>
            <p {...part('lpOuVoirTexte', 'lp-ou-voir-texte', 'intro')}>{texte}</p>
          </div>
          <div className={s.rang}>
            <div {...part('lpOuVoirCarte', 'lp-ou-voir-carte', 'carte-fr')} data-carte-fr="">
              <svg viewBox={`0 0 ${FRANCE.w} ${FRANCE.h}`} role="img" aria-label={descriptionCarte}>
                <path className={s.pays} data-pays="" d={FRANCE.d} />
                <circle className={s.halo} data-repere="" cx={bx} cy={by} r={10} />
                <circle className={s.point} data-repere="" cx={bx} cy={by} r={6} />
                <text className={s.etiquette} data-repere="" x={bx + 16} y={by - 12}>{etiquetteCarte}</text>
              </svg>
            </div>
            <div className={s.lieux}>
              <div className={s.lieu}>
                <h3 {...part('lpOuVoirLieuTitre', 'lp-ou-voir-lieu-titre', 'lieu-titre')}>{props.atelierTitre}</h3><span className={s.passe}>{props.atelierPrecision}</span>
                <p {...part('lpOuVoirLieuTexte', 'lp-ou-voir-lieu-texte', 'lieu-texte')}>{props.atelierAdresse}<br />{props.atelierVisites} <a className={cx(s, 'lien chiffres tel')} href={telDe(props.atelierTelephone)}>{props.atelierTelephone}</a>.</p>
                <p className={s['lieu-texte']}>{lienExterne(props.atelierItineraire, props.atelierItineraireLien, SR.googleMaps)}</p>
              </div>
              <div className={s.lieu}>
                <h3 {...part('lpOuVoirLieuTitre', 'lp-ou-voir-lieu-titre', 'lieu-titre')}>{props.galerieTitre}</h3>{lienExterne(props.galerieLienTexte, props.galerieLien, SR.nouvelOnglet, props.galerieTitre?.replace(/^Galerie\s+/i, ''))}
                <p {...part('lpOuVoirLieuTexte', 'lp-ou-voir-lieu-texte', 'lieu-texte')}>{props.galerieTexte}</p>
              </div>
              <div className={s.lieu}>
                <h3 {...part('lpOuVoirLieuTitre', 'lp-ou-voir-lieu-titre', 'lieu-titre')}>{props.plateformeTitre}</h3>{lienExterne(props.plateformeLienTexte, props.plateformeLien, SR.nouvelOnglet, props.plateformeTitre)}
                <p {...part('lpOuVoirLieuTexte', 'lp-ou-voir-lieu-texte', 'lieu-texte')}>{props.plateformeTexte}</p>
              </div>
              <div className={cx(s, 'lieu lieu-expos')}>
                <h3 {...part('lpOuVoirLieuTitre', 'lp-ou-voir-lieu-titre', 'lieu-titre')}>{props.exposTitre}</h3><span className={s.passe}>{props.exposPrecision}</span>
                <p {...part('lpOuVoirLieuTexte', 'lp-ou-voir-lieu-texte', 'lieu-texte')}>{props.exposTexte}</p>
              </div>
            </div>
          </div>
          <div {...part('lpOuVoirPassees', 'lp-ou-voir-passees', 'expos-passees')} style={props.passeesTitre ? undefined : { display: 'none' }}>
            <h3>{props.passeesTitre}</h3>
            <ul className={s['liste-passees']}>
              <li className={s['expo-passee']}>
                {affiche ? <img src={tailleWix(affiche, 400)} alt={passeeAffiche?.alt || ''} loading="lazy" width={affiche.w} height={affiche.h} /> : null}
                <div><strong>{props.passeeNom}</strong><span>{props.passeeTexte}</span></div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LpOuVoir;
