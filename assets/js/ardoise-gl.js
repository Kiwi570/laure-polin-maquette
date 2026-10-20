/* Fond d'ardoise eclaire en lumiere rasante : le relief suit la lumiere du curseur.
   Jamais applique sur une oeuvre : uniquement sur le fond. */
import { Renderer, Program, Mesh, Triangle, Texture } from '../vendor/ogl.mjs';

const vertex = /* glsl */ `
attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D tTex; uniform vec2 uRes; uniform vec2 uTexRes; uniform vec2 uLum; uniform float uTemps; uniform float uRevele; uniform float uTeinte; uniform vec3 uCouleur;
varying vec2 vUv;
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float bruit(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x), mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x), u.y); }
float fbm(vec2 p){ float v=0., a=.5; for(int i=0;i<4;i++){ v+=a*bruit(p); p*=2.03; a*=.5; } return v; }
vec2 couvre(vec2 uv){ float ra=uRes.x/uRes.y, ta=uTexRes.x/uTexRes.y; vec2 s = ra>ta ? vec2(1., ta/ra) : vec2(ra/ta, 1.); return (uv-.5)*s+.5; }
float relief(vec2 uv){
  vec3 c = texture2D(tTex, uv).rgb;
  float l = dot(c, vec3(.299,.587,.114));
  float strates = fbm(uv*vec2(1.6, 22.)) * .6 + fbm(uv*vec2(5., 64.))*.14;
  float clive = smoothstep(.62, .66, fbm(uv*vec2(.9, 7.) + 3.1)) * .35;
  return l*1.1 + strates*.32 + clive;
}
void main(){
  vec2 uv = couvre(vUv);
  vec2 e = vec2(1.5/uRes.x, 1.5/uRes.y);
  float hx = relief(uv+vec2(e.x,0.)) - relief(uv-vec2(e.x,0.));
  float hy = relief(uv+vec2(0.,e.y)) - relief(uv-vec2(0.,e.y));
  vec3 n = normalize(vec3(-hx*3.6, -hy*3.6, 1.));
  vec3 alb = texture2D(tTex, uv).rgb * 1.15;
  alb = mix(alb, alb*uCouleur*2.2, uTeinte);
  vec2 frag = vUv*uRes;
  vec3 lp = vec3(uLum, max(uRes.x,uRes.y)*.16);
  vec3 L = normalize(lp - vec3(frag, 0.));
  float diff = max(dot(n, L), 0.);
  float d = length(uLum - frag)/max(uRes.x, uRes.y);
  float att = 1./(1. + d*d*7.);
  vec3 H = normalize(L + vec3(0.,0.,1.));
  float spec = pow(max(dot(n,H),0.), 36.) * .38;
  float mica = step(.9993, hash(floor(frag/2.5))) * pow(max(dot(n,H),0.), 10.) * att * 1.6;
  vec3 chaud = vec3(1., .9, .78);
  vec3 col = alb*(.34 + diff*att*1.55*chaud) + spec*att*chaud + mica*vec3(.82,.88,.95);
  col *= smoothstep(1.35, .2, length((vUv-.5)*vec2(1.25, 1.)));
  col *= uRevele;
  gl_FragColor = vec4(col, 1.);
}`;

export function fondArdoise(conteneur, { image = 'assets/img/ambiance/g-ardoise-relief-16x9.webp', imageMobile, teinte = 0, couleur = [0.5, 0.5, 0.5], intensiteRevele = 1 } = {}) {
  const gsap = window.gsap;
  const canvas = document.createElement('canvas');
  canvas.className = 'gl';
  canvas.setAttribute('aria-hidden', 'true');
  conteneur.prepend(canvas);
  let renderer;
  try {
    renderer = new Renderer({ canvas, dpr: Math.min(1.5, devicePixelRatio || 1), alpha: false, antialias: false });
  } catch (e) { canvas.remove(); return null; }
  const gl = renderer.gl;
  const texture = new Texture(gl, { generateMipmaps: false });
  const src = innerWidth < innerHeight && imageMobile ? imageMobile : image;
  const img = new Image();
  img.src = src;
  const geometry = new Triangle(gl);
  const program = new Program(gl, {
    vertex, fragment,
    uniforms: {
      tTex: { value: texture }, uRes: { value: [1, 1] }, uTexRes: { value: [1920, 1080] },
      uLum: { value: [0, 0] }, uTemps: { value: 0 }, uRevele: { value: 0 }, uTeinte: { value: teinte }, uCouleur: { value: couleur },
    },
  });
  const mesh = new Mesh(gl, { geometry, program });
  let w = 1, h = 1;
  const taille = () => {
    const r = conteneur.getBoundingClientRect();
    w = Math.max(1, r.width); h = Math.max(1, r.height);
    renderer.setSize(w, h);
    program.uniforms.uRes.value = [w * renderer.dpr, h * renderer.dpr];
  };
  taille();
  const ro = new ResizeObserver(taille); ro.observe(conteneur);
  const cible = { x: w * 0.68, y: h * 0.55 };
  const lum = { x: w * 0.2, y: h * 0.8 };
  let souris = false;
  const bouge = (e) => {
    const r = conteneur.getBoundingClientRect();
    cible.x = e.clientX - r.left; cible.y = e.clientY - r.top; souris = true;
  };
  addEventListener('pointermove', bouge, { passive: true });
  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { rootMargin: '80px' });
  io.observe(conteneur);
  img.onload = () => {
    texture.image = img;
    program.uniforms.uTexRes.value = [img.naturalWidth, img.naturalHeight];
    gsap.to(program.uniforms.uRevele, { value: intensiteRevele, duration: 2.2, ease: 'power2.out' });
  };
  let t0 = performance.now();
  const boucle = () => {
    if (!visible) return;
    const t = (performance.now() - t0) / 1000;
    if (!souris) { cible.x = w * (0.55 + Math.sin(t * 0.23) * 0.3); cible.y = h * (0.45 + Math.cos(t * 0.17) * 0.25); }
    lum.x += (cible.x - lum.x) * 0.06; lum.y += (cible.y - lum.y) * 0.06;
    program.uniforms.uLum.value = [lum.x * renderer.dpr, (h - lum.y) * renderer.dpr];
    program.uniforms.uTemps.value = t;
    renderer.render({ scene: mesh });
  };
  gsap.ticker.add(boucle);
  return {
    canvas, program,
    teinter(couleurHex, force = 0.35) {
      const c = couleurHex.match(/\w\w/g).map((x) => parseInt(x, 16) / 255);
      gsap.to(program.uniforms.uCouleur.value, { 0: c[0], 1: c[1], 2: c[2], duration: 1.2 });
      gsap.to(program.uniforms.uTeinte, { value: force, duration: 1.2 });
    },
    detruire() { gsap.ticker.remove(boucle); ro.disconnect(); io.disconnect(); removeEventListener('pointermove', bouge); gl.getExtension('WEBGL_lose_context')?.loseContext(); canvas.remove(); },
  };
}
