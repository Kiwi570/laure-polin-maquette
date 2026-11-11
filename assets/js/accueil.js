/* Accueil */
import LP, { demarrer } from './base.js?v=20261103-1';
import { fondArdoise } from './ardoise-gl.js?v=20261103-1';
import { poussiere } from './poussiere.js?v=20261103-1';
import { FRANCE, PLAN } from './formes.js?v=20261103-1';
import { imgOeuvre, cartelHTML, carteOeuvre, vignette, teinteSombre, monterFormulaire } from './cartes.js?v=20261103-1';

demarrer();
const { gsap, ScrollTrigger, calme, tr } = LP;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const bureau = () => !LP.etroit();
const o = (id) => LP.parId[id];

/* ---------------- compteurs reels ---------------- */
// (la collection privee n'affiche volontairement aucun nombre d'oeuvres)
$$('[data-compte-serie]').forEach((el) => { el.textContent = LP.serie(el.dataset.compteSerie).length; });
const livre = o('dialogues-sculptes');
if (livre) $('[data-prix-livre]').textContent = LP.prix(livre.prix);
{
  const b = $('[data-ajout="dialogues-sculptes"]');
  b.dataset.libelle = tr('Ajouter au panier', 'Add to basket');
  $('span', b).textContent = b.dataset.libelle;
}

/* ---------------- hero : une oeuvre apres l'autre, en vraie photo ---------------- */
const HEROS = ['harmonie', 'la-danse-du-voile', 'a-contre-courant', 'le-coeur-de-l-arene', 'le-cirque', 'racines-d-asphalte', 'megaptere'].map(o).filter((x) => x && LP.visuel(x));
const cadre = $('[data-hero-cadre]');
const cartelHero = $('[data-hero-cartel]');
const pointsHero = $('[data-hero-points]');
const heroSec = $('#hero');
const voirFiche = (x) => tr(`${LP.esc(x.titre)}, voir la fiche`, `${LP.esc(x.titre)}, view the work`);
// la premiere diapo est ecrite dans la page (affichage immediat), les suivantes sont ajoutees ici
HEROS.slice(1).forEach((x) => {
  cadre.insertAdjacentHTML('beforeend', `<a class="hero-diapo" href="${LP.lienOeuvre(x)}" aria-label="${voirFiche(x)}" tabindex="-1" aria-hidden="true">${imgOeuvre(x, { sizes: '(max-width: 860px) 70vw, 34vw' })}</a>`);
});
cadre.insertAdjacentHTML('beforeend', '<span class="hero-fente" aria-hidden="true"></span>');
const diapos = $$('.hero-diapo', cadre);
const ratioDe = (x) => { const v = LP.visuel(x); return v.w / v.h; };
const fondDe = (x) => LP.visuel(x).fond || '#d9d9d9';
const heroImg = $('img', diapos[0]);
cartelHero.innerHTML = cartelHTML(HEROS[0], { etat: false });
const heroZone = $('[data-hero-oeuvre]');
gsap.set(heroZone, { '--ratio': ratioDe(HEROS[0]), '--fond-cadre': fondDe(HEROS[0]) });
pointsHero.innerHTML = `<button class="hero-pause" type="button" data-hero-pause aria-pressed="false" aria-label="${tr('Mettre le diaporama en pause', 'Pause the slideshow')}"><svg viewBox="0 0 16 16" aria-hidden="true"><path class="p" d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="1.6"/><path class="l" d="M5 3l8 5-8 5z" fill="currentColor"/></svg></button>`
  + HEROS.map((x, i) => `<button class="hero-point" type="button" aria-label="${tr(`Œuvre ${i + 1} sur ${HEROS.length} : ${LP.esc(x.titre)}`, `Work ${i + 1} of ${HEROS.length}: ${LP.esc(x.titre)}`)}" aria-current="${i === 0}"><i></i></button>`).join('');
const boutonsPoints = $$('.hero-point', pointsHero);
const btnPause = $('[data-hero-pause]', pointsHero);

let fond = null;
if (LP.gl) {
  fond = fondArdoise(heroSec, { imageMobile: 'assets/img/ambiance/g-ardoise-relief-9x16.webp' });
  if (fond) $('.gl-repli', heroSec).style.display = 'none';
}
const titres = $$('.hero-titre [data-clive]');
const tlClive = titres.map((t, i) => LP.cliver(t, { strates: 5, ecart: 160, declencheur: false, delai: i * 0.12, duree: 1.7 }));
if (!calme) {
  gsap.set(heroImg, { opacity: 0 });
  gsap.set(['.hero-texte > *', '.hero-pied', '.indice'], { opacity: 0, y: 20 });
  // le cadre part de l'ardoise : pas d'aplat clair avant que la photo se recompose
  gsap.set(heroZone, { '--fond-cadre': teinteSombre(fondDe(HEROS[0]), 0.12) });
}

/* diaporama : chaque oeuvre reste pleinement visible 4 secondes, puis un fondu-glisse de 1,1 s amene la suivante
   (cycle complet d'environ 5 s, contre 7,3 s auparavant).
   Commandes : pause au survol et au focus, bouton pause, points cliquables, fleches du clavier, balayage au doigt.
   Reglage « reduire les animations » : le diaporama ne defile pas seul (bouton lecture disponible), simple fondu. */
