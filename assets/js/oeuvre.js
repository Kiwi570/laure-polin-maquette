/* Fiche d'oeuvre : apparition, vues avec loupe, recit, vue a l'echelle, acquisition. */
import LP, { demarrer } from './base.js?v=20261028';
import { fondArdoise } from './ardoise-gl.js?v=20261028';
import { poussiere } from './poussiere.js?v=20261028';
import { imgOeuvre, carteOeuvre, altOeuvre, monterFormulaire } from './cartes.js?v=20261028';

demarrer();
const { gsap, ScrollTrigger, calme, tr } = LP;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const e = LP.esc;
const nb = (v) => (LP.en ? String(v) : String(v).replace('.', ','));

const q = new URLSearchParams(location.search);
const demande = q.get('o');
const O = LP.parId[demande] || LP.parId.harmonie;
if (demande && !LP.parId[demande]) {
  document.querySelector('main').insertAdjacentHTML('afterbegin', `<div class="introuvable" role="status"><div class="contenu"><p>${tr(
    'Cette œuvre n’existe pas ou a changé d’adresse. Voici Harmonie ; toutes les œuvres sont dans les <a class="lien" href="salle.html?s=ardoise">salles</a>.',
    'This work does not exist or has moved. Here is Harmonie; all the works are in the <a class="lien" href="salle.html?s=ardoise">rooms</a>.')}</p></div></div>`);
}
const serie = O.series.find((s) => s !== 'livre') || 'ardoise';
document.title = `${O.titre} — Laure Polin, sculptures`;

/* ---------- entree ---------- */
$('[data-fil]').innerHTML = `<a href="index.html">${tr('Accueil', 'Home')}</a><span aria-hidden="true">/</span><a href="salle.html?s=${serie}">${e(LP.NOMS_SERIES[serie] || tr('Œuvres', 'Works'))}</a><span aria-hidden="true">/</span><span aria-current="page">${e(O.titre)}</span>`;
$('[data-titre]').textContent = O.titre;
// les lignes de dimensions sont reperees sur le texte francais ; on affiche la ligne de meme rang dans la langue de la page
const TECH = LP.technique(O);
const estDimension = (t) => /^(hauteur|largeur|profondeur|longueur|dimensions|h\s*:?\s*\d|l\s*\d|p\s*\d|\d)/i.test(t.trim());
$('[data-technique]').textContent = (O.technique.map((t, i) => (estDimension(t) ? '' : TECH[i] || t)).filter(Boolean).join(' ') || LP.matiereCourte(O)).replace(/^./, (c) => c.toUpperCase());
const st = LP.statut(O);
const kEdition = O.technique.findIndex((t) => /exemplaire|tirage|n°|n \d|pièce unique|épreuve|ea\b/i.test(t));
const edition = kEdition >= 0 ? (LP.en ? TECH[kEdition] : O.technique[kEdition].replace(/^(pièce en bronze, )/i, '')) : '';
const carac = [
  [tr('Matières', 'Materials'), LP.matiereCourte(O)],
  [tr('Dimensions', 'Dimensions'), LP.dims(O)],
  [tr('Édition', 'Edition'), edition],
  [tr('Année', 'Year'), `<span class="a-completer">${tr('à compléter', 'to be completed')}</span>`, true],
  [tr('Statut', 'Status'), `<span class="etat ${st.cls}">${st.txt}</span>`, true],
].filter(([, v]) => v);
$('[data-caracteristiques]').innerHTML = carac.map(([k, v, html]) => `<dt>${k}</dt><dd>${html ? v : e(v)}</dd>`).join('');
$('[data-prix]').textContent = O.statut === 'disponible' ? LP.prix(O.prix) : '';
if (O.a_verifier) $('[data-caracteristiques]').insertAdjacentHTML('afterend', `<p class="mini a-completer">${e(LP.en ? O.a_verifier_en || O.a_verifier : O.a_verifier)}</p>`);

