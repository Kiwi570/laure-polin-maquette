/* Poussiere d'ardoise : une oeuvre se rassemble a partir d'un nuage de particules,
   puis la vraie photo s'affiche intacte. Utilise seulement pendant le passage d'une oeuvre a l'autre. */
import { Renderer, Program, Mesh, Geometry } from '../vendor/ogl.mjs';

const vertex = /* glsl */ `
attribute vec2 aDepart; attribute vec2 aCible; attribute vec3 aCouleur; attribute vec4 aAlea;
uniform float uP; uniform vec2 uRes; uniform float uTaille; uniform float uTemps;
varying vec3 vC; varying float vA;
void main(){
  float delai = aAlea.x * .42 + aAlea.w * .08;
  float t = clamp((uP - delai) / .58, 0., 1.);
  float e = 1. - pow(1. - t, 3.);
  vec2 houle = vec2(sin(aAlea.y*6.2831 + uTemps*1.3), cos(aAlea.z*6.2831 + uTemps*1.1)) * 46. * (1. - e);
  vec2 p = mix(aDepart, aCible, e) + houle;
  vec2 clip = p / uRes * 2. - 1.; clip.y = -clip.y;
  gl_Position = vec4(clip, 0., 1.);
  gl_PointSize = uTaille * (1. + (1. - e) * (.6 + aAlea.w * 1.6));
  vC = mix(vec3(.80, .79, .76), aCouleur, smoothstep(.15, .85, e));
  vA = mix(.32, 1., e);
}`;
const fragment = /* glsl */ `
precision mediump float;
varying vec3 vC; varying float vA;
void main(){
  vec2 c = gl_PointCoord - .5; float r = length(c);
  if (r > .5) discard;
  gl_FragColor = vec4(vC, vA * smoothstep(.5, .18, r));
}`;

const attendre = (img) => (img.complete && img.naturalWidth ? Promise.resolve() : new Promise((ok) => { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); }));

/**
 * @param {HTMLImageElement} img image deja placee (sera masquee pendant l'effet)
 * @param {HTMLElement} scene element positionne qui recoit le canvas
 * @param {{duree?:number, sens?:'assemble'|'disperse', nombre?:number, depuis?:'gauche'|'droite'|'bas'}} o
 */
