/* Les quatre salles du parcours (accueil.js : « trois matières », animerMatieres) :
   piste épinglée sur 3 hauteurs d'écran, volets de droite à gauche, fonds qui dézooment, trios qui arrivent,
   coulée de bronze, feuillets d'ardoise, empreinte de pneu, petits formats en strates, index à droite.
   Téléphone (< 861 px) et « réduire les animations » : panneaux empilés. */
import React, { useEffect, useId, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-salles.module.css';
import type { LpSallesProps } from './lp-salles.props';
import { ARIAS } from './constants';
import { moteur, calme, etroit, polices, animerClive, rafraichir, piegeFixe, lenis, aimants } from '../../../../lp-commun/moteur';
import { categorie, oeuvresDe, tailleWix, srcsetWix, prix } from '../../../../lp-commun/donnees';
import type { Oeuvre } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates, nombreOeuvres } from '../../../../lp-commun/react';
import { construireCoulee, construireEmpreinte } from './lp-salles-engine';
import type { Moteurs } from './lp-salles-engine';

type Cle = 'bronze' | 'ardoise' | 'pneu' | 'petits-formats';
type Panneau = { cle: Cle; index: string; fond?: { url: string; uri?: string }; categorie?: string; texte?: string; bouton?: string; trio?: string };
const altOeuvre = (o: Oeuvre) => `${o.titre}${o.matiere ? `, sculpture en ${o.matiere.toLowerCase()}` : ''}, de Laure Polin`;