const ECHELLE = !!(O.detoure && O.dimensions?.h);
const actions = () => {
  const dispo = O.statut === 'disponible' && O.prix;
  return `${dispo ? `<button class="bouton bouton--plein" type="button" data-ajout="${O.id}" data-libelle="${tr('Ajouter au panier', 'Add to basket')}"><span>${tr('Ajouter au panier', 'Add to basket')}</span></button>` : ''}
    <a class="bouton${dispo ? '' : ' bouton--plein'}" href="#acquerir"><span>${dispo ? tr('Demander cette œuvre', 'Enquire about this work') : tr('Écrire à Laure Polin', 'Write to Laure Polin')}</span></a>
    ${ECHELLE ? `<a class="bouton" href="#echelle"><span>${tr('Voir à l’échelle', 'See it to scale')}</span></a>` : ''}`;
};
$('[data-actions]').innerHTML = actions();
$('[data-actions-bas]').innerHTML = O.statut === 'disponible' && O.prix ? `<button class="bouton bouton--plein" type="button" data-ajout="${O.id}" data-libelle="${tr('Ajouter au panier', 'Add to basket')}"><span>${tr('Ajouter au panier', 'Add to basket')}</span></button>` : '';
// formulaire de la fiche, pre-rempli
$('[data-message-fiche]').value = O.statut === 'disponible'
  ? tr(`Bonjour, je suis intéressé(e) par « ${O.titre} ». Pourriez-vous m’en dire plus : autres photos, livraison, visite de l’atelier ?`,
    `Hello, I am interested in “${O.titre}”. Could you tell me more: other photos, delivery, a visit to the studio?`)
  : tr(`Bonjour, j’ai vu « ${O.titre} » sur votre site. Avez-vous des œuvres proches disponibles, ou acceptez-vous les commandes ?`,
    `Hello, I saw “${O.titre}” on your website. Do you have similar works available, or do you accept commissions?`);
