/* Salle d'exposition : une serie, en defilement horizontal ou en grille, avec filtres. */
import LP, { demarrer } from './base.js?v=20261028';
import { fondArdoise } from './ardoise-gl.js?v=20261028';
import { carteOeuvre, imgOeuvre, teinteSombre } from './cartes.js?v=20261028';

demarrer();
const { gsap, ScrollTrigger, calme, tr } = LP;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const bureau = () => !LP.etroit();

const SALLES = {
  ardoise: {
    nom: LP.NOMS_SERIES.ardoise, fond: 'g-carriere-ardoise-16x9', fondMobile: 'g-carriere-ardoise-9x16', couleur: '#8fa3b5',
    intro: tr("Taille directe dans l’ardoise, parfois de Trélazé : la pierre est polie, cirée, quelquefois patinée ou rehaussée à la cire dorée, puis posée sur un socle de bois, d’ardoise, de marbre ou de métal.",
      'Direct carving in slate, sometimes from Trélazé: the stone is polished and waxed, sometimes patinated or highlighted with gold wax, then set on a base of wood, slate, marble or metal.'),
    citation: tr("Lorsque je sculpte, que ce soit en taille directe sur l’ardoise ou en plâtre pour donner naissance aux bronzes, je ne cherche pas à illustrer une forme préétablie. Je construis une forme qui me fait reconnaître le sentiment que je porte.",
      'When I sculpt, whether carving slate directly or working in plaster to give birth to the bronzes, I am not trying to illustrate a predetermined form. I build a form that lets me recognise the feeling I carry.'),
    imgCitation: 'oeuvres/transmettre-au-monde-1/transmettre-au-monde-1-02', altCitation: tr('Détail du visage taillé dans Transmettre au monde, ardoise.', 'Detail of the face carved in Transmettre au monde, slate.'),
  },
  bronze: {
    nom: LP.NOMS_SERIES.bronze, fond: 'g-bronze-fusion-16x9', couleur: '#c4874a',
    intro: tr('Façonnées en plâtre puis fondues par les fonderies Chapon et Avangini, le plus souvent en tirages numérotés. Certaines pièces associent le bronze au pneu, au cuivre ou au ciment pigmenté.',
      'Modelled in plaster, then cast by the Chapon and Avangini foundries, most often in numbered editions. Some pieces combine bronze with tyre, copper or pigmented cement.'),
    citation: tr("Lorsque je sculpte, que ce soit en taille directe sur l’ardoise ou en plâtre pour donner naissance aux bronzes, je ne cherche pas à illustrer une forme préétablie.",
      'When I sculpt, whether carving slate directly or working in plaster to give birth to the bronzes, I am not trying to illustrate a predetermined form.'),
    imgCitation: 'oeuvres/la-danse/la-danse-01', altCitation: tr('La danse, bronze de Laure Polin, photographiée à l’atelier.', 'La danse, bronze by Laure Polin, photographed in the studio.'),
  },
  pneu: {
    nom: LP.NOMS_SERIES.pneu, fond: 'g-pneu-gomme-16x9', couleur: '#9aa1a8',
    intro: tr('Pneus et chambres à air recyclés, découpés puis assemblés, parfois avec une pièce d’ardoise ou de bronze.',
      'Recycled tyres and inner tubes, cut and then assembled, sometimes with a piece of slate or bronze.'),
    citation: tr('Je taille, je ponce, je bouscule la matière, alors quelque chose survient ; un détail infime parfois, comme un écho ou au contraire comme un appel.',
      'I carve, I sand, I shake up the material, and then something happens; sometimes a tiny detail, like an echo or, on the contrary, like a call.'),
    imgCitation: 'oeuvres/premices-d-ouragan/premices-d-ouragan-02', altCitation: tr('Détail de Prémices d’ouragan : bandes de pneu recyclé et fragment d’ardoise.', 'Detail of Prémices d’ouragan: strips of recycled tyre and a fragment of slate.'),
  },
  'petits-formats': {
    nom: LP.NOMS_SERIES['petits-formats'], fond: 'g-ardoise-relief-16x9', fondMobile: 'g-ardoise-relief-9x16', couleur: '#a7b8c7',
    intro: tr('Des ardoises de 20 à 40 cm, sur socle de bois, de marbre ou de plexiglas.', 'Slate pieces from 20 to 40 cm, on bases of wood, marble or Plexiglas.'),
    citation: tr('Dans les courbes et les déliés naissent des visages, des corps, des sensations, des mouvements, des rythmes.', 'In the curves and flowing lines, faces, bodies, sensations, movements and rhythms are born.'),
    imgCitation: 'oeuvres/introspection/introspection-02', altCitation: tr('Détail d’Introspection : un visage affleure dans l’ardoise.', 'Detail of Introspection: a face surfaces in the slate.'),
  },
  collection: {
    nom: LP.NOMS_SERIES.collection, fond: 'g-salle-socles-16x9', couleur: '#8a929b',
    intro: tr('Ces œuvres ont rejoint des collections particulières. Elles restent visibles ici ; certaines existent en d’autres tirages, renseignez-vous auprès de Laure Polin.',
      'These works have joined private collections. They remain on view here; some exist in other casts, so ask Laure Polin.'),
    citation: tr('La sculpture me conduit dans des territoires de recherche, sans a priori, où je vais trouver le chemin qui va matérialiser ce flux qui me traverse en modelant la matière.',
      'Sculpture leads me into territories of exploration, without preconceptions, where I find the path that will give material form to the flow running through me as I model the material.'),
    imgCitation: 'site/laure-polin-exposition', altCitation: tr('Laure Polin parmi ses sculptures.', 'Laure Polin among her sculptures.'),
  },
};

