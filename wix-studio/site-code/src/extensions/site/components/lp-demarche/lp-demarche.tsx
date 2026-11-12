/* Manifeste (accueil.js : « manifeste ») : portrait collant en parallaxe, mots révélés au défilement,
   « Je taille, je ponce, je bouscule la matière. » avec un effet par geste. */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-demarche.module.css';
import type { LpDemarcheProps } from './lp-demarche.props';
import { moteur, calme, rafraichir } from '../../../../lp-commun/moteur';
import { tailleWix, srcsetWix } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx } from '../../../../lp-commun/react';

const LpDemarche: FC<LpDemarcheProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const { id, className, direction, portrait, legende, titreCache, paragraphe1, paragraphe2, paragraphe3, geste1, geste2, geste3, paragraphe4, signature, elementProps } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const [statique, setStatique] = useState(false);
  useEffect(() => { setStatique(edition || calme()); }, [edition]);
  const part = (cle: keyof NonNullable<LpDemarcheProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const p = portrait?.url ? { url: portrait.url, uri: portrait.uri || '', w: portrait.width || 1600, h: portrait.height || 1066 } : null;

  useEffect(() => {
    const sec = secRef.current;
    if (!sec || edition || calme()) return undefined;
    const { gsap } = moteur();
    const ctx = gsap.context(() => {
      sec.querySelectorAll('[data-mots]').forEach((para) => {
        gsap.to(para.querySelectorAll('[data-mot]'), { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: para, start: 'top 82%', end: 'bottom 52%', scrub: true } });
      });
      gsap.to(sec.querySelector('[data-parallaxe]'), { yPercent: 8, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
      // trois gestes, chacun son effet
      const taille = sec.querySelector('[data-geste="taille"]'); const ponce = sec.querySelector('[data-geste="ponce"]'); const bouscule = sec.querySelector('[data-geste="bouscule"]');
      const tlG = gsap.timeline({ scrollTrigger: { trigger: sec.querySelector('[data-gestes]'), start: 'top 78%', once: true } });
      tlG.from(taille ? taille.querySelectorAll('[data-eclat]') : [], { opacity: 0, x: () => gsap.utils.random(-40, 40), y: () => gsap.utils.random(-30, 30), rotation: () => gsap.utils.random(-50, 50), duration: 0.9, ease: 'expo.out', stagger: 0.03 })
        .from(ponce, { opacity: 0, filter: 'blur(16px)', duration: 1.4, ease: 'power2.out' }, 0.35)
        .from(bouscule, { opacity: 0, duration: 0.2 }, 0.8)
        .to(bouscule, { keyframes: { x: [0, -9, 8, -6, 5, -2, 0], rotation: [0, -1.5, 1.2, -0.8, 0.5, 0] }, duration: 0.7, ease: 'none' }, 0.85);
    }, sec);
    rafraichir();
    return () => { ctx.revert(); rafraichir(); };
  }, [edition, paragraphe1, paragraphe2, paragraphe3, paragraphe4, geste1, geste2, geste3]);

  const motsSpans = (t?: string) => (t || '').split(/(\s+)/).map((m, i) => (m.trim() ? <span key={i} className={s.mot} data-mot="">{m}</span> : m));

  return (
    <div id={id} dir={direction} className={clsx('lp-demarche', s.racine, s.fallbackDirection, (edition || statique) && s.calme, edition && s.edition, className)}>
      <div className={s.jetons}>
      <section className={cx(s, 'section manifeste')} id="manifeste" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={cx(s, 'contenu rang')}>
          <figure className={s.portrait}>
            <div {...part('lpDemarchePortrait', 'lp-demarche-portrait', 'cadre')}>
              {p ? <img data-parallaxe="" src={tailleWix(p, 800)} srcSet={srcsetWix(p)} sizes="(max-width: 860px) 92vw, 40vw" alt={portrait?.alt || ''} loading="lazy" width={p.w} height={p.h} /> : null}
            </div>
            <figcaption {...part('lpDemarcheLegende', 'lp-demarche-legende', 'mini')}>{legende}</figcaption>
          </figure>
          <div className={s.texte}>
            <h2 className={s.sr} id={`${id}-titre`}>{titreCache}</h2>
            <p {...part('lpDemarcheParagraphe', 'lp-demarche-paragraphe', 'para')} data-mots="">{motsSpans(paragraphe1)}</p>
            <p {...part('lpDemarcheParagraphe', 'lp-demarche-paragraphe', 'para')} data-mots="">{motsSpans(paragraphe2)}</p>
            <p {...part('lpDemarcheParagraphe', 'lp-demarche-paragraphe', 'para')} data-mots="">{motsSpans(paragraphe3)}</p>
            <div {...part('lpDemarcheGestes', 'lp-demarche-gestes', 'gestes')} data-gestes="">
              <span className={s.geste} data-geste="taille">
                {(geste1 || '').split('').map((c, i) => <span key={i} className={s.eclat} data-eclat="">{c === ' ' ? ' ' : c}</span>)}
              </span>{' '}
              <span className={s.geste} data-geste="ponce">{geste2}</span>{' '}
              <span className={s.geste} data-geste="bouscule">{geste3}</span>
            </div>
            <p {...part('lpDemarcheParagraphe', 'lp-demarche-paragraphe', 'para')} data-mots="">{motsSpans(paragraphe4)}</p>
            <p {...part('lpDemarcheSignature', 'lp-demarche-signature', 'mini')}>{signature}</p>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default LpDemarche;
