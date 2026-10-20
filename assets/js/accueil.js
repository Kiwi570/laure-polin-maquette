/* Accueil */
import LP, { demarrer } from './base.js';
import { fondArdoise } from './ardoise-gl.js';
import { poussiere } from './poussiere.js';
import { FRANCE, PLAN } from './formes.js';
import { imgOeuvre, cartelHTML, carteOeuvre, cartePetit, vignette, teinteSombre, boutonAjout } from './cartes.js';

demarrer();
const { gsap, ScrollTrigger, calme } = LP;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const bureau = () => !LP.etroit();
const o = (id) => LP.parId[id];

/* ---------------- compteurs reels ---------------- */
$$('[data-compte-serie]').forEach((el) => { el.textContent = LP.serie(el.dataset.compteSerie).length; });
$$('[data-nb-collection]').forEach((el) => { el.textContent = LP.serie('collection').length; });
const livre = o('dialogues-sculptes');
if (livre) $('[data-prix-livre]').textContent = LP.prix(livre.prix);

/* ---------------- hero ---------------- */
const HERO = o('harmonie');
const heroZone = $('[data-hero-oeuvre]');
heroZone.innerHTML = `
  <a class="scene-oeuvre" href="${LP.lienOeuvre(HERO)}" data-curseur="Voir">
    ${imgOeuvre(HERO, { sizes: '(max-width: 860px) 60vw, 30vw', charge: 'eager' })}
    <span class="ombre" aria-hidden="true"></span>
  </a>
  <p class="cartel chiffres">${cartelHTML(HERO)}</p>`;
const heroImg = $('img.oeuvre', heroZone);
const heroSec = $('#hero');
let fond = null;
if (LP.gl) {
  fond = fondArdoise(heroSec, { imageMobile: 'assets/img/ambiance/g-ardoise-relief-9x16.webp' });
  if (fond) $('.gl-repli', heroSec).style.display = 'none';
}
const titres = $$('.hero-titre [data-clive]');
const tlClive = titres.map((t, i) => LP.cliver(t, { strates: 5, ecart: 160, declencheur: false, delai: i * 0.12, duree: 1.7 }));
if (!calme) {
  gsap.set(heroImg, { opacity: 0 });
  gsap.set(['.hero-texte > *', '.hero-oeuvre .cartel', '.indice'], { opacity: 0, y: 20 });
}
LP.pret.then(() => {
  if (calme) return;
  tlClive.forEach((t) => t && t.play());
  gsap.to(['.hero-texte > *', '.hero-oeuvre .cartel', '.indice'], { opacity: 1, y: 0, duration: 1.1, stagger: 0.12, ease: 'power3.out', delay: 0.6 });
  if (LP.gl) poussiere(heroImg, heroZone, { duree: 2.1, depuis: 'gauche' });
  else gsap.to(heroImg, { opacity: 1, duration: 1.2, delay: 0.3 });
  // parallaxe de sortie
  gsap.to('.hero-grille', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: heroSec, start: 'top top', end: 'bottom top', scrub: true } });
});