monterFormulaire($('[data-formulaire-fiche]'), () => O.titre);
// precedente et suivante dans la salle
{
  const liste = LP.serie(serie);
  const k = liste.findIndex((x) => x.id === O.id);
  if (k >= 0 && liste.length > 1) {
    const prec = liste[(k - 1 + liste.length) % liste.length]; const suiv = liste[(k + 1) % liste.length];
    const vign = (x) => { const v = LP.visuel(x); return v ? `<img src="${LP.src(v, 200)}" alt="" loading="lazy">` : ''; };
    $('[data-suite]').innerHTML = `
      <a class="suite prec" href="${LP.lienOeuvre(prec)}" rel="prev"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>${vign(prec)}<span><small>${tr('Œuvre précédente', 'Previous work')}</small>${LP.esc(prec.titre)}</span></a>
      <span class="mini chiffres">${k + 1} / ${liste.length}, ${tr('salle', 'room:')} ${LP.esc(LP.NOMS_SERIES[serie] || '')}</span>
      <a class="suite suiv" href="${LP.lienOeuvre(suiv)}" rel="next"><span><small>${tr('Œuvre suivante', 'Next work')}</small>${LP.esc(suiv.titre)}</span>${vign(suiv)}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg></a>`;
  } else $('[data-suite]').remove();
}
// description et donnees structurees pour les moteurs de recherche
{
  const m = LP.matiereCourte(O).toLowerCase();
  const desc = tr(
    `${O.titre}, ${m || 'sculpture'}${LP.dims(O) ? `, ${LP.dims(O)}` : ''}${O.statut === 'disponible' && O.prix ? `, ${LP.prix(O.prix)}` : ''}. Sculpture de Laure Polin, atelier de Bagnolet.`,
    `${O.titre}, ${m || 'sculpture'}${LP.dims(O) ? `, ${LP.dims(O)}` : ''}${O.statut === 'disponible' && O.prix ? `, ${LP.prix(O.prix)}` : ''}. Sculpture by Laure Polin, Bagnolet studio.`);
  document.querySelector('meta[name="description"]')?.setAttribute('content', desc);
  const v = LP.visuel(O);
  const ld = { '@context': 'https://schema.org', '@type': 'VisualArtwork', name: O.titre, artform: 'Sculpture', creator: { '@type': 'Person', name: 'Laure Polin' }, artMedium: LP.matiereCourte(O) || undefined, description: LP.description(O).join(' ') || undefined, image: v ? new URL(LP.src(v, 1200), location.href).href : undefined, inLanguage: LP.langue };
  if (O.dimensions?.h) ld.height = { '@type': 'QuantitativeValue', value: O.dimensions.h, unitCode: 'CMT' };
  if (O.statut === 'disponible' && O.prix) ld.offers = { '@type': 'Offer', price: O.prix, priceCurrency: 'EUR', availability: 'https://schema.org/InStock' };
  const sc = document.createElement('script'); sc.type = 'application/ld+json'; sc.textContent = JSON.stringify(ld); document.head.append(sc);
}
$('[data-titre-acquerir]').textContent = O.statut === 'disponible' ? tr('Acquérir cette œuvre', 'Acquire this work') : tr('Cette œuvre a trouvé sa place', 'This work has found its home');
$('[data-texte-acquerir]').textContent = O.statut === 'disponible'
  ? tr(`${O.titre} est disponible${O.prix ? ` au prix de ${LP.prix(O.prix)}` : ''}. Vous pouvez la réserver dans le panier, ou écrire à Laure Polin pour demander d’autres photos, venir la voir à l’atelier ou organiser la livraison.`,
    `${O.titre} is available${O.prix ? ` for ${LP.prix(O.prix)}` : ''}. You can reserve it in the basket, or write to Laure Polin to ask for more photos, come and see it at the studio or arrange delivery.`)
  : tr(`${O.titre} fait partie d’une collection privée. Laure Polin peut vous parler d’œuvres proches ou d’une commande.`,
    `${O.titre} is in a private collection. Laure Polin can tell you about similar works or a commission.`);

/* ---------- entree : la vraie photo de l'oeuvre ---------- */
const scene = $('[data-scene]');
scene.innerHTML = imgOeuvre(O, { sizes: '(max-width: 860px) 80vw, 50vw', charge: 'eager' });
const imgScene = $('img, .oeuvre-absente', scene);
const entree = $('.fiche-entree');
let fond = null;
if (LP.gl) {
  fond = fondArdoise(entree, { teinte: 0.25 });
  if (fond) { $('.gl-repli', entree).style.display = 'none'; fond.canvas.style.cssText = 'position:absolute;inset:0;z-index:-2;width:100%;height:100%'; fond.teinter(O.couleur, 0.35); }
}
const titreClive = LP.cliver($('[data-titre]'), { strates: 4, ecart: 120, declencheur: false, duree: 1.5 });
if (!calme) {
  if (imgScene.tagName === 'IMG') gsap.set(imgScene, { opacity: 0 });
  gsap.set(['.fiche-infos > *:not(h1)'], { opacity: 0, y: 18 });
}
LP.pret.then(() => {
  if (calme) return;
  titreClive && titreClive.play();
  gsap.to('.fiche-infos > *:not(h1)', { opacity: 1, y: 0, duration: 1, stagger: 0.09, delay: 0.35, ease: 'power3.out' });
  if (imgScene.tagName === 'IMG') {
    if (LP.gl) poussiere(imgScene, scene, { duree: 2, depuis: 'bas' });
    else gsap.to(imgScene, { opacity: 1, duration: 1 });
  }
});