const q = new URLSearchParams(location.search);
const cle = SALLES[q.get('s')] ? q.get('s') : 'ardoise';
const S = SALLES[cle];
const OEUVRES = LP.serie(cle);
document.title = tr(`Salle ${S.nom} — Laure Polin, sculptures`, `${S.nom} room — Laure Polin, sculptures`);
document.querySelector('meta[name="description"]')?.setAttribute('content', tr(`${S.nom} : ${OEUVRES.length} sculptures de Laure Polin. ${S.intro}`, `${S.nom}: ${OEUVRES.length} sculptures by Laure Polin. ${S.intro}`));

/* ---------- entree ---------- */
const fondImg = $('[data-fond-salle]');
fondImg.src = `assets/img/ambiance/${innerWidth < innerHeight && S.fondMobile ? S.fondMobile : S.fond}.webp`;
$('[data-fil-salle]').textContent = S.nom;
$('[data-titre-salle]').textContent = S.nom;
$('[data-compte-salle]').textContent = OEUVRES.length;
$('[data-compte-salle] + small').textContent = OEUVRES.length > 1 ? tr('œuvres dans la salle', 'works in the room') : tr('œuvre dans la salle', 'work in the room');
let intro = S.intro;
if (cle === 'petits-formats') {
  const min = Math.min(...OEUVRES.filter((x) => x.statut === 'disponible' && x.prix).map((x) => x.prix));
  intro += tr(` À partir de ${LP.prix(min)}.`, ` From ${LP.prix(min)}.`);
}
$('[data-intro-salle]').textContent = intro;
$('[data-citation]').textContent = tr(`« ${S.citation} »`, `“${S.citation}”`);
const ic = $('[data-image-citation]');
ic.src = `assets/img/${S.imgCitation}-800.webp`;
ic.alt = S.altCitation || '';
ic.removeAttribute('width'); ic.removeAttribute('height');
if (cle === 'collection') $$('.filtre[data-f="dispo"], .filtre[data-f="prix"], .filtres .sep').forEach((b) => { b.hidden = true; });