const DUREE = 4;
const TRANSITION = 1.1;
let actif = 0; let enCours = false; let minuteur = null; let pauseManuelle = calme; let survol = false; let visible = true;
const charger = (img) => {
  if (!img) return Promise.resolve();
  if (img.loading === 'lazy') img.loading = 'eager';
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return new Promise((ok) => { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); setTimeout(ok, 2500); });
};
const majPoints = () => boutonsPoints.forEach((b, k) => { b.setAttribute('aria-current', String(k === actif)); gsap.set($('i', b), { scaleX: k < actif ? 1 : 0 }); });
function lancerMinuteur() {
  if (minuteur) minuteur.kill();
  const barre = $('i', boutonsPoints[actif]);
  minuteur = gsap.fromTo(barre, { scaleX: 0 }, { scaleX: 1, duration: DUREE, ease: 'none', onComplete: () => aller((actif + 1) % HEROS.length) });
  if (pauseManuelle || survol || !visible || document.hidden) minuteur.pause();
}
const reprendre = () => { if (minuteur && !pauseManuelle && !survol && visible && !enCours && !document.hidden) minuteur.resume(); };
const suspendre = () => { if (minuteur) minuteur.pause(); };
async function aller(n) {
  if (n === actif || enCours) return;
  enCours = true; suspendre();
  const ancien = diapos[actif]; const nouveau = diapos[n]; const x = HEROS[n];
  const img = $('img', nouveau);
  await charger(img);
  charger($('img', diapos[(n + 1) % diapos.length]));
  actif = n; majPoints();
  nouveau.classList.add('est-active');
  nouveau.removeAttribute('aria-hidden'); nouveau.removeAttribute('tabindex');
  ancien.setAttribute('aria-hidden', 'true'); ancien.setAttribute('tabindex', '-1');
  gsap.set(nouveau, { zIndex: 2 }); gsap.set(ancien, { zIndex: 1 });
  const fini = () => {
    ancien.classList.remove('est-active');
    gsap.set(ancien, { zIndex: 0, clearProps: 'clipPath,opacity' }); gsap.set($('img', ancien), { clearProps: 'transform,opacity' });
    enCours = false; lancerMinuteur();
  };
  const nouveauCartel = cartelHTML(x, { etat: false });
  if (calme) {
    gsap.set(heroZone, { '--ratio': ratioDe(x), '--fond-cadre': fondDe(x) });
    cartelHero.innerHTML = nouveauCartel;
    gsap.fromTo(nouveau, { opacity: 0 }, { opacity: 1, duration: 0.6, onComplete: () => { gsap.set(nouveau, { clearProps: 'opacity' }); fini(); } });
    return;
  }
  // la nouvelle photo monte comme une feuille d'ardoise qu'on degage, le cadre prend ses proportions
  const fente = $('.hero-fente', cadre);
  const T = TRANSITION;
  gsap.timeline({ onComplete: fini })
    .to(heroZone, { '--ratio': ratioDe(x), '--fond-cadre': fondDe(x), duration: T, ease: 'expo.inOut' }, 0)
    .fromTo(nouveau, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: T, ease: 'expo.inOut' }, 0)
    .fromTo(img, { scale: 1.1, yPercent: 4 }, { scale: 1, yPercent: 0, duration: T + 0.3, ease: 'expo.out' }, 0.12)
    .to($('img', ancien), { scale: 0.95, opacity: 0.35, duration: T, ease: 'expo.inOut' }, 0)
    .fromTo(fente, { top: '100%', opacity: 0 }, { top: '0%', opacity: 1, duration: T, ease: 'expo.inOut' }, 0)
    .to(fente, { opacity: 0, duration: 0.3 }, T - 0.25)
    .to(cartelHero, { opacity: 0, y: -8, duration: 0.3, ease: 'power2.in' }, 0)
    .add(() => { cartelHero.innerHTML = nouveauCartel; }, 0.35)
    .fromTo(cartelHero, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0.45);
}
const suivante = (sens) => aller((actif + sens + HEROS.length) % HEROS.length);
boutonsPoints.forEach((b, k) => b.addEventListener('click', () => aller(k)));
// clavier : fleches gauche et droite depuis les commandes du diaporama
pointsHero.addEventListener('keydown', (ev) => {
  if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
  ev.preventDefault();
  const n = (actif + (ev.key === 'ArrowRight' ? 1 : -1) + HEROS.length) % HEROS.length;
  aller(n); boutonsPoints[n].focus();
});
// toucher : un balayage horizontal sur la photo passe a l'oeuvre suivante ou precedente (sans ouvrir la fiche)
{
  let x0 = null; let y0 = null; let balaye = false;
  cadre.addEventListener('pointerdown', (ev) => { if (ev.pointerType === 'mouse') return; x0 = ev.clientX; y0 = ev.clientY; balaye = false; });
  cadre.addEventListener('pointercancel', () => { x0 = null; });
  cadre.addEventListener('pointerup', (ev) => {
    if (x0 === null) return;
    const dx = ev.clientX - x0; const dy = ev.clientY - y0; x0 = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.3) { balaye = true; suivante(dx < 0 ? 1 : -1); }
  });
  cadre.addEventListener('click', (ev) => { if (balaye) { ev.preventDefault(); ev.stopPropagation(); balaye = false; } }, true);
}
const majPause = () => {
  btnPause.setAttribute('aria-pressed', String(pauseManuelle));
  btnPause.setAttribute('aria-label', pauseManuelle ? tr('Lancer le diaporama', 'Play the slideshow') : tr('Mettre le diaporama en pause', 'Pause the slideshow'));
};
majPause();
btnPause.addEventListener('click', () => {
  pauseManuelle = !pauseManuelle;
  majPause();
  if (pauseManuelle) suspendre(); else reprendre();
});
if (LP.pointeurFin) {
  cadre.addEventListener('pointerenter', () => { survol = true; suspendre(); });
  cadre.addEventListener('pointerleave', () => { survol = false; reprendre(); });
}
cadre.addEventListener('focusin', () => { survol = true; suspendre(); });
cadre.addEventListener('focusout', () => { survol = false; reprendre(); });
new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) reprendre(); else suspendre(); }, { threshold: 0.25 }).observe(cadre);
document.addEventListener('visibilitychange', () => { if (document.hidden) suspendre(); else reprendre(); });