/* ---------- vues : photos entieres, loupe a la resolution de la photo ---------- */
const VUES = LP.photos(O);
const vis = $('[data-visionneuse]');
const vue = $('[data-vue]');
const loupe = $('.loupe', vis);
let courant = 0;
const grande = (p) => `assets/${p.src}-${p.tailles[p.tailles.length - 1][0]}.webp`;
const moyenne = (p) => LP.src(p, 1000);
function montrer(i, anime = true) {
  const p = VUES[i]; if (!p) return;
  courant = i;
  $$('[data-vignettes] button').forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
  const poser = () => {
    vue.src = moyenne(p); vue.srcset = LP.srcset(p); vue.sizes = '(max-width: 860px) 92vw, 60vw';
    vue.alt = tr(`${altOeuvre(O)}, vue ${i + 1} sur ${VUES.length}`, `${altOeuvre(O)}, view ${i + 1} of ${VUES.length}`);
    loupe.style.backgroundImage = `url("${grande(p)}")`;
    vis.style.backgroundColor = p.fond || '';
    // la grande photo est chargee a l'avance pour que la loupe soit nette des le premier survol
    const pre = new Image(); pre.src = grande(p);
  };
  if (!anime || calme) { poser(); return; }
  if (LP.gl) {
    poussiere(vue, vis, { sens: 'disperse', duree: 0.9, nombre: 7000, depuis: 'droite' }).then(() => {
      poser(); vue.dataset.opaque = '1';
      poussiere(vue, vis, { duree: 1.2, nombre: 9000, depuis: 'gauche' });
    });
  } else {
    gsap.to(vue, { opacity: 0, duration: 0.25, onComplete: () => { poser(); gsap.to(vue, { opacity: 1, duration: 0.4 }); } });
  }
}
if (VUES.length) {
  vue.dataset.opaque = '1';
  $('[data-vignettes]').innerHTML = VUES.map((p, i) => `<button type="button" aria-label="${tr('Vue', 'View')} ${i + 1}" aria-current="${i === 0}" style="background-color:${p.fond || ''}"><img src="${LP.src(p, 300)}" alt="" loading="lazy"></button>`).join('') +
    `<p class="compte chiffres">${tr(`${VUES.length} ${VUES.length > 1 ? 'vues' : 'vue'}`, `${VUES.length} ${VUES.length > 1 ? 'views' : 'view'}`)}${O.nb_photos_site > VUES.length ? tr(` sur ${O.nb_photos_site} publiées sur le site actuel`, ` of ${O.nb_photos_site} published on the current site`) : ''}</p>`;
  $$('[data-vignettes] button').forEach((b, i) => b.addEventListener('click', () => { if (i !== courant) montrer(i); }));
  montrer(0, false);
  const notes = [];
  if (O.nb_photos_site > VUES.length) notes.push(tr(`${O.nb_photos_site - VUES.length} autres photos existent sur le site actuel et pourront être ajoutées.`, `${O.nb_photos_site - VUES.length} more photos exist on the current site and can be added.`));
  if (O.nb_videos_site) notes.push(tr(`${O.nb_videos_site > 1 ? `${O.nb_videos_site} vidéos` : 'Une vidéo'} de l’œuvre ${O.nb_videos_site > 1 ? 'sont publiées' : 'est publiée'} sur le site actuel : à intégrer.`, `${O.nb_videos_site > 1 ? `${O.nb_videos_site} videos` : 'A video'} of the work ${O.nb_videos_site > 1 ? 'are' : 'is'} published on the current site: to be added.`));
  $('[data-vues-note]').textContent = notes.join(' ') || tr('Photographies de l’atelier.', 'Studio photographs.');
  // loupe : agrandit la photo a sa resolution reelle (jamais au-dela), donc toujours nette
  const TAILLE_LOUPE = 240;
  const placer = (x, y) => {
    const r = vue.getBoundingClientRect(); const rv = vis.getBoundingClientRect();
    if (x < r.left || x > r.right || y < r.top || y > r.bottom) { vis.classList.remove('loupe-on'); return; }
    const p = VUES[courant];
    const largeurReelle = p.tailles[p.tailles.length - 1][1]; // largeur en pixels du plus grand fichier
    const zoom = Math.max(1.4, Math.min(3, largeurReelle / r.width));
    vis.classList.add('loupe-on');
    loupe.style.left = `${x - rv.left}px`; loupe.style.top = `${y - rv.top}px`;
    loupe.style.backgroundSize = `${r.width * zoom}px ${r.height * zoom}px`;
    loupe.style.backgroundPosition = `${-((x - r.left) * zoom - TAILLE_LOUPE / 2)}px ${-((y - r.top) * zoom - TAILLE_LOUPE / 2)}px`;
  };
  vis.addEventListener('pointermove', (ev) => placer(ev.clientX, ev.clientY));
  vis.addEventListener('pointerdown', (ev) => placer(ev.clientX, ev.clientY));
  vis.addEventListener('pointerleave', () => vis.classList.remove('loupe-on'));
  vis.addEventListener('pointerup', (ev) => { if (ev.pointerType === 'touch') vis.classList.remove('loupe-on'); });
  vis.addEventListener('keydown', (ev) => { if (ev.key === 'ArrowRight') montrer((courant + 1) % VUES.length); if (ev.key === 'ArrowLeft') montrer((courant - 1 + VUES.length) % VUES.length); });
  vis.tabIndex = 0; vis.setAttribute('role', 'group'); vis.setAttribute('aria-roledescription', tr('visionneuse', 'viewer')); vis.setAttribute('aria-label', tr('Visionneuse : flèches gauche et droite pour changer de vue', 'Viewer: left and right arrows to change view'));
  // plein ecran
  const pe = $('[data-plein-ecran]');
  $('[data-plein]').addEventListener('click', (ev) => { ev.stopPropagation(); $('img', pe).src = grande(VUES[courant]); $('img', pe).alt = vue.alt; pe.classList.add('on'); pe.inert = false; LP.isoler(pe, true); LP.lenis?.stop(); $('[data-fermer-plein]').focus(); });
  const fermer = () => { pe.classList.remove('on'); pe.inert = true; LP.isoler(pe, false); LP.lenis?.start(); $('[data-plein]').focus(); };
  pe.inert = true;
  $('[data-fermer-plein]').addEventListener('click', fermer);
  pe.addEventListener('click', (ev) => { if (ev.target === pe) fermer(); });
  document.addEventListener('keydown', (ev) => { if (ev.key === 'Escape' && pe.classList.contains('on')) fermer(); });
} else {
  $('.vues-oeuvre').innerHTML = `<div class="contenu"><div class="intertitre"><h2>${tr('Photos à venir', 'Photos to come')}</h2><p>${tr('La photo reçue pour cette œuvre montre la signature de l’artiste. Les vues de l’œuvre sont à ajouter.', 'The photo received for this work shows the artist’s signature. Views of the work are to be added.')}</p></div></div>`;
}