const titre = $('[data-titre-salle]');
const tlTitre = LP.cliver(titre, { strates: 6, ecart: 200, declencheur: false, duree: 1.6 });
if (!calme) {
  gsap.set(['.salle-entree .bas > *', '.fil'], { opacity: 0, y: 20 });
  gsap.from(fondImg, { scale: 1.2, duration: 2.6, ease: 'expo.out' });
  gsap.to(fondImg, { yPercent: 12, ease: 'none', scrollTrigger: { trigger: '.salle-entree', start: 'top top', end: 'bottom top', scrub: true } });
}
LP.pret.then(() => {
  if (calme) return;
  tlTitre && tlTitre.play();
  gsap.to(['.fil', '.salle-entree .bas > *'], { opacity: 1, y: 0, duration: 1, stagger: 0.12, delay: 0.5, ease: 'power3.out' });
  // compteur qui defile
  const n = { v: 0 };
  gsap.to(n, { v: OEUVRES.length, duration: 1.6, delay: 0.6, ease: 'power2.out', onUpdate: () => { $('[data-compte-salle]').textContent = Math.round(n.v); } });
});
if (!calme) {
  gsap.from('.taille-directe figure img', { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut', scrollTrigger: { trigger: '.taille-directe', start: 'top 75%', once: true } });
  gsap.from('.taille-directe .citation', { opacity: 0, y: 30, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: '.taille-directe', start: 'top 70%', once: true } });
}

/* ---------- filtres ---------- */
const etat = { dispo: false, taille: null, prix: null, vue: cle === 'collection' ? 'grille' : (memo('vue') || (bureau() ? 'salle' : 'grille')) };
function memo(k, v) { const m = LP.memo.lire('lp-salle', {}); if (v === undefined) return m[k]; m[k] = v; LP.memo.ecrire('lp-salle', m); return v; }
const filtrer = () => OEUVRES.filter((o) => {
  if (etat.dispo && o.statut !== 'disponible') return false;
  const h = o.dimensions?.h;
  if (etat.taille === 'petite' && !(h && h < 30)) return false;
  if (etat.taille === 'moyenne' && !(h && h >= 30 && h <= 60)) return false;
  if (etat.taille === 'grande' && !(h && h > 60)) return false;
  const p = o.prix || 0;
  if (etat.prix === '1' && !(p && p < 500)) return false;
  if (etat.prix === '2' && !(p >= 500 && p <= 1000)) return false;
  if (etat.prix === '3' && !(p > 1000)) return false;
  return true;
});
$$('[data-filtres] .filtre').forEach((b) => b.addEventListener('click', () => {
  const f = b.dataset.f;
  if (f === 'dispo') etat.dispo = !etat.dispo;
  else etat[f] = etat[f] === b.dataset.v ? null : b.dataset.v;
  $$('[data-filtres] .filtre').forEach((x) => {
    const on = x.dataset.f === 'dispo' ? etat.dispo : etat[x.dataset.f] === x.dataset.v;
    x.setAttribute('aria-pressed', String(on));
  });
  rendre(true);
}));
$$('[data-vue]').forEach((b) => b.addEventListener('click', () => {
  etat.vue = b.dataset.vue; memo('vue', etat.vue);
  rendre(true);
}));

/* ---------- rendu ---------- */
const zone = $('[data-salle-zone]');
let fond = null; let st = null;
function nettoyer() {
  if (st) { st.kill(true); st = null; }
  ScrollTrigger.getAll().filter((t) => t.vars.containerAnimation).forEach((t) => t.kill());
  if (fond) { fond.detruire(); fond = null; }
  zone.innerHTML = '';
  zone.className = 'salle-zone';
  zone.style.removeProperty('--teinte');
}
function rendre(defiler = false) {
  const liste = filtrer();
  $$('[data-vue]').forEach((x) => x.setAttribute('aria-pressed', String(x.dataset.vue === etat.vue)));
  $('[data-nb-affiche]').textContent = LP.oeuvresTxt(liste.length);
  nettoyer();
  if (!liste.length) {
    zone.innerHTML = `<div class="vide-filtres"><p class="lead">${tr('Aucune œuvre ne correspond à ces filtres.', 'No work matches these filters.')}</p><button class="bouton" type="button" data-raz><span>${tr('Afficher toute la salle', 'Show the whole room')}</span></button></div>`;
    $('[data-raz]', zone).addEventListener('click', () => { etat.dispo = false; etat.taille = null; etat.prix = null; $$('[data-filtres] .filtre').forEach((x) => x.setAttribute('aria-pressed', 'false')); rendre(); });
  } else if (etat.vue === 'salle') salleHorizontale(liste);
  else grille(liste);
  LP.majBoutonsPanier(zone);
  LP.aimants(zone);
  ScrollTrigger.refresh();
  if (defiler) {
    const y = $('.barre-filtres').getBoundingClientRect().top + scrollY + 1;
    if (LP.lenis) LP.lenis.scrollTo(y, { duration: 0.8 }); else scrollTo(0, y);
  }
}

function hauteurs(liste, H) {
  const hMax = Math.max(...liste.map((x) => x.dimensions?.h || 40));
  return liste.map((x) => Math.round(H * (0.42 + 0.58 * Math.pow((x.dimensions?.h || 40) / hMax, 0.65))));
}

function salleHorizontale(liste) {
  zone.classList.add('salle-h');
  zone.innerHTML = `<div class="piste-scroll"><div class="piste-h" data-piste></div></div>`;
  const piste = $('[data-piste]', zone);
  const H = bureau() ? Math.max(260, Math.min(600, innerHeight - 260)) : Math.min(innerHeight * 0.5, 440);
  const hs = hauteurs(liste, H);
  piste.innerHTML = liste.map((o, i) => carteOeuvre(o, { hauteurPx: hs[i] })).join('') +
    `<div class="fin"><p class="lead">${tr(`Fin de la salle ${LP.esc(S.nom)}.`, `End of the ${LP.esc(S.nom)} room.`)}</p><a class="bouton" href="#titre-autres"><span>${tr('Voir les autres salles', 'See the other rooms')}</span></a></div>`;
  const cartes = $$('.oeuvre-carte', piste);
  const teinter = (c) => {
    if (!c) return;
    zone.style.setProperty('--teinte', teinteSombre(c.dataset.couleur, 0.32));
    fond?.teinter(c.dataset.couleur, 0.4);
  };
  if (bureau() && !calme) {
    zone.style.height = '100svh';
    zone.style.display = 'flex';
    zone.style.flexDirection = 'column';
    $('.piste-scroll', zone).style.cssText = 'flex:1;display:flex;min-height:0';
    piste.style.cssText = 'height:100%;padding-top:80px;padding-bottom:104px';
    if (LP.gl) fond = fondArdoise(zone, { teinte: 0.3 });
    if (fond) zone.style.background = 'transparent';
    const distance = () => piste.scrollWidth - innerWidth;
    const tw = gsap.to(piste, { x: () => -distance(), ease: 'none' });
    zone.insertAdjacentHTML('beforeend', `<div class="hud-salle" aria-hidden="false">
      <button class="outil" type="button" data-hud="-1" aria-label="${tr('Œuvre précédente', 'Previous work')}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg></button>
      <p><span class="chiffres" data-hud-n>1 / ${cartes.length}</span><span data-hud-t></span></p>
      <button class="outil" type="button" data-hud="1" aria-label="${tr('Œuvre suivante', 'Next work')}"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.4" fill="none"/></svg></button>
      <span class="hud-barre" aria-hidden="true"><i data-hud-barre></i></span></div>`);
    const hudN = $('[data-hud-n]', zone); const hudT = $('[data-hud-t]', zone); const hudB = $('[data-hud-barre]', zone);
    const majHud = (c) => { const k = cartes.indexOf(c); hudN.textContent = `${k + 1} / ${cartes.length}`; hudT.textContent = LP.parId[c.dataset.id]?.titre || ''; };
    st = ScrollTrigger.create({
      trigger: zone, start: 'top top', end: () => `+=${Math.max(distance(), 10)}`, pin: true, scrub: 0.6, animation: tw, invalidateOnRefresh: true, anticipatePin: 1,
      onUpdate: (self) => {
        hudB.style.transform = `scaleX(${self.progress})`;
        const mid = innerWidth / 2; let best = null; let bd = 1e9;
        cartes.forEach((c) => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
        if (best && best !== zone._active) { zone._active = best; teinter(best); majHud(best); }
      },
    });
    majHud(cartes[0]);
    const allerA = (c) => {
      const centre = c.offsetLeft + c.offsetWidth / 2 - innerWidth / 2;
      const p = Math.max(0, Math.min(1, centre / Math.max(1, distance())));
      const y = st.start + (st.end - st.start) * p;
      if (LP.lenis) LP.lenis.scrollTo(y, { duration: 1.1 }); else scrollTo(0, y);
    };
    $$('[data-hud]', zone).forEach((b) => b.addEventListener('click', () => {
      const k = Math.max(0, cartes.indexOf(zone._active || cartes[0]));
      allerA(cartes[Math.max(0, Math.min(cartes.length - 1, k + parseInt(b.dataset.hud, 10)))]);
    }));
    // clavier : une oeuvre recoit le focus, la salle la centre
    cartes.forEach((c) => c.addEventListener('focusin', () => { if (zone._active !== c) allerA(c); }));
    cartes.forEach((c) => {
      gsap.fromTo($('img, .oeuvre-absente', c), { y: 70, opacity: 0.15 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 96%', end: 'left 60%', scrub: true } });
      gsap.fromTo($('.cartel', c), { opacity: 0, y: 14 }, { opacity: 1, y: 0, ease: 'none', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 85%', end: 'left 65%', scrub: true } });
    });
    teinter(cartes[0]);
  } else {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) teinter(en.target); }), { root: $('.piste-scroll', zone), threshold: 0.6 });
    cartes.forEach((c) => io.observe(c));
    teinter(cartes[0]);
  }
}

function grille(liste) {
  zone.innerHTML = `<div class="grille-oeuvres" data-grille></div>`;
  const g = $('[data-grille]', zone);
  g.innerHTML = liste.map((o) => carteOeuvre(o, { hauteurPx: 300, sizes: '(max-width: 600px) 80vw, 280px' })).join('');
  $$('.oeuvre-carte', g).forEach((c) => { c.style.width = '100%'; });
  if (!calme) gsap.from($$('.oeuvre-carte', g), { y: 50, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: { each: 0.05, grid: 'auto' }, scrollTrigger: { trigger: g, start: 'top 85%', once: true } });
}

/* ---------- autres salles ---------- */
const VEDETTES = { ardoise: 'a-contre-courant', bronze: 'la-danse', pneu: 'paix-en-tension', 'petits-formats': 'profil', collection: 'energies' };
$('[data-autres]').innerHTML = Object.keys(SALLES).filter((k) => k !== cle).slice(0, 3).map((k) => {
  const v = LP.parId[VEDETTES[k]];
  return `<a class="carte-salle" href="salle.html?s=${k}" data-tilt>
    <div class="fond-image" aria-hidden="true"><img src="assets/img/ambiance/${SALLES[k].fond}.webp" alt="" loading="lazy"></div>
    ${v ? imgOeuvre(v, { sizes: '20vw' }) : ''}
    <h3>${SALLES[k].nom}</h3><span class="mini">${LP.oeuvresTxt(LP.serie(k).length)}</span></a>`;
}).join('');
$$('.autres-salles [data-clive]').forEach((t) => LP.cliver(t, { strates: 4, ecart: 70 }));
LP.inclinaison();

const lancer = () => rendre(false);
if (document.fonts && document.fonts.ready) document.fonts.ready.then(lancer); else lancer();
document.documentElement.classList.remove('attente');