LP.pret.then(() => {
  if (calme) { lancerMinuteur(); return; }
  tlClive.forEach((t) => t && t.play());
  gsap.to(['.hero-texte > *', '.hero-pied', '.indice'], { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.6 });
  gsap.to(heroZone, { '--fond-cadre': fondDe(HEROS[0]), duration: 0.9, ease: 'power1.inOut', delay: LP.gl ? 1.3 : 0.3 });
  const entree = LP.gl ? poussiere(heroImg, heroZone, { duree: 2.1, depuis: 'gauche' }) : gsap.to(heroImg, { opacity: 1, duration: 1.2, delay: 0.3 });
  Promise.resolve(entree).then(() => { charger($('img', diapos[1])); lancerMinuteur(); });
  // parallaxe de sortie
  gsap.to('.hero-grille', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: heroSec, start: 'top top', end: 'bottom top', scrub: true } });
});

/* ---------------- manifeste ---------------- */
if (!calme) $$('[data-mots]').forEach((p) => {
  p.innerHTML = p.textContent.split(/(\s+)/).map((m) => (m.trim() ? `<span class="mot">${LP.esc(m)}</span>` : m)).join('');
});
if (!calme) {
  $$('[data-mots]').forEach((p) => {
    gsap.to($$('.mot', p), { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: p, start: 'top 82%', end: 'bottom 52%', scrub: true } });
  });
  gsap.to('[data-parallaxe]', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.manifeste', start: 'top bottom', end: 'bottom top', scrub: true } });
  // trois gestes, chacun son effet
  const taille = $('[data-geste="taille"]'); const ponce = $('[data-geste="ponce"]'); const bouscule = $('[data-geste="bouscule"]');
  taille.innerHTML = taille.textContent.split('').map((c) => `<span class="eclat">${c === ' ' ? '&nbsp;' : LP.esc(c)}</span>`).join('');
  const tlG = gsap.timeline({ scrollTrigger: { trigger: '.gestes', start: 'top 78%', once: true } });
  tlG.from($$('.eclat', taille), { opacity: 0, x: () => gsap.utils.random(-40, 40), y: () => gsap.utils.random(-30, 30), rotation: () => gsap.utils.random(-50, 50), duration: 0.9, ease: 'expo.out', stagger: 0.03 })
    .from(ponce, { opacity: 0, filter: 'blur(16px)', duration: 1.4, ease: 'power2.out' }, 0.35)
    .from(bouscule, { opacity: 0, duration: 0.2 }, 0.8)
    .to(bouscule, { keyframes: { x: [0, -9, 8, -6, 5, -2, 0], rotation: [0, -1.5, 1.2, -0.8, 0.5, 0] }, duration: 0.7, ease: 'none' }, 0.85);
}
$$('.geste').forEach((g) => g.removeAttribute('aria-hidden'));
$('.gestes').removeAttribute('aria-label');

/* ---------------- trois matieres ---------------- */
$$('[data-trio]').forEach((t) => {
  t.innerHTML = t.dataset.trio.split(',').map(o).filter(Boolean).map((x) => `
    <a href="${LP.lienOeuvre(x)}" data-carte>${imgOeuvre(x, { sizes: '(max-width: 860px) 30vw, 16vw' })}<span class="cartel"><strong>${LP.esc(x.titre)}</strong><span class="dims-l chiffres">${LP.esc(LP.dims(x).replace(/ \(.*\)$/, ''))}</span>${x.statut === 'disponible' && x.prix ? `<span class="prix chiffres">${LP.prix(x.prix)}</span>` : ''}</span></a>`).join('');
});

