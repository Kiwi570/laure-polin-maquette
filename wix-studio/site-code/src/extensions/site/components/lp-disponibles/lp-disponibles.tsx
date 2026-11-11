/* « Nos œuvres du moment » (accueil.js : rendreDispo, animerDispo ; cartes.js : carteOeuvre) :
   section épinglée, piste horizontale liée au défilement, fond teinté par l'œuvre la plus proche du centre,
   repère « n / 11 », cartes de hauteur proportionnelle à la hauteur réelle des œuvres, ajout au panier Wix. */
import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import s from './lp-disponibles.module.css';
import type { LpDisponiblesProps } from './lp-disponibles.props';
import { ARIA } from './constants';
import { moteur, calme, etroit, animerClive, rafraichir, piegeFixe, lenis, aimants } from '../../../../lp-commun/moteur';
import { categorie, oeuvresDe, couleursPhoto, tailleWix, srcsetWix, prix, teinteSombre, ajouterAuPanier, etatPanier } from '../../../../lp-commun/donnees';
import type { Oeuvre, EtatPanier } from '../../../../lp-commun/donnees';
import { useEdition, cx, Strates, gabarit } from '../../../../lp-commun/react';

const ICO = {
  plus: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.4" fill="none" /></svg>,
  ok: <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M2.5 8.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>,
};
const altOeuvre = (o: Oeuvre) => `${o.titre}${o.matiere ? `, sculpture en ${o.matiere.toLowerCase()}` : ''}, de Laure Polin`;

