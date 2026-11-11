/* Contact (index.html #contact ; accueil.js : construirePlan, formulaire ; cartes.js : monterFormulaire).
   Le formulaire garde le comportement de la maquette : validation, messages, confirmation, rien n'est envoyé. */
import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FC, FormEvent } from 'react';
import clsx from 'clsx';
import s from './lp-contact.module.css';
import type { LpContactProps } from './lp-contact.props';
import { SRS } from './constants';
import { moteur, calme, animerClive, rafraichir, aimants } from '../../../../lp-commun/moteur';
import { oeuvresDe, prix } from '../../../../lp-commun/donnees';
import type { Oeuvre } from '../../../../lp-commun/donnees';
import { useLangue, traduire } from '../../../../lp-commun/langue';
import { useEdition, cx, Strates, gabarit, telDe } from '../../../../lp-commun/react';
import { PLAN } from '../../../../lp-commun/formes';

type Manque = 'nom' | 'email' | 'message';

const LpContact: FC<LpContactProps> = (propsBrutes) => {
  const { langue, lien } = useLangue();
  const props = traduire(propsBrutes, langue);
  const SR = SRS[langue];
  const { id, className, direction, titre, texte, demandes, categoriesOeuvres, elementProps } = props;
  const edition = useEdition();
  const uid = useId().replace(/:/g, '');
  const secRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const confRef = useRef<HTMLDivElement>(null);
  const [oeuvres, setOeuvres] = useState<Array<Oeuvre>>([]);
  const [choix, setChoix] = useState('');
  const [manques, setManques] = useState<Array<Manque>>([]);
  const [envoye, setEnvoye] = useState<{ nom: string; email: string; oeuvre: string } | null>(null);
  const part = (cle: keyof NonNullable<LpContactProps['elementProps']>, globale: string, ...cls: Array<string | false>) => ({
    ...(elementProps?.[cle] || {}),
    className: clsx(globale, cx(s, ...cls), elementProps?.[cle]?.className),
  });
  const f = (n: string) => `${uid}-${n}`;

  /* œuvres disponibles des salles, par ordre alphabétique avec leur prix */
  useEffect(() => {
    let vivant = true;
    const noms = (categoriesOeuvres || '').split(',').map((x) => x.trim()).filter(Boolean);
    Promise.all(noms.map((n) => oeuvresDe(n).catch(() => [] as Array<Oeuvre>))).then((ls) => {
      if (!vivant) return;
      const vus = new Map<string, Oeuvre>();
      ls.flat().forEach((o) => { if (!o.vendue && !vus.has(o.id)) vus.set(o.id, o); });
      const liste = [...vus.values()].sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
      setOeuvres(liste);
      const q = new URLSearchParams(location.search).get('oeuvre');
      if (q && liste.some((o) => o.slug === q)) setChoix(q);
    });
    return () => { vivant = false; };
  }, [categoriesOeuvres]);

  useEffect(() => {
    const sec = secRef.current;
    if (!sec) return undefined;
    const { gsap } = moteur();
    const ctx = gsap.context(() => {
      if (edition || calme()) return;
      animerClive(sec.querySelector('[data-clive]'), { strates: 4, ecart: 70 });
      const z = sec.querySelector('[data-plan]');
      if (z) gsap.from(z.querySelectorAll('[data-zone]'), { opacity: 0, duration: 0.8, stagger: 0.06, scrollTrigger: { trigger: z, start: 'top 85%', once: true } });
    }, sec);
    aimants(sec);
    rafraichir();
    return () => { ctx.revert(); rafraichir(); };
  }, [edition]);

  useEffect(() => { if (envoye) confRef.current?.focus(); }, [envoye]);

  const libelleManque: Record<Manque, string | undefined> = { nom: props.erreurNom, email: props.erreurEmail, message: props.erreurMessage };
  const envoyer = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const fo = ev.currentTarget;
    const val = (n: string) => ((fo.elements.namedItem(n) as HTMLInputElement | null)?.value || '').trim();
    const nom = val('nom'); const mail = val('email'); const msg = val('message');
    const m: Array<Manque> = [];
    if (!nom) m.push('nom');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) m.push('email');
    if (!msg) m.push('message');
    setManques(m);
    if (m.length) { (fo.elements.namedItem(m[0]) as HTMLElement | null)?.focus(); return; }
    const o = oeuvres.find((x) => x.slug === choix);
    setEnvoye({ nom, email: mail, oeuvre: o ? o.titre : '' });
  };
  const invalide = (n: Manque) => (manques.includes(n) ? { 'aria-invalid': true as const, 'aria-describedby': f('erreur') } : {});
  const plan = useMemo(() => {
    const pad = 8;
    return { vb: `${-pad} ${-pad} ${PLAN.w + pad * 2} ${PLAN.h + pad * 2}` };
  }, []);

  return (
    <div id={id} dir={direction} className={clsx('lp-contact', s.racine, s.fallbackDirection, className)}>
      <div className={s.jetons}>
      <section className={cx(s, 'section atelier')} id="contact" ref={secRef} aria-labelledby={`${id}-titre`}>
        <div className={s.contenu}>
          <div className={s.intertitre}>
            <h2 {...part('lpContactTitre', 'lp-contact-titre', 'clive')} id={`${id}-titre`} data-clive=""><Strates n={4} s={s}>{titre}</Strates></h2>
            <p {...part('lpContactTexte', 'lp-contact-texte', 'intro')}>{texte}</p>
          </div>
          <div className={s.rang}>
            <div className={s.gauche}>
              <div className={s.coord}>
                <span className={s.mini}>{props.etiquetteAtelier}</span>
                <span {...part('lpContactAdresse', 'lp-contact-adresse', 'grand')}>{props.adresseLigne1}<br />{props.adresseLigne2}</span>
                <a {...part('lpContactLien', 'lp-contact-lien', 'lien', 'chiffres', 'tel')} href={telDe(props.telephone)}>{props.telephone}</a>
                <a {...part('lpContactLien', 'lp-contact-lien', 'lien')} href={`mailto:${props.email}`}>{props.email}</a>
              </div>
              <p className={s.visites}>{props.visitesTexte} <a className={cx(s, 'lien chiffres tel')} href={telDe(props.visitesTelephone)}>{props.visitesTelephone}</a>.</p>
              <p className={s.para}><a {...part('lpContactLien', 'lp-contact-lien', 'lien', 'mini')} href={props.itineraireLien?.href} target={props.itineraireLien?.target || '_blank'} rel="noopener">{props.itineraireTexte}<span className={s.sr}>{SR.googleMaps}</span></a></p>
              <div {...part('lpContactPlan', 'lp-contact-plan', 'plan')} data-plan="">
                <svg viewBox={plan.vb} role="img" aria-label={props.descriptionPlan}>
                  {PLAN.zones.map((zn, i) => <path key={`p${i}`} data-zone="" className={cx(s, zn.type === 'a' ? 'paris' : 'commune', zn.nom === 'Bagnolet' && 'ici')} d={zn.d} />)}
                  {PLAN.zones.map((zn, i) => {
                    const [x, y] = zn.c;
                    if (x < 4 || y < 4 || x > PLAN.w - 4 || y > PLAN.h - 4) return null;
                    return <text key={`t${i}`} x={x} y={y} className={zn.nom === 'Bagnolet' ? s['texte-ici'] : s['texte-commune']}>{zn.nom}</text>;
                  })}
                  <text x={40} y={PLAN.h - 20} className={s['texte-commune']}>Paris</text>
                </svg>
              </div>
              <div className={s.actions}>
                <a {...part('lpContactReseau', 'lp-contact-reseau', 'bouton')} data-bouton="" href={props.instagramLien?.href} target={props.instagramLien?.target || '_blank'} rel="noopener"><span>{props.instagramTexte}</span><span className={s.sr}>{SR.nouvelOnglet}</span></a>
                <a {...part('lpContactReseau', 'lp-contact-reseau', 'bouton')} data-bouton="" href={props.facebookLien?.href} target={props.facebookLien?.target || '_blank'} rel="noopener"><span>{props.facebookTexte}</span><span className={s.sr}>{SR.nouvelOnglet}</span></a>
              </div>
            </div>
            <div className={s.droite}>
              <form className={s.formulaire} ref={formRef} noValidate onSubmit={envoyer}>
                <div {...part('lpContactConfirmation', 'lp-contact-confirmation', 'confirmation')} role="status" tabIndex={-1} ref={confRef} hidden={!envoye}>
                  <p className={s.lead} style={{ marginBottom: '.5em' }}>{gabarit(props.merciTitre, { nom: envoye?.nom || '' })}</p>
                  <p style={{ margin: 0 }}>{gabarit(props.merciTexte, { oeuvre: envoye?.oeuvre ? gabarit(props.merciOeuvre, { titre: envoye.oeuvre }) : '', email: envoye?.email || '' })}</p>
                </div>
                <div className={s.champs} hidden={!!envoye}>
                  <fieldset className={s.choix}>
                    <legend {...part('lpContactLibelle', 'lp-contact-libelle', 'legende')}>{props.legendeDemande}</legend>
                    {(demandes || []).map((d, k) => (
                      <label key={`${d.valeur}-${k}`}>
                        <input type="radio" name="type" value={d.valeur} defaultChecked={k === 0} />
                        <span {...part('lpContactChoix', 'lp-contact-choix', 'pastille')}>{d.libelle}</span>
                      </label>
                    ))}
                  </fieldset>
                  <div className={s.champ}>
                    <label {...part('lpContactLibelle', 'lp-contact-libelle', 'libelle')} htmlFor={f('oeuvre')}>{props.libelleOeuvre}</label>
                    <select {...part('lpContactChamp', 'lp-contact-champ', 'saisie', 'liste')} id={f('oeuvre')} name="oeuvre" value={choix} onChange={(e) => setChoix(e.currentTarget.value)}>
                      <option value="">{props.optionAucune}</option>
                      {oeuvres.map((o) => <option key={o.id} value={o.slug}>{o.titre}{o.prix ? ` (${prix(o.prix, langue)})` : ''}</option>)}
                    </select>
                  </div>
                  <div className={s.deux}>
                    <div className={s.champ}>
                      <label {...part('lpContactLibelle', 'lp-contact-libelle', 'libelle')} htmlFor={f('nom')}>{props.libelleNom}</label>
                      <input {...part('lpContactChamp', 'lp-contact-champ', 'saisie')} id={f('nom')} name="nom" autoComplete="name" required {...invalide('nom')} onInput={() => setManques((m) => m.filter((x) => x !== 'nom'))} />
                    </div>
                    <div className={s.champ}>
                      <label {...part('lpContactLibelle', 'lp-contact-libelle', 'libelle')} htmlFor={f('email')}>{props.libelleEmail}</label>
                      <input {...part('lpContactChamp', 'lp-contact-champ', 'saisie')} id={f('email')} name="email" type="email" autoComplete="email" required {...invalide('email')} onInput={() => setManques((m) => m.filter((x) => x !== 'email'))} />
                    </div>
                  </div>
                  <div className={s.champ}>
                    <label {...part('lpContactLibelle', 'lp-contact-libelle', 'libelle')} htmlFor={f('tel')}>{props.libelleTelephone}</label>
                    <input {...part('lpContactChamp', 'lp-contact-champ', 'saisie')} id={f('tel')} name="tel" type="tel" autoComplete="tel" />
                  </div>
                  <div className={s.champ}>
                    <label {...part('lpContactLibelle', 'lp-contact-libelle', 'libelle')} htmlFor={f('msg')}>{props.libelleMessage}</label>
                    <textarea {...part('lpContactChamp', 'lp-contact-champ', 'saisie', 'zone')} data-lenis-prevent="" id={f('msg')} name="message" required {...invalide('message')} onInput={() => setManques((m) => m.filter((x) => x !== 'message'))} />
                  </div>
                  <p className={s.mini} id={f('erreur')} role="alert">{manques.length ? `${props.erreurDebut} ${manques.map((m) => libelleManque[m]).join(', ')}.` : ''}</p>
                  <div><button type="submit" {...part('lpContactEnvoyer', 'lp-contact-envoyer', 'bouton', 'bouton--plein')} data-bouton=""><span>{props.boutonEnvoyer}</span></button></div>
                  <p {...part('lpContactNote', 'lp-contact-note', 'mini')}>{props.noteEnvoi}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
};

export default LpContact;