// coulee de bronze : le mot se remplit de metal en fusion qui se fige en patine
function construireCoulee(svg) {
  const NS = 'http://www.w3.org/2000/svg';
  svg.innerHTML = `
    <defs>
      <clipPath id="clip-bronze"><text x="0" y="0" class="mot-svg">Bronze</text></clipPath>
      <linearGradient id="g-fusion" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff1c9"/><stop offset=".25" stop-color="#ffb04a"/><stop offset=".6" stop-color="#d0631c"/><stop offset="1" stop-color="#6e2a0c"/>
      </linearGradient>
      <filter id="chaleur" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="8"/></filter>
    </defs>
    <text x="0" y="0" class="mot-svg contour">Bronze</text>
    <g clip-path="url(#clip-bronze)"><path class="niveau" fill="url(#g-fusion)" filter="url(#chaleur)"/></g>`;
  $$('text', svg).forEach((t) => { t.setAttribute('font-family', 'Cormorant Garamond'); t.setAttribute('font-weight', '300'); t.setAttribute('font-size', '200'); });
  const contour = $('.contour', svg);
  contour.setAttribute('fill', 'none'); contour.setAttribute('stroke', 'rgba(236,232,224,.35)'); contour.setAttribute('stroke-width', '1');
  const b = contour.getBBox();
  svg.setAttribute('viewBox', `${b.x - 4} ${b.y - 6} ${b.width + 8} ${b.height + 12}`);
  const niveau = $('.niveau', svg);
  const stops = $$('stop', svg);
  const etat = { p: calme ? 1 : 0, patine: calme ? 1 : 0 };
  const chaud = ['#fff1c9', '#ffb04a', '#d0631c', '#6e2a0c'];
  const froid = ['#c9a36b', '#9a6a3a', '#6d4a2c', '#4f6e60'];
  const mixe = (a, c, k) => { const A = a.match(/\w\w/g).map((x) => parseInt(x, 16)); const C = c.match(/\w\w/g).map((x) => parseInt(x, 16)); return `rgb(${A.map((v, i) => Math.round(v + (C[i] - v) * k)).join(',')})`; };
  const dessiner = (t = 0) => {
    const haut = b.y + b.height - (b.height + 20) * etat.p;
    const w = b.width + 20; const x0 = b.x - 10;
    let d = `M${x0},${haut}`;
    for (let i = 0; i <= 24; i++) { const x = x0 + (w * i) / 24; d += ` L${x.toFixed(1)},${(haut + Math.sin(i * 0.9 + t * 3) * 5 * (1 - etat.patine)).toFixed(1)}`; }
    d += ` L${x0 + w},${b.y + b.height + 20} L${x0},${b.y + b.height + 20} Z`;
    niveau.setAttribute('d', d);
    stops.forEach((s, i) => s.setAttribute('stop-color', mixe(chaud[i], froid[i], etat.patine)));
    if (etat.patine >= 0.999) niveau.removeAttribute('filter'); else if (!niveau.hasAttribute('filter')) niveau.setAttribute('filter', 'url(#chaleur)');
  };
  dessiner();
  if (!calme) gsap.ticker.add((t) => { if (etat.p > 0 && etat.p < 1.01 && etat.patine < 1) dessiner(t); });
  return {
    tl: gsap.timeline({ paused: true, onUpdate: () => dessiner(gsap.ticker.time) })
      .to(etat, { p: 1.04, duration: 1, ease: 'power1.inOut' })
      .to(etat, { patine: 1, duration: 0.6, ease: 'none' }, 0.75),
  };
}

// empreinte de pneu : une roue roule et imprime le mot
function construireEmpreinte(svg) {
  svg.innerHTML = `
    <defs>
      <pattern id="crampons" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
        <rect width="22" height="22" fill="#30353b"/><path d="M0 0 L11 11 L0 22 M11 0 L22 11 L11 22" fill="none" stroke="#9aa1a8" stroke-width="4.5"/>
      </pattern>
      <clipPath id="clip-pneu"><text x="0" y="0" class="mot-svg">${tr('Pneu', 'Tyre')}</text></clipPath>
      <clipPath id="clip-trace"><rect class="trace-rect" x="0" y="-400" width="0" height="800"/></clipPath>
    </defs>
    <text x="0" y="0" class="mot-svg contour">${tr('Pneu', 'Tyre')}</text>
    <g clip-path="url(#clip-trace)"><rect class="motif" fill="url(#crampons)" clip-path="url(#clip-pneu)"/></g>
    <g class="roue"><circle r="38" fill="#1f2328" stroke="#9aa1a8" stroke-width="10" stroke-dasharray="7 5"/><circle r="15" fill="none" stroke="#5f666e" stroke-width="3"/></g>`;
  $$('text', svg).forEach((t) => { t.setAttribute('font-family', 'Cormorant Garamond'); t.setAttribute('font-weight', '600'); t.setAttribute('font-size', '210'); });
  const contour = $('.contour', svg);
  contour.setAttribute('fill', 'none'); contour.setAttribute('stroke', 'rgba(236,232,224,.35)');
  const b = contour.getBBox();
  svg.setAttribute('viewBox', `${b.x - 50} ${b.y - 60} ${b.width + 100} ${b.height + 70}`);
  const motif = $('.motif', svg);
  ['x', 'y', 'width', 'height'].forEach((k) => motif.setAttribute(k, { x: b.x, y: b.y, width: b.width, height: b.height }[k]));
  const rect = $('.trace-rect', svg); const roue = $('.roue', svg);
  const etat = { p: calme ? 1 : 0 };
  const maj = () => {
    const x = b.x - 40 + (b.width + 80) * etat.p;
    rect.setAttribute('x', b.x - 40); rect.setAttribute('width', Math.max(0, x - (b.x - 40)));
    roue.setAttribute('transform', `translate(${x},${b.y - 20}) rotate(${etat.p * 720})`);
    roue.style.opacity = etat.p > 0.98 || etat.p < 0.01 ? 0 : 1;
  };
  maj();
  return { tl: gsap.timeline({ paused: true, onUpdate: maj }).to(etat, { p: 1, duration: 1, ease: 'none' }) };
}