export async function poussiere(img, scene, o = {}) {
  const gsap = window.gsap;
  const sens = o.sens || 'assemble';
  await attendre(img);
  if (img.decode) { try { await img.decode(); } catch (e) { /* ignore */ } }
  const rs = scene.getBoundingClientRect();
  const ri = img.getBoundingClientRect();
  if (!ri.width || !ri.height) { gsap.set(img, { opacity: 1 }); return; }
  const canvas = document.createElement('canvas');
  canvas.className = 'poussiere-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  scene.append(canvas);
  let renderer;
  try {
    renderer = new Renderer({ canvas, dpr: Math.min(2, devicePixelRatio || 1), alpha: true, premultipliedAlpha: false, antialias: false });
  } catch (e) { canvas.remove(); gsap.to(img, { opacity: sens === 'assemble' ? 1 : 0, duration: 0.6 }); return; }
  const gl = renderer.gl;
  gl.clearColor(0, 0, 0, 0);
  renderer.setSize(rs.width, rs.height);

  // echantillonnage de l'image
  const cible = o.nombre || (innerWidth < 861 ? 9000 : 20000);
  const s = Math.min(1, Math.sqrt(cible / (ri.width * ri.height * 0.45)));
  const cw = Math.max(8, Math.round(ri.width * s)); const ch = Math.max(8, Math.round(ri.height * s));
  const c2 = document.createElement('canvas'); c2.width = cw; c2.height = ch;
  const x2 = c2.getContext('2d', { willReadFrequently: true });
  // object-fit: contain -> position reelle du contenu
  const ratioImg = img.naturalWidth / img.naturalHeight; const ratioBoite = ri.width / ri.height;
  let dw = ri.width, dh = ri.height, ox = 0, oy = 0;
  if (ratioImg > ratioBoite) { dh = ri.width / ratioImg; oy = (ri.height - dh) / 2; } else { dw = ri.height * ratioImg; ox = (ri.width - dw) / 2; }
  x2.drawImage(img, ox * s, oy * s, dw * s, dh * s);
  let px;
  try { px = x2.getImageData(0, 0, cw, ch).data; } catch (e) { canvas.remove(); gsap.to(img, { opacity: 1, duration: 0.6 }); return; }
  const dep = [], cib = [], col = [], alea = [];
  const bx = ri.left - rs.left; const by = ri.top - rs.top;
  const opaque = img.dataset.opaque === '1';
  const depuis = o.depuis || 'gauche';
  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const i = (y * cw + x) * 4;
      if (px[i + 3] < 140) continue;
      if (!opaque && px[i] > 238 && px[i + 1] > 238 && px[i + 2] > 238) continue;
      const tx = bx + (x + 0.5) / s; const ty = by + (y + 0.5) / s;
      cib.push(tx, ty);
      const a = Math.random() * Math.PI * 2; const r = 120 + Math.random() * 520;
      let sx = tx + Math.cos(a) * r; let sy = ty + Math.sin(a) * r * 0.6;
      if (depuis === 'gauche') sx -= 260 + Math.random() * 420;
      if (depuis === 'droite') sx += 260 + Math.random() * 420;
      if (depuis === 'bas') sy += 200 + Math.random() * 300;
      dep.push(sx, sy);
      col.push(px[i] / 255, px[i + 1] / 255, px[i + 2] / 255);
      alea.push(Math.random() * 0.6 + (1 - y / ch) * 0.4 * (depuis === 'bas' ? 1 : 0.2), Math.random(), Math.random(), Math.random());
    }
  }
  const n = cib.length / 2;
  if (!n) { canvas.remove(); gsap.set(img, { opacity: 1 }); return; }
  const geometry = new Geometry(gl, {
    aDepart: { size: 2, data: new Float32Array(dep) },
    aCible: { size: 2, data: new Float32Array(cib) },
    aCouleur: { size: 3, data: new Float32Array(col) },
    aAlea: { size: 4, data: new Float32Array(alea) },
  });
  const program = new Program(gl, {
    vertex, fragment, transparent: true, depthTest: false, depthWrite: false,
    uniforms: { uP: { value: sens === 'assemble' ? 0 : 1 }, uRes: { value: [rs.width, rs.height] }, uTaille: { value: (1 / s) * renderer.dpr * 1.25 }, uTemps: { value: 0 } },
  });
  const mesh = new Mesh(gl, { mode: gl.POINTS, geometry, program });
  const t0 = performance.now();
  const rendre = () => { program.uniforms.uTemps.value = (performance.now() - t0) / 1000; renderer.render({ scene: mesh }); };
  gsap.ticker.add(rendre);
  const fin = () => { gsap.ticker.remove(rendre); gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove(); };
  const duree = o.duree || 1.9;
  return new Promise((ok) => {
    if (sens === 'assemble') {
      gsap.set(img, { opacity: 0 });
      gsap.timeline({ onComplete: () => { fin(); ok(); } })
        .to(program.uniforms.uP, { value: 1.02, duration: duree, ease: 'power1.inOut' })
        .to(img, { opacity: 1, duration: 0.55, ease: 'power1.out' }, duree - 0.35)
        .to(canvas, { opacity: 0, duration: 0.5 }, duree - 0.2);
    } else {
      gsap.timeline({ onComplete: () => { fin(); ok(); } })
        .to(img, { opacity: 0, duration: 0.3 }, 0)
        .to(program.uniforms.uP, { value: 0, duration: duree * 0.8, ease: 'power2.in' }, 0)
        .to(canvas, { opacity: 0, duration: 0.35 }, duree * 0.8 - 0.3);
    }
  });
}