/* ---------- recit et matieres ---------- */
const desc = LP.description(O);
$('[data-description]').innerHTML = desc.length
  ? desc.map((p, i) => (i === 0 ? `<p class="lead">${e(p)}</p>` : `<p>${e(p)}</p>`)).join('')
  : `<p class="lead">${e(O.titre)}</p><p><span class="a-completer">${tr('Texte de présentation à compléter avec Laure Polin.', 'Description to be completed with Laure Polin.')}</span></p>`;
const t = `${O.technique.join(' ')} ${O.description.join(' ')} ${O.series.join(' ')}`.toLowerCase();
const MAT = [
  ['ardoise', tr('Ardoise', 'Slate'), 'g-ardoise-relief-16x9', tr('Taillée directement dans la pierre.', 'Carved directly in the stone.')],
  ['bronze', 'Bronze', 'g-bronze-patine-1x1', tr('Fonte d’après un modèle en plâtre.', 'Cast from a plaster model.')],
  ['cuivre', tr('Cuivre', 'Copper'), 'g-cuivre-etain-1x1', /socle cuivre|socle en cuivre/.test(t) ? tr('Le socle.', 'The base.') : ''],
  ['étain', tr('Étain', 'Pewter'), 'g-cuivre-etain-1x1', /incrustation d'étain|incrustation d’étain/.test(t) ? tr('Les incrustations.', 'The inlays.') : ''],
  ['pneu', tr('Pneu recyclé', 'Recycled tyre'), 'g-pneu-gomme-16x9', tr('Pneus et chambres à air récupérés.', 'Salvaged tyres and inner tubes.')],
];
const mats = MAT.filter(([k]) => t.includes(k));
$('[data-matieres]').innerHTML = mats.length ? `<h3 style="font-size:1.6rem;margin-bottom:6px">${tr('Les matières', 'Materials')}</h3>` + mats.map(([, nom, img, txt]) => `
  <div class="pastille-matiere"><span class="ech" style="background-image:url('assets/img/ambiance/${img}.webp')" aria-hidden="true"></span><div><strong style="font-family:var(--f-display);font-size:1.3rem;font-weight:500">${nom}</strong>${txt ? `<br><span class="petit">${txt}</span>` : ''}</div></div>`).join('') : '';
if (!calme && mats.length) {
  gsap.from('.pastille-matiere', { x: 40, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '[data-matieres]', start: 'top 80%', once: true } });
  gsap.from('.pastille-matiere .ech', { rotation: -90, scale: 0.6, stagger: 0.12, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: '[data-matieres]', start: 'top 80%', once: true } });
}