let coulee, empreinte, feuillets, petits;
const preparerMatieres = () => {
  coulee = construireCoulee($('[data-coulee]'));
  empreinte = construireEmpreinte($('[data-empreinte]'));
  feuillets = LP.cliver($('[data-feuillets]'), { strates: 6, ecart: 220, declencheur: false, duree: 1 });
  // petits formats : le titre se recompose en strates plus fines, comme une piece qu'on assemble a la main
  petits = LP.cliver($('[data-mot-petits]'), { strates: 5, ecart: 120, declencheur: false, duree: 1.1 });
};

/* les quatre salles du parcours : Bronze, Ardoise, Pneu, puis Petits formats (avant « Disponibles ») */
function animerMatieres() {
  const panneaux = $$('.matiere');
  const index = $('[data-index-matieres]');
  const activer = (n) => $$('button', index).forEach((b, k) => b.setAttribute('aria-current', String(k === n)));
  if (calme) {
    index.remove();
    return;
  }
  // les images des panneaux suivants se chargent avant d'etre devoilees
  ScrollTrigger.create({ trigger: '[data-piste-matieres]', start: 'top bottom+=150%', once: true, onEnter: () => $$('.matiere img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }) });
  const jouer = {
    bronze: () => gsap.to(coulee.tl, { progress: 1, duration: 2.6, ease: 'power1.inOut', overwrite: true }),
    ardoise: () => feuillets && feuillets.restart(),
    pneu: () => gsap.to(empreinte.tl, { progress: 1, duration: 2, ease: 'power1.inOut', overwrite: true }),
    'petits-formats': () => petits && petits.restart(),
  };
  const jouerPanneau = (p) => (jouer[p.dataset.matiere] || (() => {}))();
  // le premier panneau est complet des son arrivee a l'ecran
  gsap.from($$('.trio a', panneaux[0]), { y: 70, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: panneaux[0], start: 'top 65%', once: true } });
  ScrollTrigger.create({ trigger: panneaux[0], start: 'top 60%', once: true, onEnter: () => jouerPanneau(panneaux[0]) });
  if (bureau()) {
    gsap.set(panneaux.slice(1), { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
    const tl = gsap.timeline({ paused: true });
    const debuts = [0]; // instant ou chaque panneau commence a se devoiler
    tl.to({}, { duration: 0.5 });
    panneaux.slice(1).forEach((p, i) => {
      debuts.push(tl.duration());
      tl.to(p, { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
        .from($('.fond-image img', p), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
        .from($$('.trio a', p), { x: 120, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '<0.1')
        .call(() => jouerPanneau(p), null, '<0.2')
        .to({}, { duration: i === panneaux.length - 2 ? 0.45 : 0.5 });
    });
    const total = tl.duration();
    const seuils = debuts.map((t, k) => (k ? (t + 0.35) / total : 0));
    const actuel = (pr) => seuils.reduce((n, s, k) => (pr >= s ? k : n), 0);
    const reperes = debuts.map((t, k) => (k ? Math.min(0.98, (t + 0.75) / total) : 0.02));
    const st = ScrollTrigger.create({
      trigger: '[data-piste-matieres]', start: 'top top', end: `+=${(panneaux.length - 1) * 100}%`, pin: true, scrub: 0.8, anticipatePin: 1,
      animation: tl, onUpdate: (s) => activer(actuel(s.progress)),
    });
    const allerPanneau = (k, doux) => {
      const cible = st.start + (st.end - st.start) * reperes[k];
      if (LP.lenis) LP.lenis.scrollTo(cible, doux ? { duration: 1.4 } : { immediate: true, force: true }); else scrollTo(0, cible);
      if (!doux) { ScrollTrigger.update(); st.getTween?.()?.progress(1); }
    };
    $$('button', index).forEach((b, k) => b.addEventListener('click', () => allerPanneau(k, true)));
    // au clavier, le focus amene directement au panneau qui le contient
    panneaux.forEach((p, k) => p.addEventListener('focusin', () => {
      if (actuel(st.progress) !== k || (k > 0 && !st.isActive)) allerPanneau(k, false);
    }));
    activer(0);
  } else {
    index.remove();
    panneaux.slice(1).forEach((p) => {
      ScrollTrigger.create({ trigger: p, start: 'top 65%', once: true, onEnter: () => jouerPanneau(p) });
      gsap.from($$('.trio a', p), { y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 60%', once: true } });
    });
  }
}

/* ---------------- disponibles : salle horizontale ---------------- */
const DISPO = ['la-faille-bleue', 'l-ardoisier', 'expression', 'la-reverence', 'flamenco', 'desir-no-2', 'le-cerceau', 'entre-deux-silences', 'introspection', 'premices-d-ouragan', 'le-troisieme-oeil'].map(o).filter((x) => x && x.statut === 'disponible');
const piste = $('[data-piste-dispo]');
const hMax = Math.max(...DISPO.map((x) => x.dimensions?.h || 40));
const hauteurDispo = () => {
  if (bureau() && !calme) {
    const tete = $('#disponibles .tete');
    return Math.max(220, Math.min(540, innerHeight - tete.offsetHeight - 110 - 120));
  }
  return Math.min(innerHeight * 0.42, 460);
};
const rendreDispo = () => {
  const H = hauteurDispo();
  piste.innerHTML = DISPO.map((x) => {
    const h = x.dimensions?.h || 40;
    const k = 0.48 + 0.52 * Math.pow(h / hMax, 0.6);
    return carteOeuvre(x, { hauteurPx: Math.round(H * k) });
  }).join('') + finDispo();
};
// fin du parcours : les salles ou trouver toutes les oeuvres disponibles, Petits formats compris
function finDispo() {
  const NOMS = { ardoise: tr('Salle Ardoise', 'Slate room'), bronze: tr('Salle Bronze', 'Bronze room'), pneu: tr('Salle Pneu', 'Tyre room'), 'petits-formats': tr('Salle Petits formats', 'Small works room') };
  const liens = LP.SALLES.filter((k) => NOMS[k]).map((k, i) => `<a class="bouton${i === 0 ? ' bouton--plein' : ''}" href="salle.html?s=${k}"><span>${NOMS[k]}</span></a>`).join('');
  return `<div class="fin"><p class="lead">${tr('Toutes les œuvres sont à découvrir dans les salles.', 'All the works can be seen in the rooms.')}</p><nav class="actions" aria-label="${tr('Les salles', 'The rooms')}">${liens}</nav></div>`;
}
rendreDispo();
function animerDispo() {
  const sec = $('#disponibles');
  const cartes = $$('.oeuvre-carte', piste);
  const teinter = (c) => { if (c) sec.style.setProperty('--teinte', teinteSombre(c.dataset.couleur, 0.3)); };
  teinter(cartes[0]);
  if (calme || !bureau()) {
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) teinter(en.target); }), { root: bureau() ? null : $('.piste-scroll', sec), threshold: 0.6 });
    cartes.forEach((c) => io.observe(c));
    return;
  }
  const distance = () => piste.scrollWidth - innerWidth;
  const tw = gsap.to(piste, { x: () => -distance(), ease: 'none' });
  sec.insertAdjacentHTML('beforeend', `<div class="hud-salle hud-simple" aria-hidden="true"><span></span><p><span class="chiffres" data-hud-n>1 / ${cartes.length}</span><span data-hud-t>${LP.esc(DISPO[0].titre)}</span></p><span></span><span class="hud-barre"><i data-hud-barre></i></span></div>`);
  const hudN = $('[data-hud-n]', sec); const hudT = $('[data-hud-t]', sec); const hudB = $('[data-hud-barre]', sec);
  ScrollTrigger.create({
    trigger: sec, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, animation: tw, invalidateOnRefresh: true, anticipatePin: 1,
    onUpdate: (self) => {
      hudB.style.transform = `scaleX(${self.progress})`;
      const mid = innerWidth / 2;
      let best = null; let bd = 1e9;
      cartes.forEach((c) => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
      if (best && best !== sec._active) { sec._active = best; teinter(best); const ka = cartes.indexOf(best); hudN.textContent = `${ka + 1} / ${cartes.length}`; hudT.textContent = DISPO[ka]?.titre || ''; }
    },
  });
  const stD = ScrollTrigger.getAll().find((t) => t.vars.trigger === sec && t.pin);
  piste.addEventListener('focusin', (ev) => {
    const el = ev.target.closest('.oeuvre-carte, .fin'); if (!el || !stD) return;
    const d = distance(); if (d <= 0) return;
    const pr = Math.min(1, Math.max(0, (el.offsetLeft + el.offsetWidth / 2 - innerWidth / 2) / d));
    const y = stD.start + (stD.end - stD.start) * pr;
    if (LP.lenis) LP.lenis.scrollTo(y, { immediate: true, force: true }); else scrollTo(0, y);
  });
  cartes.forEach((c) => {
    gsap.fromTo($('img, .oeuvre-absente', c), { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 95%', end: 'left 55%', scrub: true } });
  });
}

/* (Petits formats : desormais quatrieme salle du parcours, plus haut ; plus de section separee) */

/* ---------------- collection privee : deux rails ---------------- */
const COLL = LP.serie('collection').filter((x) => x.photos.length);
const moitie = Math.ceil(COLL.length / 2);
const rails = $$('[data-rail]');
[COLL.slice(0, moitie), COLL.slice(moitie)].forEach((liste, i) => {
  const html = liste.map(vignette).join('');
  rails[i].innerHTML = html + html.replace(/<a class="vignette"/g, '<a class="vignette" aria-hidden="true" tabindex="-1"');
});
if (!calme) {
  rails.forEach((rail) => {
    const sens = parseFloat(rail.dataset.rail);
    let x = 0; let vitesse = 0.45;
    const largeur = () => rail.scrollWidth / 2;
    let survol = false;
    rail.addEventListener('pointerenter', () => { survol = true; });
    rail.addEventListener('pointerleave', () => { survol = false; });
    let visible = false;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '100px' }).observe(rail);
    rail.addEventListener('focusin', () => { survol = true; });
    rail.addEventListener('focusout', () => { survol = false; });
    gsap.ticker.add(() => {
      if (!visible || document.hidden) return;
      const v = LP.lenis ? LP.lenis.velocity : 0;
      vitesse += ((survol ? 0 : 0.45 + Math.min(4, Math.abs(v) * 0.08)) - vitesse) * 0.06;
      x -= vitesse * sens;
      const L = largeur();
      if (L > 0) { if (x <= -L) x += L; if (x > 0) x -= L; }
      rail.style.transform = `translate3d(${x}px,0,0)`;
    });
  });
}

/* ---------------- livre : la couverture s'ouvre au defilement ---------------- */
if (!calme) {
  const tlLivre = gsap.timeline({ scrollTrigger: { trigger: '#livre', start: 'top 70%', end: 'center 40%', scrub: 1 } });
  tlLivre.fromTo('[data-livre]', { rotationY: -38, rotationX: 14, y: 60 }, { rotationY: -10, rotationX: 4, y: 0, ease: 'power2.out', duration: 1 })
    .to('[data-couv]', { rotationY: -158, ease: 'power2.inOut', duration: 1.2 }, 0.45)
    .to('[data-livre]', { x: '22%', duration: 1.2, ease: 'power2.inOut' }, 0.45);
} else {
  gsap.set('[data-couv]', { rotationY: -158 });
  gsap.set('[data-livre]', { rotationY: -8, x: '22%' });
}

/* ---------------- carte de France ---------------- */
function construireCarte() {
  const z = $('[data-carte-fr]');
  // carte illustrative : le contour de la France et l'atelier. Aucun itineraire n'est calcule ;
  // l'ancien trait pointille vers Les Sables-d'Olonne (salon passe) etait un simple trace decoratif, il est retire.
  const [bx, by] = FRANCE.pts.bagnolet;
  z.innerHTML = `<svg viewBox="0 0 ${FRANCE.w} ${FRANCE.h}" role="img" aria-label="${tr('Carte de France : l’atelier de Laure Polin à Bagnolet, à l’est de Paris', 'Map of France: Laure Polin’s studio in Bagnolet, east of Paris')}">
    <path class="pays" d="${FRANCE.d}"/>
    <circle class="halo" cx="${bx}" cy="${by}" r="10"/><circle class="point" cx="${bx}" cy="${by}" r="6"/>
    <text class="etiquette" x="${bx + 16}" y="${by - 12}">${tr('Atelier, Bagnolet', 'Studio, Bagnolet')}</text>
  </svg>`;
  if (calme) return;
  const pays = $('.pays', z); const L = pays.getTotalLength();
  pays.style.strokeDasharray = L; pays.style.strokeDashoffset = L;
  gsap.timeline({ scrollTrigger: { trigger: z, start: 'top 75%', once: true } })
    .to(pays, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut' })
    .from(pays, { fillOpacity: 0, duration: 1 }, 1.4)
    .from($$('.point, .halo, .etiquette', z), { opacity: 0, scale: 0, transformOrigin: 'center', stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, 1.8);
}

/* ---------------- expositions : classees selon leurs vraies dates ----------------
   A completer ici quand une exposition est annoncee : { nom, debut: 'AAAA-MM-JJ', fin: 'AAAA-MM-JJ', texte, lien? }.
   En cours ou a venir : listee dans « Où voir les œuvres ». Terminee : rangee dans « Expositions passées ». */
const EXPOSITIONS = [
  {
    nom: 'Vendée Art Show 2025', debut: '2025-10-31', fin: '2025-11-02',
    texte: tr('Du 31 octobre au 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.', '31 October to 2 November 2025, Les Atlantes conference centre, Les Sables-d’Olonne.'),
    affiche: { src: 'assets/img/site/vendee-art-show-2025-1121.webp', w: 1121, h: 598, alt: tr('Affiche du Vendée Art Show, 31 octobre, 1er et 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.', 'Poster for the Vendée Art Show, 31 October, 1 and 2 November 2025, Les Atlantes conference centre, Les Sables-d’Olonne.') },
  },
];
function rendreExpositions() {
  const jour = (s) => { const [a, m, j] = s.split('-').map(Number); return new Date(a, m - 1, j); };
  const auj = new Date(); auj.setHours(0, 0, 0, 0);
  const actuelles = EXPOSITIONS.filter((x) => jour(x.fin) >= auj).sort((a, b) => jour(a.debut) - jour(b.debut));
  const passees = EXPOSITIONS.filter((x) => jour(x.fin) < auj).sort((a, b) => jour(b.fin) - jour(a.fin));
  const zoneA = $('[data-expos-actuelles]');
  if (zoneA && actuelles.length) {
    zoneA.querySelector('p').outerHTML = actuelles.map((x) => `<p><strong>${LP.esc(x.nom)}</strong> <span class="etat etat--dispo">${jour(x.debut) <= auj ? tr('En ce moment', 'Now on') : tr('À venir', 'Upcoming')}</span><br>${LP.esc(x.texte)}${x.lien ? ` <a class="lien" href="${x.lien}" target="_blank" rel="noopener">${tr('En savoir plus', 'Find out more')}</a>` : ''}</p>`).join('');
  }
  const zoneP = $('[data-expos-passees]');
  if (!zoneP) return;
  if (!passees.length) { zoneP.hidden = true; return; }
  $('.liste-passees', zoneP).innerHTML = passees.map((x) => `<li class="expo-passee">${x.affiche ? `<img src="${x.affiche.src}" alt="${LP.esc(x.affiche.alt)}" loading="lazy" width="${x.affiche.w}" height="${x.affiche.h}">` : ''}<div><strong>${LP.esc(x.nom)}</strong><span>${LP.esc(x.texte)}</span></div></li>`).join('');
}
rendreExpositions();

/* ---------------- plan de Bagnolet ---------------- */
function construirePlan() {
  const z = $('[data-plan]');
  const pad = 8;
  z.innerHTML = `<svg viewBox="${-pad} ${-pad} ${PLAN.w + pad * 2} ${PLAN.h + pad * 2}" role="img" aria-label="${tr('Plan : Bagnolet, à l’est de Paris, entre Montreuil, Romainville et Les Lilas', 'Map: Bagnolet, east of Paris, between Montreuil, Romainville and Les Lilas')}">
    ${PLAN.zones.map((zn) => `<path class="${zn.type === 'a' ? 'paris' : 'commune'}${zn.nom === 'Bagnolet' ? ' ici' : ''}" d="${zn.d}"/>`).join('')}
    ${PLAN.zones.map((zn) => {
      const [x, y] = zn.c;
      if (x < 4 || y < 4 || x > PLAN.w - 4 || y > PLAN.h - 4) return '';
      return `<text x="${x}" y="${y}" class="${zn.nom === 'Bagnolet' ? 'ici' : ''}">${LP.esc(zn.nom)}</text>`;
    }).join('')}
    <text x="40" y="${PLAN.h - 20}">Paris</text>
  </svg>`;
  if (!calme) gsap.from($$('.commune, .paris', z), { opacity: 0, duration: 0.8, stagger: 0.06, scrollTrigger: { trigger: z, start: 'top 85%', once: true } });
}

/* (atelier : visites sur rendez-vous uniquement, plus d'indicateur d'horaires d'ouverture) */

/* ---------------- formulaire ---------------- */
function formulaire() {
  const f = $('[data-formulaire]');
  const sel = $('[data-select-oeuvres]', f);
  const dispo = LP.oeuvres.filter((x) => x.statut === 'disponible' && x.id !== 'dialogues-sculptes').sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  sel.insertAdjacentHTML('beforeend', dispo.map((x) => `<option value="${x.id}">${LP.esc(x.titre)}${x.prix ? ` (${LP.prix(x.prix)})` : ''}</option>`).join(''));
  const q = new URLSearchParams(location.search);
  if (q.get('oeuvre') && LP.parId[q.get('oeuvre')]) sel.value = q.get('oeuvre');
  monterFormulaire(f, () => (sel.value ? LP.parId[sel.value].titre : null));
}
formulaire();

/* ---------------- titres de section : clivage ---------------- */
$$('section:not(.hero) [data-clive]').forEach((t) => LP.cliver(t, { strates: 4, ecart: 70 }));

/* ---------------- lancement ---------------- */
LP.majBoutonsPanier();
LP.aimants();
LP.inclinaison();
const lancer = () => {
  preparerMatieres();
  animerMatieres();
  animerDispo();
  construireCarte();
  construirePlan();
  // les sections epinglees (salles, disponibles) sont creees ici, apres les animations placees plus bas
  // dans la page (livre, titres...) : on remet tout dans l'ordre de la page pour que leurs positions
  // tiennent compte du defilement ajoute par les epinglages (sinon, sur ordinateur, elles se jouent trop tot)
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
};
if (document.fonts && document.fonts.ready) document.fonts.ready.then(lancer); else lancer();
let largeurPrec = innerWidth;
addEventListener('resize', () => {
  if (Math.abs(innerWidth - largeurPrec) > 120 && (largeurPrec < 861) !== (innerWidth < 861)) location.reload();
  largeurPrec = innerWidth;
});