/* ---------------- manifeste ---------------- */
$$('[data-mots]').forEach((p) => {
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
    <a href="${LP.lienOeuvre(x)}" data-curseur="Voir" data-carte>${imgOeuvre(x, { sizes: '(max-width: 860px) 30vw, 16vw' })}<span class="cartel chiffres">${cartelHTML(x, { etat: false })}</span></a>`).join('');
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
      <filter id="chaleur"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="2" seed="3"><animate attributeName="seed" values="1;9;1" dur="6s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" scale="10"/></filter>
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
      <clipPath id="clip-pneu"><text x="0" y="0" class="mot-svg">Pneu</text></clipPath>
      <clipPath id="clip-trace"><rect class="trace-rect" x="0" y="-400" width="0" height="800"/></clipPath>
    </defs>
    <text x="0" y="0" class="mot-svg contour">Pneu</text>
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

let coulee, empreinte, feuillets;
const preparerMatieres = () => {
  coulee = construireCoulee($('[data-coulee]'));
  empreinte = construireEmpreinte($('[data-empreinte]'));
  feuillets = LP.cliver($('[data-feuillets]'), { strates: 6, ecart: 220, declencheur: false, duree: 1 });
};

function animerMatieres() {
  const panneaux = $$('.matiere');
  if (calme) return;
  if (bureau()) {
    gsap.set(panneaux.slice(1), { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '[data-piste-matieres]', start: 'top top', end: '+=360%', pin: true, scrub: 0.8, anticipatePin: 1 },
    });
    const trioIn = (p) => gsap.from($$('.trio a', p), { y: 80, opacity: 0, stagger: 0.12, duration: 0.5, ease: 'power2.out' });
    tl.to(coulee.tl, { progress: 1, duration: 1, ease: 'none' }, 0)
      .add(trioIn(panneaux[0]), 0.1)
      .to({}, { duration: 0.35 })
      .to(panneaux[1], { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
      .from($('.fond-image img', panneaux[1]), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
      .to(feuillets || {}, feuillets ? { progress: 1, duration: 0.9, ease: 'none' } : { duration: 0.1 }, '>-0.25')
      .add(trioIn(panneaux[1]), '<0.1')
      .to({}, { duration: 0.35 })
      .to(panneaux[2], { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
      .from($('.fond-image img', panneaux[2]), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
      .to(empreinte.tl, { progress: 1, duration: 1, ease: 'none' }, '>-0.2')
      .add(trioIn(panneaux[2]), '<0.1')
      .to({}, { duration: 0.3 });
  } else {
    ScrollTrigger.create({ trigger: panneaux[0], start: 'top 70%', once: true, onEnter: () => gsap.to(coulee.tl, { progress: 1, duration: 2.4, ease: 'power1.inOut' }) });
    ScrollTrigger.create({ trigger: panneaux[1], start: 'top 70%', once: true, onEnter: () => feuillets && feuillets.play() });
    ScrollTrigger.create({ trigger: panneaux[2], start: 'top 70%', once: true, onEnter: () => gsap.to(empreinte.tl, { progress: 1, duration: 2, ease: 'power1.inOut' }) });
    panneaux.forEach((p) => gsap.from($$('.trio a', p), { y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 60%', once: true } }));
  }
}

/* ---------------- disponibles : salle horizontale ---------------- */
const DISPO = ['la-faille-bleue', 'l-ardoisier', 'expression', 'la-reverence', 'flamenco', 'desir-no-2', 'le-cerceau', 'entre-deux-silences', 'introspection', 'premices-d-ouragan', 'le-troisieme-oeil'].map(o).filter((x) => x && x.statut === 'disponible');
const piste = $('[data-piste-dispo]');
const hMax = Math.max(...DISPO.map((x) => x.dimensions?.h || 40));
const hauteurDispo = () => {
  if (bureau() && !calme) {
    const tete = $('#disponibles .tete');
    return Math.max(220, Math.min(560, innerHeight - tete.offsetHeight - 76 - 120));
  }
  return Math.min(innerHeight * 0.42, 460);
};
const rendreDispo = () => {
  const H = hauteurDispo();
  piste.innerHTML = DISPO.map((x) => {
    const h = x.dimensions?.h || 40;
    const k = 0.48 + 0.52 * Math.pow(h / hMax, 0.6);
    return carteOeuvre(x, { hauteurPx: Math.round(H * k) });
  }).join('') + `<div class="fin"><p class="lead">Toutes les œuvres sont présentées par matière, dans les salles.</p><div class="actions"><a class="bouton bouton--plein" href="salle.html?s=ardoise"><span>Salle Ardoise</span></a><a class="bouton" href="salle.html?s=bronze"><span>Salle Bronze</span></a><a class="bouton" href="salle.html?s=pneu"><span>Salle Pneu</span></a></div></div>`;
};
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
  ScrollTrigger.create({
    trigger: sec, start: 'top top', end: () => `+=${distance()}`, pin: true, scrub: 0.6, animation: tw, invalidateOnRefresh: true, anticipatePin: 1,
    onUpdate: () => {
      const mid = innerWidth / 2;
      let best = null; let bd = 1e9;
      cartes.forEach((c) => { const r = c.getBoundingClientRect(); const d = Math.abs(r.left + r.width / 2 - mid); if (d < bd) { bd = d; best = c; } });
      if (best && best !== sec._active) { sec._active = best; teinter(best); }
    },
  });
  cartes.forEach((c) => {
    gsap.fromTo($('img, .oeuvre-absente', c), { y: 60, opacity: 0.2 }, { y: 0, opacity: 1, ease: 'power2.out', scrollTrigger: { trigger: c, containerAnimation: tw, start: 'left 95%', end: 'left 55%', scrub: true } });
  });
}

/* ---------------- l'ardoisier : branches de cuivre et fruits d'ardoise ---------------- */
const ARD = o('l-ardoisier');
$('[data-cartel-ardoisier]').innerHTML = cartelHTML(ARD);
const FRUITS = ['profil', 'grands-yeux', 'empreintes', 'dans-les-nuages', 'je-reflechis', 'la-baigneuse', 'observer-le-monde', 'pensive-1', 'humer-le-monde', 'l-aplomb-de-la-jeunesse-1'].map(o).filter((x) => x && x.detoure);
function construireArbre() {
  const scene = $('[data-arbre]');
  const W = 1000, H = bureau() ? 625 : 1333;
  const ox = 500, oy = H * (bureau() ? 0.5 : 0.62);
  let r = 7;
  const alea = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  const n = FRUITS.length;
  const pointes = FRUITS.map((f, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = Math.PI * (0.94 - t * 0.88);
    const R = bureau() ? 330 + (i % 2) * 70 + alea() * 30 : 300 + alea() * 120;
    return { x: ox + Math.cos(a) * R * (bureau() ? 1.3 : 0.95), y: oy - Math.sin(a) * R * (bureau() ? 0.78 : 1.0) - (bureau() ? 20 : 0), f };
  });
  const branches = [];
  pointes.forEach((p, i) => {
    const mx = ox + (p.x - ox) * 0.45 + (alea() - 0.5) * 60; const my = oy + (p.y - oy) * 0.2 - 40 - alea() * 40;
    branches.push({ d: `M${ox},${oy} Q${mx.toFixed(1)},${my.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`, w: 7 - (Math.abs(i - (n - 1) / 2) / n) * 4, rang: i });
    const tx = ox + (p.x - ox) * 0.7; const ty = oy + (p.y - oy) * 0.62 - 10;
    branches.push({ d: `M${tx.toFixed(1)},${ty.toFixed(1)} q${((alea() - 0.5) * 70).toFixed(1)},${(-30 - alea() * 40).toFixed(1)} ${((alea() - 0.5) * 110).toFixed(1)},${(-50 - alea() * 50).toFixed(1)}`, w: 2.2, rang: i + 0.5 });
  });
  scene.style.aspectRatio = `${W} / ${H}`;
  scene.innerHTML = `
    <svg class="branches" viewBox="0 0 ${W} ${H}" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs><linearGradient id="cuivre-grad" x1="0" x2="1"><stop offset="0" stop-color="#7a3f1c"/><stop offset=".5" stop-color="#d08a52"/><stop offset="1" stop-color="#9c5a2c"/></linearGradient></defs>
      ${branches.map((b) => `<path d="${b.d}" stroke-width="${b.w.toFixed(1)}" data-rang="${b.rang}"/>`).join('')}
    </svg>
    <a class="tronc" href="${LP.lienOeuvre(ARD)}" data-curseur="Voir" style="height:${bureau() ? 70 : 46}%">${imgOeuvre(ARD, { sizes: '30vw', cls: 'oeuvre' })}</a>
    ${pointes.map((p) => `<a class="fruit" href="${LP.lienOeuvre(p.f)}" style="left:${(p.x / W) * 100}%;top:${(p.y / H) * 100}%;transform:translate(-50%,-8%)" data-carte>${imgOeuvre(p.f, { sizes: '120px' })}<span>${LP.esc(p.f.titre)}, ${LP.prix(p.f.prix)}</span></a>`).join('')}`;
  const chemins = $$('path', scene);
  chemins.forEach((c) => { const l = c.getTotalLength(); c.style.strokeDasharray = l; c.style.strokeDashoffset = calme ? 0 : l; });
  if (calme) return;
  const fruits = $$('.fruit', scene);
  gsap.set(fruits, { scale: 0, transformOrigin: '50% 0%' });
  const tl = gsap.timeline();
  tl.from($('.tronc', scene), { y: 60, opacity: 0, duration: 0.6, ease: 'power2.out' });
  chemins.forEach((c) => tl.to(c, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, 0.3 + parseFloat(c.dataset.rang) * 0.08));
  fruits.forEach((f, i) => tl.to(f, { scale: 1, duration: 0.5, ease: 'back.out(2.2)' }, 0.9 + i * 0.09));
  if (bureau()) ScrollTrigger.create({ trigger: '#ardoisier', start: 'top top', end: '+=140%', pin: true, scrub: 0.8, animation: tl, anticipatePin: 1 });
  else ScrollTrigger.create({ trigger: scene, start: 'top 75%', end: 'bottom 60%', scrub: 0.8, animation: tl });
}

/* ---------------- petits formats ---------------- */
const PETITS = LP.serie('petits-formats');
$('[data-grille-petits]').innerHTML = PETITS.map(cartePetit).join('');
const prixMin = Math.min(...PETITS.filter((x) => x.statut === 'disponible' && x.prix).map((x) => x.prix));
$('[data-prix-min]').textContent = `À partir de ${LP.prix(prixMin)}.`;
if (!calme) {
  gsap.from('.carte-petit', { y: 60, opacity: 0, rotationX: -12, transformOrigin: '50% 100%', duration: 1, stagger: { each: 0.06, grid: 'auto', from: 'start' }, ease: 'power3.out', scrollTrigger: { trigger: '[data-grille-petits]', start: 'top 80%', once: true } });
}

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
    gsap.ticker.add(() => {
      const v = LP.lenis ? LP.lenis.velocity : 0;
      vitesse += ((survol ? 0.05 : 0.45 + Math.min(4, Math.abs(v) * 0.08)) - vitesse) * 0.06;
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
  const P = FRANCE.pts;
  const [bx, by] = P.bagnolet; const [sx, sy] = P.sables;
  const cx = (bx + sx) / 2 - 40; const cy = (by + sy) / 2 - 140;
  z.innerHTML = `<svg viewBox="0 0 ${FRANCE.w} ${FRANCE.h}" role="img" aria-label="Carte de France : l'atelier à Bagnolet et le salon des Sables-d'Olonne">
    <path class="pays" d="${FRANCE.d}"/>
    <path class="trajet" d="M${bx},${by} Q${cx},${cy} ${sx},${sy}"/>
    <circle class="halo" cx="${bx}" cy="${by}" r="10"/><circle class="point" cx="${bx}" cy="${by}" r="6"/>
    <circle class="point" cx="${sx}" cy="${sy}" r="5" style="fill:#8a929b"/>
    <text class="etiquette" x="${bx + 16}" y="${by - 12}">Atelier, Bagnolet</text>
    <text class="etiquette discret" x="${sx - 14}" y="${sy + 34}" text-anchor="end">Les Sables-d'Olonne, 2025</text>
  </svg>`;
  if (calme) return;
  const pays = $('.pays', z); const L = pays.getTotalLength();
  pays.style.strokeDasharray = L; pays.style.strokeDashoffset = L;
  const tr = $('.trajet', z); const L2 = tr.getTotalLength();
  gsap.timeline({ scrollTrigger: { trigger: z, start: 'top 75%', once: true } })
    .to(pays, { strokeDashoffset: 0, duration: 2.6, ease: 'power2.inOut' })
    .from(pays, { fillOpacity: 0, duration: 1 }, 1.4)
    .from($$('.point, .halo, .etiquette', z), { opacity: 0, scale: 0, transformOrigin: 'center', stagger: 0.12, duration: 0.6, ease: 'back.out(2)' }, 1.8)
    .fromTo(tr, { strokeDasharray: `0 ${L2}` }, { strokeDasharray: `${L2} 0`, duration: 1.4, ease: 'power1.inOut', onComplete: () => { tr.style.strokeDasharray = ''; } }, 2.1);
}

/* ---------------- plan de Bagnolet ---------------- */
function construirePlan() {
  const z = $('[data-plan]');
  const pad = 8;
  z.innerHTML = `<svg viewBox="${-pad} ${-pad} ${PLAN.w + pad * 2} ${PLAN.h + pad * 2}" role="img" aria-label="Plan : Bagnolet, à l'est de Paris, entre Montreuil, Romainville et Les Lilas">
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

/* ---------------- horaires : ouvert maintenant ---------------- */
// A completer avec les vrais horaires, ex. { 3: [[14, 19]], 6: [[10, 18]] } (0 = dimanche)
const HORAIRES = null;
function ouvertMaintenant() {
  const el = $('[data-ouvert]');
  if (!HORAIRES) return;
  const d = new Date(); const h = d.getHours() + d.getMinutes() / 60;
  const ok = (HORAIRES[d.getDay()] || []).some(([a, b]) => h >= a && h < b);
  el.classList.toggle('oui', ok);
  $('span', el).textContent = ok ? "L'atelier est ouvert en ce moment" : "L'atelier est fermé en ce moment";
}
ouvertMaintenant();

/* ---------------- formulaire ---------------- */
function formulaire() {
  const f = $('[data-formulaire]');
  const sel = $('[data-select-oeuvres]', f);
  const dispo = LP.oeuvres.filter((x) => x.statut === 'disponible' && x.id !== 'dialogues-sculptes').sort((a, b) => a.titre.localeCompare(b.titre, 'fr'));
  sel.insertAdjacentHTML('beforeend', dispo.map((x) => `<option value="${x.id}">${LP.esc(x.titre)}${x.prix ? ` (${LP.prix(x.prix)})` : ''}</option>`).join(''));
  const q = new URLSearchParams(location.search);
  if (q.get('oeuvre') && LP.parId[q.get('oeuvre')]) sel.value = q.get('oeuvre');
  f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const err = $('[data-erreur]', f);
    const nom = f.nom.value.trim(); const mail = f.email.value.trim(); const msg = f.message.value.trim();
    const manque = [];
    if (!nom) manque.push('votre nom');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) manque.push('une adresse e-mail valide');
    if (!msg) manque.push('un message');
    if (manque.length) { err.textContent = `Il manque ${manque.join(', ')}.`; (manque[0] === 'votre nom' ? f.nom : manque[0].startsWith('une') ? f.email : f.message).focus(); return; }
    err.textContent = '';
    const oeuvre = sel.value ? LP.parId[sel.value].titre : null;
    f.innerHTML = `<div class="confirmation" role="status"><p class="lead" style="margin-bottom:.5em">Merci ${LP.esc(nom)}.</p><p style="margin:0">Votre demande${oeuvre ? ` au sujet de « ${LP.esc(oeuvre)} »` : ''} est prête. Dans cette maquette, rien n'est envoyé : sur le site final, elle arrivera directement à Laure Polin.</p></div>`;
    if (LP.son.actif) LP.son.coup(0.8);
  });
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
  construireArbre();
  construireCarte();
  construirePlan();
  ScrollTrigger.refresh();
};
if (document.fonts && document.fonts.ready) document.fonts.ready.then(lancer); else lancer();
let largeurPrec = innerWidth;
addEventListener('resize', () => {
  if (Math.abs(innerWidth - largeurPrec) > 120 && (largeurPrec < 861) !== (innerWidth < 861)) location.reload();
  largeurPrec = innerWidth;
});
