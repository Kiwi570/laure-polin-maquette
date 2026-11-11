/* Copie de accueil.js : construireCoulee (coulée de bronze) et construireEmpreinte (empreinte de pneu).
   Seuls changent : le mot vient des réglages, les id SVG sont uniques par instance, l'état « calme »
   est passé en paramètre, GSAP est l'instance partagée. */
import { moteur } from '../../../../lp-commun/moteur';

const $ = <T extends Element = Element>(sel: string, r: ParentNode): T | null => r.querySelector<T>(sel);
const $$ = <T extends Element = Element>(sel: string, r: ParentNode): Array<T> => Array.from(r.querySelectorAll<T>(sel));
const echap = (t: string) => t.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export type Moteurs = { tl: gsap.core.Timeline; detruire: () => void };

// coulée de bronze : le mot se remplit de métal en fusion qui se fige en patine
export function construireCoulee(svg: SVGSVGElement, mot: string, uid: string, calme: boolean): Moteurs {
  const { gsap } = moteur();
  svg.innerHTML = `
    <defs>
      <clipPath id="clip-bronze-${uid}"><text x="0" y="0" class="mot-svg">${echap(mot)}</text></clipPath>
      <linearGradient id="g-fusion-${uid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#fff1c9"/><stop offset=".25" stop-color="#ffb04a"/><stop offset=".6" stop-color="#d0631c"/><stop offset="1" stop-color="#6e2a0c"/>
      </linearGradient>
      <filter id="chaleur-${uid}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".012 .05" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="8"/></filter>
    </defs>
    <text x="0" y="0" class="mot-svg contour">${echap(mot)}</text>
    <g clip-path="url(#clip-bronze-${uid})"><path class="niveau" fill="url(#g-fusion-${uid})" filter="url(#chaleur-${uid})"/></g>`;
  $$('text', svg).forEach((t) => { t.setAttribute('font-family', 'Cormorant Garamond'); t.setAttribute('font-weight', '300'); t.setAttribute('font-size', '200'); });
  const contour = $<SVGTextElement>('.contour', svg) as SVGTextElement;
  contour.setAttribute('fill', 'none'); contour.setAttribute('stroke', 'rgba(236,232,224,.35)'); contour.setAttribute('stroke-width', '1');
  const b = contour.getBBox();
  svg.setAttribute('viewBox', `${b.x - 4} ${b.y - 6} ${b.width + 8} ${b.height + 12}`);
  const niveau = $<SVGPathElement>('.niveau', svg) as SVGPathElement;
  const stops = $$<SVGStopElement>('stop', svg);
  const etat = { p: calme ? 1 : 0, patine: calme ? 1 : 0 };
  const chaud = ['#fff1c9', '#ffb04a', '#d0631c', '#6e2a0c'];
  const froid = ['#c9a36b', '#9a6a3a', '#6d4a2c', '#4f6e60'];
  const mixe = (a: string, c: string, k: number) => { const A = (a.match(/\w\w/g) || []).map((x) => parseInt(x, 16)); const C = (c.match(/\w\w/g) || []).map((x) => parseInt(x, 16)); return `rgb(${A.map((v, i) => Math.round(v + (C[i] - v) * k)).join(',')})`; };
  const dessiner = (t = 0) => {
    const haut = b.y + b.height - (b.height + 20) * etat.p;
    const w = b.width + 20; const x0 = b.x - 10;
    let d = `M${x0},${haut}`;
    for (let i = 0; i <= 24; i++) { const x = x0 + (w * i) / 24; d += ` L${x.toFixed(1)},${(haut + Math.sin(i * 0.9 + t * 3) * 5 * (1 - etat.patine)).toFixed(1)}`; }
    d += ` L${x0 + w},${b.y + b.height + 20} L${x0},${b.y + b.height + 20} Z`;
    niveau.setAttribute('d', d);
    stops.forEach((st, i) => st.setAttribute('stop-color', mixe(chaud[i], froid[i], etat.patine)));
    if (etat.patine >= 0.999) niveau.removeAttribute('filter'); else if (!niveau.hasAttribute('filter')) niveau.setAttribute('filter', `url(#chaleur-${uid})`);
  };
  dessiner();
  const tick = (t: number) => { if (etat.p > 0 && etat.p < 1.01 && etat.patine < 1) dessiner(t); };
  if (!calme) gsap.ticker.add(tick);
  const tl = gsap.timeline({ paused: true, onUpdate: () => dessiner(gsap.ticker.time) })
    .to(etat, { p: 1.04, duration: 1, ease: 'power1.inOut' })
    .to(etat, { patine: 1, duration: 0.6, ease: 'none' }, 0.75);
  return { tl, detruire: () => { gsap.ticker.remove(tick); tl.kill(); svg.innerHTML = ''; } };
}

