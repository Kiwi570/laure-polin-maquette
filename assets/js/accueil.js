/* Accueil */
import LP, { demarrer } from './base.js';
import { fondArdoise } from './ardoise-gl.js';
import { poussiere } from './poussiere.js';
import { FRANCE, PLAN } from './formes.js';
import { imgOeuvre, cartelHTML, carteOeuvre, cartePetit, vignette, teinteSombre, boutonAjout, monterFormulaire } from './cartes.js';

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
if (!heroZone.querySelector('img')) {
  heroZone.innerHTML = `
  <a class="scene-oeuvre" href="${LP.lienOeuvre(HERO)}" data-curseur="Voir">
    ${imgOeuvre(HERO, { sizes: '(max-width: 860px) 60vw, 30vw', charge: 'eager' })}
    <span class="ombre" aria-hidden="true"></span>
  </a>
  <p class="cartel chiffres">${cartelHTML(HERO)}</p>`;
}
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
    <a href="${LP.lienOeuvre(x)}" data-curseur="Voir" data-carte>${imgOeuvre(x, { sizes: '(max-width: 860px) 30vw, 16vw' })}<span class="cartel"><strong>${LP.esc(x.titre)}</strong><span class="dims-l chiffres">${LP.esc(LP.dims(x).replace(/ \(.*\)$/, ''))}</span>${x.statut === 'disponible' && x.prix ? `<span class="prix chiffres">${LP.prix(x.prix)}</span>` : ''}</span></a>`).join('');
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
  const index = $('[data-index-matieres]');
  const activer = (n) => $$('button', index).forEach((b, k) => b.setAttribute('aria-current', String(k === n)));
  if (calme) {
    index.remove();
    return;
  }
  // les images des panneaux suivants se chargent avant d'etre devoilees
  ScrollTrigger.create({ trigger: '[data-piste-matieres]', start: 'top bottom+=150%', once: true, onEnter: () => $$('.matiere img[loading="lazy"]').forEach((i) => { i.loading = 'eager'; }) });
  const jouerCoulee = () => gsap.to(coulee.tl, { progress: 1, duration: 2.6, ease: 'power1.inOut', overwrite: true });
  const jouerFeuillets = () => feuillets && feuillets.restart();
  const jouerEmpreinte = () => gsap.to(empreinte.tl, { progress: 1, duration: 2, ease: 'power1.inOut', overwrite: true });
  // le premier panneau est complet des son arrivee a l'ecran
  gsap.from($$('.trio a', panneaux[0]), { y: 70, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: panneaux[0], start: 'top 65%', once: true } });
  ScrollTrigger.create({ trigger: panneaux[0], start: 'top 60%', once: true, onEnter: jouerCoulee });
  if (bureau()) {
    gsap.set(panneaux.slice(1), { clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)' });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-piste-matieres]', start: 'top top', end: '+=300%', pin: true, scrub: 0.8, anticipatePin: 1,
        onUpdate: (st) => activer(st.progress < 0.36 ? 0 : st.progress < 0.72 ? 1 : 2),
      },
    });
    tl.to({}, { duration: 0.5 })
      .to(panneaux[1], { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
      .from($('.fond-image img', panneaux[1]), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
      .from($$('.trio a', panneaux[1]), { x: 120, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '<0.1')
      .call(jouerFeuillets, null, '<0.2')
      .to({}, { duration: 0.5 })
      .to(panneaux[2], { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', duration: 0.7, ease: 'power2.inOut' })
      .from($('.fond-image img', panneaux[2]), { scale: 1.25, duration: 0.7, ease: 'power2.out' }, '<')
      .from($$('.trio a', panneaux[2]), { x: 120, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '<0.1')
      .call(jouerEmpreinte, null, '<0.2')
      .to({}, { duration: 0.45 });
    const st = tl.scrollTrigger;
    const allerPanneau = (k, doux) => {
      const cible = st.start + (st.end - st.start) * [0.02, 0.5, 0.95][k];
      if (LP.lenis) LP.lenis.scrollTo(cible, doux ? { duration: 1.4 } : { immediate: true, force: true }); else scrollTo(0, cible);
      if (!doux) { ScrollTrigger.update(); st.getTween?.()?.progress(1); }
    };
    $$('button', index).forEach((b, k) => b.addEventListener('click', () => allerPanneau(k, true)));
    // au clavier, le focus amene directement au panneau qui le contient
    panneaux.forEach((p, k) => p.addEventListener('focusin', () => {
      const pr = st.progress; const actuel = pr < 0.36 ? 0 : pr < 0.72 ? 1 : 2;
      if (actuel !== k || (k > 0 && !st.isActive)) allerPanneau(k, false);
    }));
    activer(0);
  } else {
    index.remove();
    ScrollTrigger.create({ trigger: panneaux[1], start: 'top 65%', once: true, onEnter: jouerFeuillets });
    ScrollTrigger.create({ trigger: panneaux[2], start: 'top 65%', once: true, onEnter: jouerEmpreinte });
    panneaux.slice(1).forEach((p) => gsap.from($$('.trio a', p), { y: 50, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 60%', once: true } }));
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

/* ---------------- l'ardoisier : branches de cuivre et fruits d'ardoise ---------------- */
const ARD = o('l-ardoisier');
$('[data-cartel-ardoisier]').innerHTML = cartelHTML(ARD);
const FRUITS = ['profil', 'grands-yeux', 'empreintes', 'dans-les-nuages', 'je-reflechis', 'la-baigneuse', 'observer-le-monde', 'pensive-1', 'humer-le-monde', 'l-aplomb-de-la-jeunesse-1'].map(o).filter((x) => x && x.detoure);
function construireArbre() {
  const scene = $('[data-arbre]');
  const large = bureau();
  const W = 1000, H = large ? 625 : 1250;
  // charpente dessinee a la main : trois maitresses branches qui se divisent, chaque pointe porte un fruit
  const G = large ? {
    base: [500, 236],
    branches: [
      { d: 'M500,236 C470,190 380,165 268,128', w: 8 }, { d: 'M500,236 C505,180 492,120 482,74', w: 7 }, { d: 'M500,236 C540,192 640,170 742,122', w: 8 },
      { d: 'M268,128 C230,140 172,150 118,178', w: 3.4 }, { d: 'M268,128 C238,105 210,86 172,66', w: 3.2 }, { d: 'M268,128 C288,96 300,70 306,42', w: 3 },
      { d: 'M482,74 C458,52 432,36 402,22', w: 2.8 }, { d: 'M482,74 C512,52 540,32 566,18', w: 2.8 },
      { d: 'M742,122 C734,92 718,64 696,40', w: 3 }, { d: 'M742,122 C780,100 820,82 852,62', w: 3.2 }, { d: 'M742,122 C800,128 850,146 890,170', w: 3.4 },
      { d: 'M402,190 C372,206 340,224 304,236', w: 2.4 }, { d: 'M612,186 C640,206 664,228 684,252', w: 2.4 },
    ],
    pointes: [[118, 178], [172, 66], [306, 42], [402, 22], [566, 18], [696, 40], [852, 62], [890, 170], [304, 236], [684, 252]],
  } : {
    base: [500, 700],
    branches: [
      { d: 'M500,700 C460,620 360,580 250,520', w: 9 }, { d: 'M500,700 C510,600 494,500 488,420', w: 8 }, { d: 'M500,700 C548,622 650,584 756,520', w: 9 },
      { d: 'M250,520 C200,540 150,560 108,600', w: 4 }, { d: 'M250,520 C220,470 196,430 166,380', w: 3.6 }, { d: 'M250,520 C276,460 300,404 318,340', w: 3.4 },
      { d: 'M488,420 C456,380 430,340 404,280', w: 3.2 }, { d: 'M488,420 C524,380 556,330 584,276', w: 3.2 },
      { d: 'M756,520 C730,460 706,410 682,350', w: 3.4 }, { d: 'M756,520 C800,470 836,420 858,372', w: 3.6 }, { d: 'M756,520 C810,540 852,566 892,604', w: 4 },
    ],
    pointes: [[108, 600], [166, 380], [318, 340], [404, 280], [584, 276], [682, 350], [858, 372], [892, 604]],
  };
  const fruits = FRUITS.slice(0, G.pointes.length);
  const hMaxF = Math.max(...fruits.map((f) => f.dimensions?.h || 30));
  scene.style.aspectRatio = `${W} / ${H}`;
  scene.innerHTML = `
    <svg class="branches" viewBox="0 0 ${W} ${H}" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      <defs><linearGradient id="cuivre-grad" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#6e3818"/><stop offset=".45" stop-color="#d08a52"/><stop offset=".7" stop-color="#f0b98a"/><stop offset="1" stop-color="#9c5a2c"/></linearGradient></defs>
      ${G.branches.map((b, i) => `<path d="${b.d}" stroke-width="${b.w}" data-rang="${i < 3 ? 0 : 1}"/>`).join('')}
      ${G.pointes.slice(0, fruits.length).map(([x, y]) => `<circle class="noeud" cx="${x}" cy="${y}" r="3.2" fill="#e3a676"/>`).join('')}
    </svg>
    <a class="tronc" href="${LP.lienOeuvre(ARD)}" data-curseur="Voir" style="height:${large ? 66 : 44}%" aria-label="L’Ardoisier, voir la fiche">${imgOeuvre(ARD, { sizes: '30vw', cls: 'oeuvre' })}</a>
    ${fruits.map((f, i) => {
      const [x, y] = G.pointes[i];
      const k = 0.62 + 0.38 * ((f.dimensions?.h || 30) / hMaxF);
      return `<a class="fruit" href="${LP.lienOeuvre(f)}" style="left:${(x / W) * 100}%;top:${(y / H) * 100}%;--k:${k.toFixed(2)}" data-carte aria-label="${LP.esc(f.titre)}, ${LP.prix(f.prix)}"><span class="fruit-in"><i class="tige" aria-hidden="true"></i>${imgOeuvre(f, { sizes: '120px' })}<span class="etiq">${LP.esc(f.titre)}<br> ${LP.prix(f.prix)}</span></span></a>`;
    }).join('')}`;
  const chemins = $$('path', scene);
  chemins.forEach((c) => { const l = c.getTotalLength(); c.style.strokeDasharray = l; c.style.strokeDashoffset = calme ? 0 : l; });
  const elFruits = $$('.fruit-in', scene);
  if (calme) return;
  gsap.set(elFruits, { scale: 0, transformOrigin: '50% 0%' });
  gsap.set($$('.noeud', scene), { scale: 0, transformOrigin: 'center' });
  const tl = gsap.timeline();
  tl.from($('.tronc', scene), { y: 40, opacity: 0.2, duration: 0.5, ease: 'power2.out' })
    .to(chemins.filter((c) => c.dataset.rang === '0'), { strokeDashoffset: 0, duration: 0.7, ease: 'power1.inOut', stagger: 0.08 }, 0.25)
    .to(chemins.filter((c) => c.dataset.rang === '1'), { strokeDashoffset: 0, duration: 0.6, ease: 'power1.out', stagger: 0.04 }, 0.8)
    .to($$('.noeud', scene), { scale: 1, duration: 0.3, stagger: 0.04 }, 1.25)
    .to(elFruits, { scale: 1, duration: 0.55, ease: 'back.out(2)', stagger: 0.06 }, 1.3);
  // balancement leger des fruits, seulement quand la section est visible
  const balance = elFruits.map((f, i) => gsap.to(f, { rotation: i % 2 ? 2.2 : -2.2, duration: 2.4 + (i % 3) * 0.5, ease: 'sine.inOut', yoyo: true, repeat: -1, paused: true, delay: i * 0.2 }));
  ScrollTrigger.create({ trigger: '#ardoisier', start: 'top bottom', end: 'bottom top', onToggle: (st) => balance.forEach((b) => (st.isActive ? b.play() : b.pause())) });
  if (large) {
    const stA = ScrollTrigger.create({ trigger: '#ardoisier', start: 'top top', end: '+=130%', pin: true, scrub: 0.8, animation: tl, anticipatePin: 1 });
    // au clavier, l'arbre se montre en entier avant que le focus n'atteigne un fruit
    scene.addEventListener('focusin', () => {
      if (stA.progress > 0.98) return;
      if (LP.lenis) LP.lenis.scrollTo(stA.end - 2, { immediate: true, force: true }); else scrollTo(0, stA.end - 2);
      ScrollTrigger.update(); stA.getTween?.()?.progress(1); tl.progress(1);
    });
  }
  else ScrollTrigger.create({ trigger: scene, start: 'top 80%', end: 'center 45%', scrub: 0.8, animation: tl });
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
  const P = FRANCE.pts;
  const [bx, by] = P.bagnolet; const [sx, sy] = P.sables;
  const cx = (bx + sx) / 2 - 40; const cy = (by + sy) / 2 - 140;
  z.innerHTML = `<svg viewBox="0 0 ${FRANCE.w} ${FRANCE.h}" role="img" aria-label="Carte de France : l’atelier à Bagnolet et le salon des Sables-d’Olonne">
    <path class="pays" d="${FRANCE.d}"/>
    <path class="trajet" d="M${bx},${by} Q${cx},${cy} ${sx},${sy}"/>
    <circle class="halo" cx="${bx}" cy="${by}" r="10"/><circle class="point" cx="${bx}" cy="${by}" r="6"/>
    <circle class="point" cx="${sx}" cy="${sy}" r="5" style="fill:#8a929b"/>
    <text class="etiquette" x="${bx + 16}" y="${by - 12}">Atelier, Bagnolet</text>
    <text class="etiquette discret" x="${sx - 14}" y="${sy + 34}" text-anchor="end">Les Sables-d’Olonne, 2025</text>
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
  z.innerHTML = `<svg viewBox="${-pad} ${-pad} ${PLAN.w + pad * 2} ${PLAN.h + pad * 2}" role="img" aria-label="Plan : Bagnolet, à l’est de Paris, entre Montreuil, Romainville et Les Lilas">
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
  $('span', el).textContent = ok ? "L’atelier est ouvert en ce moment" : "L’atelier est fermé en ce moment";
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
