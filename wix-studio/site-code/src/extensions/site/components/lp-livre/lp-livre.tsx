/* Livre (accueil.js : « livre : la couverture s'ouvre au défilement ») : livre en 3D qui se redresse,
   s'ouvre et glisse pour montrer la double page ; prix et ajout au panier Wix. */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-livre.module.css';
import type { LpLivreProps } from './lp-livre.props';
import { moteur, calme, animerClive, rafraichir, aimants } from '../../../../lp-commun/moteur';
import { oeuvresDe, tailleWix, srcsetWix, prix, ajouterAuPanier } from '../../../../lp-commun/donnees';
import type { Oeuvre } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates } from '../../../../lp-commun/react';

const LpLivre: FC<LpLivreProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const { id, className, direction, titre, chapo, couverture, dosCouverture, doublePage, categorie, boutonTexte, elementProps } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const [livre, setLivre] = useState<Oeuvre | null>(null);
  const credits = [
    [props.credit1Intitule, props.credit1Valeur],
    [props.credit2Intitule, props.credit2Valeur],
    [props.credit3Intitule, props.credit3Valeur],
    [props.credit4Intitule, props.credit4Valeur],
  ].filter(([a, b]) => a || b);
  const part = (cle: keyof NonNullable<LpLivreProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const img = (i: typeof couverture, w: number, h: number) => (i?.url ? { url: i.url, uri: i.uri || '', w: i.width || w, h: i.height || h } : null);
  const couv = img(couverture, 1588, 1800); const dos = img(dosCouverture, 1368, 1800); const page = img(doublePage, 1600, 1131);

  useEffect(() => {
    let vivant = true;
    if (categorie) oeuvresDe(categorie).then((l) => { if (vivant) setLivre(l[0] || null); }).catch((): void => undefined);
    return () => { vivant = false; };
  }, [categorie]);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const { gsap } = moteur();
    const livre3d = sec.querySelector('[data-livre]'); const couvEl = sec.querySelector('[data-couv]');
    const ctx = gsap.context(() => {
      if (!edition && !calme()) {
        animerClive(sec.querySelector('[data-clive]'), { strates: 4, ecart: 70 });
        const tl = gsap.timeline({ scrollTrigger: { trigger: sec, start: 'top 70%', end: 'center 40%', scrub: 1 } });
        tl.fromTo(livre3d, { rotationY: -38, rotationX: 14, y: 60 }, { rotationY: -10, rotationX: 4, y: 0, ease: 'power2.out', duration: 1 })
          .to(couvEl, { rotationY: -158, ease: 'power2.inOut', duration: 1.2 }, 0.45)
          .to(livre3d, { x: '22%', duration: 1.2, ease: 'power2.inOut' }, 0.45);
      } else {
        gsap.set(couvEl, { rotationY: -158 });
        gsap.set(livre3d, { rotationY: -8, x: '22%' });
      }
    }, sec);
    aimants(sec);
    rafraichir();
    return () => { ctx.revert(); rafraichir(); };
  }, [edition]);

  return (
    <div id={id} dir={direction} className={clsx('lp-livre', s.racine, s.fallbackDirection, className)}>
      <div className={s.jetons}>
      <section className={cx(s, 'section livre')} id="livre" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={cx(s, 'contenu rang')}>
          <div className={s['scene-livre']}>
            <div {...part('lpLivreLivre', 'lp-livre-livre', 'livre-3d')} data-livre="">
              <div className={s.page}>{page ? <img src={tailleWix(page, 800)} alt={doublePage?.alt || ''} loading="lazy" /> : null}</div>
              <div className={s.couv} data-couv="">
                {couv ? <img src={tailleWix(couv, 800)} srcSet={srcsetWix(couv)} sizes="380px" alt={couverture?.alt || ''} loading="lazy" /> : null}
                <div className={s['dos-couv']}>{dos ? <img src={tailleWix(dos, 800)} alt={dosCouverture?.alt || ''} loading="lazy" /> : null}</div>
              </div>
              <div className={s.tranche} />
            </div>
          </div>
          <div className={s.infos}>
            <h2 {...part('lpLivreTitre', 'lp-livre-titre', 'clive')} id={`${id}-titre`} data-clive=""><Strates n={4} s={s}>{titre}</Strates></h2>
            <p {...part('lpLivreChapo', 'lp-livre-chapo', 'lead')}>{chapo}</p>
            <dl {...part('lpLivreCredits', 'lp-livre-credits', 'credits')}>
              {credits.map(([a, b], i) => <React.Fragment key={i}><dt>{a}</dt><dd>{b}</dd></React.Fragment>)}
            </dl>
            <p {...part('lpLivrePrix', 'lp-livre-prix', 'prix-grand', 'chiffres')} style={livre?.prix ? undefined : { visibility: 'hidden' }}>{livre?.prix ? prix(livre.prix, langue) : ' '}</p>
            <div className={s.actions}>
              <button
                type="button"
                {...part('lpLivreBouton', 'lp-livre-bouton', 'bouton', 'bouton--plein')}
                data-bouton=""
                data-carte=""
                onClick={(e) => { if (livre) ajouterAuPanier(livre, e.currentTarget.closest('section')?.querySelector('[data-couv] img') || e.currentTarget, false); }}
              >
                <span>{boutonTexte}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default LpLivre;