const LpSalles: FC<LpSallesProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const ARIA = ARIAS[langue];
  const { id, className, direction, motOeuvre, motOeuvres, elementProps } = props;
  const edition = useEdition();
  const uid = useId().replace(/:/g, '');
  const secRef = useRef<HTMLElement>(null);
  const [infos, setInfos] = useState<Record<string, { nombre: number; lien: string }>>({});
  const [trios, setTrios] = useState<Record<string, Array<Oeuvre>>>({});
  const [charge, setCharge] = useState(false);
  const [actif, setActif] = useState(0);
  const [statique, setStatique] = useState(false);
  const [largeur, setLargeur] = useState<'bureau' | 'etroit' | ''>('');

  const panneaux: Array<Panneau> = [
    { cle: 'bronze', index: props.bronzeMot || '', fond: props.bronzeFond, categorie: props.bronzeCategorie, texte: props.bronzeTexte, bouton: props.bronzeBouton, trio: props.bronzeTrio },
    { cle: 'ardoise', index: props.ardoiseMot || '', fond: props.ardoiseFond, categorie: props.ardoiseCategorie, texte: props.ardoiseTexte, bouton: props.ardoiseBouton, trio: props.ardoiseTrio },
    { cle: 'pneu', index: props.pneuMot || '', fond: props.pneuFond, categorie: props.pneuCategorie, texte: props.pneuTexte, bouton: props.pneuBouton, trio: props.pneuTrio },
    { cle: 'petits-formats', index: `${props.petitsLigne1 || ''} ${props.petitsLigne2 || ''}`.trim(), fond: props.petitsFond, categorie: props.petitsCategorie, texte: props.petitsTexte, bouton: props.petitsBouton, trio: props.petitsTrio },
  ];
  const cleDonnees = panneaux.map((p) => `${p.categorie}|${p.trio}`).join('#');

  const part = (cle: keyof NonNullable<LpSallesProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });

  /* ---------- données : nombre d'œuvres des salles, trios ---------- */
  useEffect(() => {
    let vivant = true;
    setCharge(false);
    const taches = panneaux.map(async (p) => {
      const [c, t] = await Promise.allSettled([p.categorie ? categorie(p.categorie) : Promise.resolve(null), p.trio ? oeuvresDe(p.trio) : Promise.resolve([])]);
      if (!vivant) return;
      if (c.status === 'fulfilled' && c.value) { const v = c.value; setInfos((x) => ({ ...x, [p.cle]: { nombre: v.nombre, lien: v.lien } })); }
      if (t.status === 'fulfilled') { const v = t.value; setTrios((x) => ({ ...x, [p.cle]: v.slice(0, 3) })); }
    });
    Promise.allSettled(taches).then(() => { if (vivant) setCharge(true); });
    return () => { vivant = false; };
  }, [cleDonnees]);

  /* ---------- largeur (la maquette rechargeait la page en franchissant 861 px) ---------- */
  useEffect(() => {
    setStatique(edition || calme());
    const maj = () => setLargeur(etroit() ? 'etroit' : 'bureau');
    maj();
    addEventListener('resize', maj);
    return () => removeEventListener('resize', maj);
  }, [edition]);

  /* ---------- animations ---------- */
  useEffect(() => {
    const sec = secRef.current;
    if (!sec || !charge || !largeur) return undefined;
    const { gsap, ScrollTrigger } = moteur();
    const st0 = edition || calme();
    let fini = false;
    let coulee: Moteurs | null = null; let empreinte: Moteurs | null = null;
    let ctx: gsap.Context | null = null;
    const ecouteurs: Array<() => void> = [];
    polices().then(() => {
      if (fini) return;
      const svgB = sec.querySelector<SVGSVGElement>('[data-coulee]');
      const svgP = sec.querySelector<SVGSVGElement>('[data-empreinte]');
      if (svgB) coulee = construireCoulee(svgB, props.bronzeMot || '', uid, st0);
      if (svgP) empreinte = construireEmpreinte(svgP, props.pneuMot || '', uid, st0);
      if (st0) { rafraichir(); return; }
      ctx = gsap.context(() => {
        const feuillets = animerClive(sec.querySelector('[data-feuillets]'), { strates: 6, ecart: 220, declencheur: false, duree: 1 });
        const petits = animerClive(sec.querySelector('[data-mot-petits]'), { strates: 5, ecart: 120, declencheur: false, duree: 1.1 });
        const elems = Array.from(sec.querySelectorAll<HTMLElement>('[data-matiere]'));
        const piste = sec.querySelector<HTMLElement>('[data-piste]');
        const trioDe = (p: HTMLElement) => p.querySelectorAll('[data-trio] a');
        // les images des panneaux suivants se chargent avant d'être dévoilées
        ScrollTrigger.create({ trigger: piste, start: 'top bottom+=150%', once: true, onEnter: () => sec.querySelectorAll<HTMLImageElement>('img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }) });
        const jouer: Record<string, () => void> = {
          bronze: () => { if (coulee) gsap.to(coulee.tl, { progress: 1, duration: 2.6, ease: 'power1.inOut', overwrite: true }); },
          ardoise: () => { feuillets?.restart(); },
          pneu: () => { if (empreinte) gsap.to(empreinte.tl, { progress: 1, duration: 2, ease: 'power1.inOut', overwrite: true }); },
          'petits-formats': () => { petits?.restart(); },
        };
        const jouerPanneau = (p: HTMLElement) => (jouer[p.dataset.matiere || ''] || (() => undefined))();
        // le premier panneau est complet dès son arrivée à l'écran
        gsap.from(trioDe(elems[0]), { y: 70, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: elems[0], start: 'top 65%', once: true } });
        ScrollTrigger.create({ trigger: elems[0], start: 'top 60%', once: true, onEnter: () => jouerPanneau(elems[0]) });
        if (largeur === 'bureau') {
          gsap.set(elems.slice(1), { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
          const tl = gsap.timeline({ paused: true });
          const debuts = [0];
          tl.to({}, { duration: 0.5 });
          elems.slice(1).forEach((p, i) => {
            debuts.push(tl.duration());
            tl.to(p, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
              .from(p.querySelector('[data-fond] img'), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
              .from(trioDe(p), { x: 120, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '<0.1')
              .call(() => jouerPanneau(p), undefined, '<0.2')
              .to({}, { duration: i === elems.length - 2 ? 0.45 : 0.5 });
          });
          const total = tl.duration();
          const seuils = debuts.map((t, k) => (k ? (t + 0.35) / total : 0));
          const actuel = (pr: number) => seuils.reduce((n, sv, k) => (pr >= sv ? k : n), 0);
          const reperes = debuts.map((t, k) => (k ? Math.min(0.98, (t + 0.75) / total) : 0.02));
          const st = ScrollTrigger.create({
            trigger: piste, start: 'top top', end: `+=${(elems.length - 1) * 100}%`, pin: true, scrub: 0.8, anticipatePin: 1,
            pinType: piegeFixe(piste) ? 'transform' : 'fixed',
            animation: tl, onUpdate: (sv) => setActif(actuel(sv.progress)),
          });
          const allerPanneau = (k: number, doux: boolean) => {
            const cible = st.start + (st.end - st.start) * reperes[k];
            const l = lenis();
            if (l) l.scrollTo(cible, doux ? { duration: 1.4 } : { immediate: true, force: true }); else scrollTo(0, cible);
            if (!doux) { ScrollTrigger.update(); }
          };
          sec.querySelectorAll<HTMLButtonElement>('[data-index] button').forEach((b, k) => {
            const f = () => allerPanneau(k, true);
            b.addEventListener('click', f); ecouteurs.push(() => b.removeEventListener('click', f));
          });
          // au clavier, le focus amène directement au panneau qui le contient
          elems.forEach((p, k) => {
            const f = () => { if (actuel(st.progress) !== k || (k > 0 && !st.isActive)) allerPanneau(k, false); };
            p.addEventListener('focusin', f); ecouteurs.push(() => p.removeEventListener('focusin', f));
          });
          setActif(0);
        } else {
          elems.slice(1).forEach((p) => {
            ScrollTrigger.create({ trigger: p, start: 'top 65%', once: true, onEnter: () => jouerPanneau(p) });
            gsap.from(trioDe(p), { y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 60%', once: true } });
          });
        }
      }, sec);
      aimants(sec);
      rafraichir();
    });
    return () => {
      fini = true;
      ecouteurs.forEach((f) => f());
      ctx?.revert();
      coulee?.detruire(); empreinte?.detruire();
      rafraichir();
    };
  }, [charge, largeur, edition, props.bronzeMot, props.pneuMot, uid]);

  const compte = (n: number) => nombreOeuvres(n, motOeuvre, motOeuvres).replace(/^\d+ /, '');
  const fondUrl = (f?: { url: string; uri?: string }) => (f?.url ? tailleWix({ url: f.url, uri: f.uri || '', w: 1920, h: 1080 }, 1920) : '');

  return (
    <div id={id} dir={direction} className={clsx('lp-salles', s.racine, s.fallbackDirection, statique && s.calme, className)}>
      <div className={s.jetons}>
      <section className={s.matieres} id="matieres" ref={secRef} aria-label={ARIA.section}>
        <div className={s.piste} data-piste="">
          <nav {...part('lpSallesIndex', 'lp-salles-index', 'index-matieres')} data-index="" aria-label={ARIA.index}>
            {panneaux.map((p, k) => (
              <button key={p.cle} type="button" aria-current={k === actif ? 'true' : 'false'}><span>{p.index}</span></button>
            ))}
          </nav>
          {panneaux.map((p) => {
            const inf = infos[p.cle];
            const trio = trios[p.cle] || [];
            const idMot = `${id}-${p.cle}`;
            return (
              <article key={p.cle} className={s.matiere} data-matiere={p.cle} aria-labelledby={idMot}>
                <div className={s['fond-image']} data-fond="" aria-hidden="true">{fondUrl(p.fond) ? <img src={fondUrl(p.fond)} alt="" loading="lazy" /> : null}</div>
                <div className={s.contenu}>
                  <div>
                    {p.cle === 'bronze' ? (
                      <h2 {...part('lpSallesMot', 'lp-salles-mot', 'mot-matiere')} id={idMot}><span className={s.sr}>{props.bronzeMot}</span><svg className={s['mot-svg']} data-coulee="" aria-hidden="true" /></h2>
                    ) : null}
                    {p.cle === 'ardoise' ? (
                      <h2 {...part('lpSallesMot', 'lp-salles-mot', 'mot-matiere', 'clive')} id={idMot} data-feuillets=""><Strates n={6} s={s}>{props.ardoiseMot}</Strates></h2>
                    ) : null}
                    {p.cle === 'pneu' ? (
                      <h2 {...part('lpSallesMot', 'lp-salles-mot', 'mot-matiere')} id={idMot}><span className={s.sr}>{props.pneuNomAccessible}</span><svg className={s['mot-svg']} data-empreinte="" aria-hidden="true" /></h2>
                    ) : null}
                    {p.cle === 'petits-formats' ? (
                      <h2 {...part('lpSallesMot', 'lp-salles-mot', 'mot-matiere', 'mot-petits', 'clive')} id={idMot} data-mot-petits=""><Strates n={5} s={s}>{props.petitsLigne1}<br />{props.petitsLigne2}</Strates></h2>
                    ) : null}
                    <div className={s.infos}>
                      <p {...part('lpSallesNombre', 'lp-salles-nombre', 'nombre', 'chiffres')} style={inf ? undefined : { visibility: 'hidden' }}>
                        <span className={s.compte}>{inf ? inf.nombre : ''}</span> <span>{compte(inf ? inf.nombre : 2)}</span>
                      </p>
                      <p {...part('lpSallesTexte', 'lp-salles-texte', 'texte')}>{p.texte}</p>
                      <a {...part('lpSallesBouton', 'lp-salles-bouton', 'bouton')} data-bouton="" href={lien(inf?.lien) || undefined}><span>{p.bouton}</span></a>
                    </div>
                  </div>
                  <div className={s.trio} data-trio="">
                    {!trio.length ? (
                      <span hidden><a {...part('lpSallesOeuvre', 'lp-salles-oeuvre', 'trio-lien')}><span className={s.cartel}><strong /><span className={cx(s, 'dims-l chiffres')} /><span className={cx(s, 'prix chiffres')} /></span></a></span>
                    ) : null}
                    {trio.map((o) => {
                      const ph = o.photos[0];
                      return (
                        <a key={o.id} {...part('lpSallesOeuvre', 'lp-salles-oeuvre', 'trio-lien')} href={lien(o.lien)} data-carte="">
                          {ph ? <img className={s.oeuvre} src={tailleWix(ph, 800)} srcSet={srcsetWix(ph, [800])} sizes="(max-width: 860px) 30vw, 16vw" alt={ph.alt || altOeuvre(o)} width={ph.w} height={ph.h} loading="lazy" decoding="async" /> : null}
                          <span className={s.cartel}>
                            <strong>{o.titre}</strong>
                            <span className={cx(s, 'dims-l chiffres')}>{o.dimensions.replace(/ \(.*\)$/, '')}</span>
                            {o.prix && !o.vendue ? <span className={cx(s, 'prix chiffres')}>{prix(o.prix, langue)}</span> : null}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      </div>
    </div>
  );
};

export default LpSalles;