// empreinte de pneu : une roue roule et imprime le mot
export function construireEmpreinte(svg: SVGSVGElement, mot: string, uid: string, calme: boolean): Moteurs {
  const { gsap } = moteur();
  svg.innerHTML = `
    <defs>
      <pattern id="crampons-${uid}" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
        <rect width="22" height="22" fill="#30353b"/><path d="M0 0 L11 11 L0 22 M11 0 L22 11 L11 22" fill="none" stroke="#9aa1a8" stroke-width="4.5"/>
      </pattern>
      <clipPath id="clip-pneu-${uid}"><text x="0" y="0" class="mot-svg">${echap(mot)}</text></clipPath>
      <clipPath id="clip-trace-${uid}"><rect class="trace-rect" x="0" y="-400" width="0" height="800"/></clipPath>
    </defs>
    <text x="0" y="0" class="mot-svg contour">${echap(mot)}</text>
    <g clip-path="url(#clip-trace-${uid})"><rect class="motif" fill="url(#crampons-${uid})" clip-path="url(#clip-pneu-${uid})"/></g>
    <g class="roue"><circle r="38" fill="#1f2328" stroke="#9aa1a8" stroke-width="10" stroke-dasharray="7 5"/><circle r="15" fill="none" stroke="#5f666e" stroke-width="3"/></g>`;
  $$('text', svg).forEach((t) => { t.setAttribute('font-family', 'Cormorant Garamond'); t.setAttribute('font-weight', '600'); t.setAttribute('font-size', '210'); });
  const contour = $<SVGTextElement>('.contour', svg) as SVGTextElement;
  contour.setAttribute('fill', 'none'); contour.setAttribute('stroke', 'rgba(236,232,224,.35)');
  const b = contour.getBBox();
  svg.setAttribute('viewBox', `${b.x - 50} ${b.y - 60} ${b.width + 100} ${b.height + 70}`);
  const motif = $<SVGRectElement>('.motif', svg) as SVGRectElement;
  (['x', 'y', 'width', 'height'] as const).forEach((k) => motif.setAttribute(k, String({ x: b.x, y: b.y, width: b.width, height: b.height }[k])));
  const rect = $<SVGRectElement>('.trace-rect', svg) as SVGRectElement; const roue = $<SVGGElement>('.roue', svg) as SVGGElement;
  const etat = { p: calme ? 1 : 0 };
  const maj = () => {
    const x = b.x - 40 + (b.width + 80) * etat.p;
    rect.setAttribute('x', String(b.x - 40)); rect.setAttribute('width', String(Math.max(0, x - (b.x - 40))));
    roue.setAttribute('transform', `translate(${x},${b.y - 20}) rotate(${etat.p * 720})`);
    roue.style.opacity = etat.p > 0.98 || etat.p < 0.01 ? '0' : '1';
  };
  maj();
  const tl = gsap.timeline({ paused: true, onUpdate: maj }).to(etat, { p: 1, duration: 1, ease: 'none' });
  return { tl, detruire: () => { tl.kill(); svg.innerHTML = ''; } };
}