/* ---------- voir a l'echelle (sur une console ou au sol, a cote d'une silhouette de 1,70 m) ---------- */
const SILHOUETTE = '<svg viewBox="0 0 60 170" aria-hidden="true"><path d="M30 2c6 0 10 5 10 11s-4 12-10 12-10-6-10-12S24 2 30 2zm-11 27h22c6 0 10 5 11 11l5 42c.4 3-2 5-4.5 5s-4-2-4.3-4.5L44 50l-1 40 2 76c0 2.5-2 4-4.5 4s-4.3-1.6-4.5-4L31 98h-2l-5 68c-.2 2.4-2 4-4.5 4s-4.5-1.5-4.5-4l2-76-1-40-4.2 32.5c-.3 2.5-2 4.5-4.3 4.5S2.6 85 3 82l5-42c1-6 5-11 11-11z"/></svg>';
const echelle = $('[data-echelle]');
if (!ECHELLE) {
  echelle.remove();
} else {
  const h = O.dimensions.h;
  const murale = /murale/i.test(O.technique.join(' ') + (O.dimensions.note || ''));
  const modes = murale ? [['mur', tr('Au mur', 'On the wall')]] : [['console', tr('Sur une console', 'On a console')], ['sol', tr('Au sol', 'On the floor')]];
  let mode = murale ? 'mur' : h > 90 ? 'sol' : 'console';
  const sc = $('[data-scene-echelle]');
  sc.insertAdjacentHTML('beforeend', `
    <div class="sol"></div>
    <div class="elem silhouette">${SILHOUETTE}</div>
    <div class="elem console"></div>
    <div class="elem elem-oeuvre"><img src="${LP.src(O.detoure, 600)}" alt="${e(tr(`${O.titre} à l’échelle`, `${O.titre} to scale`))}"></div>
    <div class="cote"><i></i><span class="chiffres"></span></div>
    <div class="cote cote-humain"><i></i><span class="chiffres">170 cm</span></div>`);
  $('[data-modes]').innerHTML = modes.length > 1 ? modes.map(([k, l]) => `<button class="filtre" type="button" data-mode="${k}" aria-pressed="${k === mode}">${l}</button>`).join('') : '';
  $('[data-echelle-note]').textContent = tr(`Hauteur indiquée par l’artiste : ${nb(h)} cm${O.dimensions.note ? ` (${O.dimensions.note})` : ''}.`, `Height given by the artist: ${nb(h)} cm${O.dimensions.note_en ? ` (${O.dimensions.note_en})` : ''}.`);
  const ratio = O.detoure.w / O.detoure.h;
  const placer = () => {
    const W = sc.clientWidth; const H = sc.clientHeight;
    const sil = $('.silhouette', sc); const con = $('.console', sc); const oe = $('.elem-oeuvre', sc);
    const coteO = $('.cote:not(.cote-humain)', sc); const coteH = $('.cote-humain', sc);
    const consH = mode === 'console' ? 80 : 0;
    const sommet = murale ? 150 + h / 2 : consH + h;
    const span = Math.max(185, sommet + 12);
    const solY = H * 0.06;
    const largeurObjet = Math.max(140, h * ratio);
    const k = Math.min((H * 0.9) / span, (W - 90) / (60 + 40 + largeurObjet));
    if (innerWidth < 861) {
      const besoin = Math.round((span * k) / 0.9 + 12);
      if (Math.abs(sc.clientHeight - besoin) > 4) { sc.style.height = `${Math.max(260, besoin)}px`; }
    }
    const baseY = murale ? solY + (150 - h / 2) * k : solY + consH * k;
    const groupe = (60 + 40 + largeurObjet) * k;
    const x0 = (W - groupe) / 2 + 30;
    const silX = x0;
    const xO = x0 + 100 * k + (largeurObjet * k) / 2;
    const hO = h * k; const wO = hO * ratio;
    const d = calme ? 0 : 0.9;
    gsap.to(oe, { left: xO - wO / 2, bottom: baseY, height: hO, duration: d, ease: 'power3.inOut' });
    gsap.to(sil, { left: silX, bottom: solY, height: 170 * k, opacity: 1, duration: d, ease: 'power3.inOut' });
    gsap.to(con, { left: xO - 70 * k, bottom: solY, height: mode === 'console' ? 80 * k : 0, width: 140 * k, opacity: mode === 'console' ? 1 : 0, duration: d, ease: 'power3.inOut' });
    $('.sol', sc).style.bottom = `${solY}px`;
    gsap.to(coteO, { left: xO + wO / 2 + 18, bottom: baseY, height: hO, duration: d, ease: 'power3.inOut' });
    $('span', coteO).textContent = `${nb(h)} cm`;
    gsap.to(coteH, { left: Math.max(2, silX - 62), bottom: solY, height: 170 * k, duration: d, ease: 'power3.inOut' });
  };
  $$('[data-mode]').forEach((b) => b.addEventListener('click', () => {
    mode = b.dataset.mode;
    $$('[data-mode]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    placer();
  }));
  new ResizeObserver(() => requestAnimationFrame(placer)).observe(sc); // hors du cycle du ResizeObserver : placer() change la hauteur observée
  ScrollTrigger.create({ trigger: sc, start: 'top 75%', once: true, onEnter: placer });
}

/* ---------- voisines ---------- */
const voisines = LP.serie(serie).filter((x) => x.id !== O.id).slice(0, 12);
$('[data-titre-voisines]').textContent = tr(`Dans la salle ${LP.NOMS_SERIES[serie] || ''}`, `In the ${LP.NOMS_SERIES[serie] || ''} room`).trim();
$('[data-lien-salle]').href = `salle.html?s=${serie}`;
$('[data-voisines]').innerHTML = voisines.map((x) => carteOeuvre(x, { hauteurPx: 280, sizes: '240px' })).join('');
$$('[data-voisines] .oeuvre-carte').forEach((c) => { c.style.width = '240px'; });
if (!voisines.length) $('.voisines').remove();

$$('main [data-clive]').forEach((el) => { if (el.id !== 'titre-oeuvre') LP.cliver(el, { strates: 4, ecart: 70 }); });
LP.majBoutonsPanier();
LP.aimants();
ScrollTrigger.refresh();
document.documentElement.classList.remove('attente');