const LpDisponibles: FC<LpDisponiblesProps> = (props) => {
  const { id, className, direction, titre, texte, categorie: nomCategorie, finTexte, elementProps } = props;
  const edition = useEdition();
  const secRef = useRef<HTMLElement>(null);
  const pisteRef = useRef<HTMLDivElement>(null);
  const teteRef = useRef<HTMLDivElement>(null);
  const [oeuvres, setOeuvres] = useState<Array<Oeuvre>>([]);
  const [couleurs, setCouleurs] = useState<Record<string, { fond: string; couleur: string }>>({});
  const [H, setH] = useState(420);
  const [mode, setMode] = useState<'' | 'bureau' | 'etroit' | 'calme'>('');
  const [panier, setPanier] = useState<Array<string>>([]);
  const [liensFin, setLiensFin] = useState<Array<string>>([]);
  const actifRef = useRef(0);
  const fins = [
    { t: props.fin1Texte, c: props.fin1Categorie },
    { t: props.fin2Texte, c: props.fin2Categorie },
    { t: props.fin3Texte, c: props.fin3Categorie },
    { t: props.fin4Texte, c: props.fin4Categorie },
  ];
  const cleFins = fins.map((f) => f.c).join('|');

  const part = (cle: keyof NonNullable<LpDisponiblesProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });

  /* ---------- données ---------- */
  useEffect(() => {
    let vivant = true;
    if (nomCategorie) oeuvresDe(nomCategorie).then((l) => {
      if (!vivant) return;
      setOeuvres(l);
      l.forEach((o) => { if (o.photos[0]) couleursPhoto(o.photos[0].url).then((c) => { if (vivant) setCouleurs((v) => ({ ...v, [o.id]: c })); }); });
    }).catch(() => undefined);
    return () => { vivant = false; };
  }, [nomCategorie]);
  useEffect(() => {
    let vivant = true;
    Promise.all(fins.map((f) => (f.c ? categorie(f.c).catch(() => null) : Promise.resolve(null)))).then((cs) => { if (vivant) setLiensFin(cs.map((c) => c?.lien || '')); });
    return () => { vivant = false; };
  }, [cleFins]);
  useEffect(() => {
    if (edition) return undefined;
    const maj = (e: Event) => setPanier((e as CustomEvent<EtatPanier>).detail.ids);
    window.addEventListener('lp:panier-etat', maj);
    etatPanier().then((e) => setPanier(e.ids)).catch(() => undefined);
    return () => window.removeEventListener('lp:panier-etat', maj);
  }, [edition]);

  /* ---------- hauteur des cartes (hauteurDispo) ---------- */
  useEffect(() => {
    const maj = () => {
      const st = edition || calme();
      const bureau = !etroit();
      setMode(st ? 'calme' : bureau ? 'bureau' : 'etroit');
      if (bureau && !st) {
        const tete = teteRef.current;
        setH(Math.max(220, Math.min(540, innerHeight - (tete ? tete.offsetHeight : 0) - 110 - 120)));
      } else setH(Math.min(innerHeight * 0.42, 460));
    };
    maj();
    addEventListener('resize', maj);
    return () => removeEventListener('resize', maj);
  }, [edition, titre, texte]);

  /* ---------- animation ---------- */
  useEffect(() => {
    const sec = secRef.current; const piste = pisteRef.current;
    if (!sec || !piste || !mode) return undefined;
    const { gsap, ScrollTrigger } = moteur();
    const cartes = Array.from(piste.querySelectorAll<HTMLElement>('[data-carte]'));
    const teinter = (c?: HTMLElement) => { if (c?.dataset.couleur) sec.style.setProperty('--teinte', teinteSombre(c.dataset.couleur, 0.3)); };
    teinter(cartes[actifRef.current] || cartes[0]);
    let io: IntersectionObserver | null = null;
    const ecouteurs: Array<() => void> = [];
    const ctx = gsap.context(() => {
      if (mode !== 'calme') animerClive(sec.querySelector('[data-clive]'), { strates: 4, ecart: 70 });
      if (!cartes.length) return;
      if (mode !== 'bureau') {
        io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { actifRef.current = cartes.indexOf(en.target as HTMLElement); teinter(en.target as HTMLElement); } }), { root: mode === 'etroit' ? sec.querySelector('[data-piste-scroll]') : null, threshold: 0.6 });
        cartes.forEach((c) => io?.observe(c));
        return;
      }
      const distance = () => piste.scrollWidth - innerWidth;
      const tw = gsap.to(piste, { x: () => -distance(), ease: 'none' });
      const hudN = sec.querySelector('[data-hud-n]'); const hudT = sec.querySelector('[data-hud-t]'); const hudB = sec.querySelector<HTMLElement>('[data-hud-barre]');
      let actif: HTMLElement | null = null;
      const st = ScrollTrigger.create({
        trigger: sec, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, animation: tw, invalidateOnRefresh: true, anticipatePin: 1,
        pinType: piegeFixe(sec) ? 'transform' : 'fixed',
        onUpdate: (self) => {
          if (hudB) hudB.style.transform = `scaleX(${self.progress})`;
          const mid = innerWidth / 2;
          let best: HTMLElement | null = null; let bd = 1e9;
          cartes.forEach((c) => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
          if (best && best !== actif) {
            actif = best; teinter(best);
            const ka = cartes.indexOf(best);
            actifRef.current = ka;
            if (hudN) hudN.textContent = `${ka + 1} / ${cartes.length}`;
            if (hudT) hudT.textContent = (best as HTMLElement).dataset.titre || '';
          }
        },
      });
      const surFocus = (ev: FocusEvent) => {
        const el = (ev.target as Element).closest<HTMLElement>('[data-carte], [data-fin]'); if (!el) return;
        const d = distance(); if (d <= 0) return;
        const pr = Math.min(1, Math.max(0, (el.offsetLeft + el.offsetWidth / 2 - innerWidth / 2) / d));
        const y = st.start + (st.end - st.start) * pr;
        const l = lenis();
        if (l) l.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y);
      };
      piste.addEventListener('focusin', surFocus);
      ecouteurs.push(() => piste.removeEventListener('focusin', surFocus));
      cartes.forEach((c) => {
        gsap.fromTo(c.querySelector('img'), { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 95%', end: 'left 55%', scrub: true } });
      });
    }, sec);
    aimants(sec);
    rafraichir();
    return () => { ecouteurs.forEach((f) => f()); io?.disconnect(); ctx.revert(); rafraichir(); };
  }, [mode, oeuvres, H]);

  /* la teinte de l'œuvre active suit les couleurs mesurées sur les photos */
  useEffect(() => {
    const sec = secRef.current; const o = oeuvres[actifRef.current];
    const c = o ? couleurs[o.id] : undefined;
    if (sec && c) sec.style.setProperty('--teinte', teinteSombre(c.couleur, 0.3));
  }, [couleurs, oeuvres]);

  const hMax = Math.max(40, ...oeuvres.map((o) => o.hauteur || 40));
  const premiere = oeuvres[0];

  return (
    <div id={id} dir={direction} className={clsx('lp-disponibles', s.racine, s.fallbackDirection, mode === 'calme' && s.calme, className)}>
      <section className={s['salle-h']} id="disponibles" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={cx(s, 'tete contenu')} ref={teteRef}>
          <div className={s.intertitre}>
            <h2 {...part('lpDisponiblesTitre', 'lp-disponibles-titre', 'clive')} id={`${id}-titre`} data-clive=""><Strates n={4} s={s}>{titre}</Strates></h2>
            <p {...part('lpDisponiblesTexte', 'lp-disponibles-texte', 'intro')}>{texte}</p>
          </div>
        </div>
        <div className={s['piste-scroll']} data-piste-scroll="">
          <div className={s['piste-h']} ref={pisteRef}>
            {oeuvres.map((o) => {
              const ph = o.photos[0];
              const k = 0.48 + 0.52 * Math.pow((o.hauteur || 40) / hMax, 0.6);
              const hauteurPx = Math.round(H * k);
              const ratio = ph ? ph.w / ph.h : 0.7;
              const hImg = hauteurPx - 20;
              const largeur = Math.max(160, Math.round(hImg * ratio) + 20);
              const c = couleurs[o.id];
              const dedans = panier.includes(o.id);
              return (
                <article key={o.id} {...part('lpDisponiblesCarte', 'lp-disponibles-carte', 'oeuvre-carte')} data-carte="" data-couleur={c?.couleur || '#3c444e'} data-titre={o.titre} style={{ width: `${Math.max(largeur, 220)}px` }}>
                  <a href={o.lien} aria-label={gabarit(ARIA.voirFiche, { titre: o.titre })}>
                    <div className={s['socle-zone']} style={{ height: `${hauteurPx}px` }}>
                      <div className={s['photo-cadre']}>
                        {ph ? <img className={s.oeuvre} src={tailleWix(ph, 800)} srcSet={srcsetWix(ph)} sizes="(max-width: 860px) 70vw, 30vw" alt={ph.alt || altOeuvre(o)} width={ph.w} height={ph.h} loading="lazy" decoding="async" style={{ height: `${hImg}px`, backgroundColor: c?.fond }} /> : null}
                      </div>
                    </div>
                  </a>
                  <div className={s.cartel}>
                    <div>
                      <strong>{o.titre}</strong>
                      {o.matiere}{o.matiere && o.dimensions ? ', ' : ''}{o.dimensions ? <span className={s.chiffres}>{o.dimensions}</span> : null}
                      {o.prix ? <><br /><span className={s.prix}>{prix(o.prix)}</span></> : null}
                    </div>
                    {o.prix ? (
                      <button
                        type="button"
                        {...part('lpDisponiblesAjout', 'lp-disponibles-ajout', 'ajout', dedans && 'dans-panier')}
                        aria-label={gabarit(dedans ? ARIA.dansPanier : ARIA.ajouter, { titre: o.titre })}
                        onClick={(e) => { ajouterAuPanier(o, e.currentTarget, true); }}
                      >
                        {dedans ? ICO.ok : ICO.plus}
                      </button>
                    ) : null}
                  </div>
                </article>
              );
            })}
            <div className={s.fin} data-fin="">
              <p {...part('lpDisponiblesFinTexte', 'lp-disponibles-fin-texte', 'lead')}>{finTexte}</p>
              <nav className={s.actions} aria-label={ARIA.salles}>
                {fins.map((f, i) => (
                  <a key={i} {...part('lpDisponiblesFinBouton', 'lp-disponibles-fin-bouton', 'bouton', i === 0 && 'bouton--plein')} data-bouton="" href={liensFin[i] || undefined}><span>{f.t}</span></a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div {...part('lpDisponiblesRepere', 'lp-disponibles-repere', 'hud-salle')} aria-hidden="true" style={mode !== 'bureau' ? { display: 'none' } : undefined}>
          <span />
          <p><span className={s.chiffres} data-hud-n="">{`1 / ${oeuvres.length}`}</span><span className={s['hud-t']} data-hud-t="">{premiere?.titre || ''}</span></p>
          <span />
          <span className={s['hud-barre']}><i data-hud-barre="" /></span>
        </div>
      </section>
    </div>
  );
};

export default LpDisponibles;
