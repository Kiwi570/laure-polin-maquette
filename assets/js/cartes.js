/* Gabarits communs : image d'oeuvre, carte de salle, carte petit format, vignette. */
import LP from './base.js?v=20261028';

const e = LP.esc;
const tr = LP.tr;

export function imgOeuvre(o, { sizes = '40vw', cls = 'oeuvre', charge = 'lazy', style = '' } = {}) {
  const v = LP.visuel(o);
  if (!v) {
    const txt = tr('Photo à compléter', 'Photo to come');
    return `<div class="${cls} oeuvre-absente" style="${style}" role="img" aria-label="${e(o.titre)} : ${txt.toLowerCase()}"><svg viewBox="0 0 120 160" width="120" height="160" aria-hidden="true"><rect x="40" y="128" width="40" height="22" fill="#2c333b"/><path d="M60 30c14 10 18 34 10 60s-8 34-10 38c-4-6-14-22-12-44s4-44 12-54z" fill="none" stroke="#8a929b" stroke-dasharray="3 4"/></svg><span class="mini" aria-hidden="true" data-txt="${txt}"></span></div>`;
  }
  return `<img class="${cls}" src="${LP.src(v, 800)}" srcset="${LP.srcset(v)}" sizes="${sizes}" alt="${e(altOeuvre(o))}" width="${v.w}" height="${v.h}" loading="${charge}" decoding="async" data-opaque="1" style="${style}">`;
}

export function altOeuvre(o) {
  const m = LP.matiereCourte(o);
  return tr(`${o.titre}${m ? `, sculpture en ${m.toLowerCase()}` : ''}, de Laure Polin`, `${o.titre}${m ? `, ${m.toLowerCase()} sculpture` : ''} by Laure Polin`);
}

export function cartelHTML(o, { prix = true, etat = true } = {}) {
  const st = LP.statut(o);
  const tech = LP.matiereCourte(o);
  const dims = LP.dims(o);
  const prixTxt = prix && o.statut === 'disponible' ? `<span class="prix">${LP.prix(o.prix)}</span>` : '';
  return `<strong>${e(o.titre)}</strong>${tech ? `${e(tech)}` : ''}${tech && dims ? ', ' : ''}${dims ? `<span class="chiffres">${e(dims)}</span>` : ''}${prixTxt ? `<br>${prixTxt}` : ''}${etat && o.statut !== 'disponible' ? `<br><span class="etat ${st.cls}">${st.txt}</span>` : ''}`;
}

export function boutonAjout(o) {
  if (o.statut !== 'disponible' || !o.prix) return '';
  const dedans = LP.panier.a(o.id);
  return `<button class="ajout${dedans ? ' dans-panier' : ''}" type="button" data-ajout="${o.id}" aria-label="${dedans ? tr(`${e(o.titre)} est dans le panier`, `${e(o.titre)} is in your basket`) : tr(`Ajouter ${e(o.titre)} au panier`, `Add ${e(o.titre)} to your basket`)}">${dedans ? LP.ICO.ok : LP.ICO.plus}</button>`;
}

const voirFiche = (o) => tr(`${e(o.titre)}, voir la fiche`, `${e(o.titre)}, view the work`);

/** Carte d'oeuvre (salles) : la photo entiere dans un cadre. hauteurPx = hauteur d'affichage */
export function carteOeuvre(o, { hauteurPx = 420, sizes = '(max-width: 860px) 70vw, 30vw' } = {}) {
  const v = LP.visuel(o);
  const ratio = v ? v.w / v.h : 0.7;
  const hImg = hauteurPx - 20;
  const largeur = Math.max(160, Math.round(hImg * ratio) + 20);
  const fond = v && v.fond ? `;background-color:${v.fond}` : '';
  const visuel = `<div class="socle-zone" style="height:${hauteurPx}px"><div class="photo-cadre">${imgOeuvre(o, { sizes, style: `height:${hImg}px${fond}` })}</div></div>`;
  return `<article class="oeuvre-carte" data-carte data-id="${o.id}" data-couleur="${o.couleur}" style="width:${Math.max(largeur, 220)}px">
    <a href="${LP.lienOeuvre(o)}" aria-label="${voirFiche(o)}">${visuel}</a>
    <div class="cartel">
      <div>${cartelHTML(o)}</div>
      ${boutonAjout(o)}
    </div>
  </article>`;
}

export function cartePetit(o) {
  const v = LP.visuel(o);
  const fond = v && v.fond ? ` style="--fond:${v.fond}"` : '';
  return `<article class="carte-petit" data-carte data-tilt>
    <a class="vitrine" href="${LP.lienOeuvre(o)}" aria-label="${voirFiche(o)}"${fond}>${imgOeuvre(o, { sizes: '(max-width: 600px) 80vw, 260px' })}<span class="reflet" aria-hidden="true"></span></a>
    <div class="cartel"><div>${cartelHTML(o)}</div>${boutonAjout(o)}</div>
  </article>`;
}

export function vignette(o) {
  const v = LP.visuel(o);
  if (!v) return '';
  return `<a class="vignette" href="${LP.lienOeuvre(o)}">
    <img src="${LP.src(v, 600)}" alt="${e(altOeuvre(o))}" width="${v.w}" height="${v.h}" loading="lazy" decoding="async">
    <span class="legende"><strong style="font-family:var(--f-display);font-size:1.15rem;font-weight:500">${e(o.titre)}</strong><br>${tr('En collection privée', 'In a private collection')}</span>
  </a>`;
}

/** couleur assombrie pour teinter un fond d'ardoise */
export function teinteSombre(hex, force = 0.22) {
  const c = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  const base = [23, 27, 32];
  const m = c.map((v, i) => Math.round(base[i] * (1 - force) + v * force));
  return `rgb(${m.join(',')})`;
}

/** Formulaire de demande (simule) : validation, messages d'erreur relies aux champs, confirmation. */
export function monterFormulaire(f, titreOeuvre = () => null) {
  const err = f.querySelector('[data-erreur]');
  const champs = { nom: f.nom, email: f.email, message: f.message };
  Object.values(champs).forEach((c) => c && c.addEventListener('input', () => c.removeAttribute('aria-invalid')));
  if (err && !err.id) err.id = `erreur-${Math.random().toString(36).slice(2, 7)}`;
  f.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const nom = f.nom.value.trim(); const mail = f.email.value.trim(); const msg = f.message.value.trim();
    const manque = [];
    if (!nom) manque.push(['nom', tr('votre nom', 'your name')]);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) manque.push(['email', tr('une adresse e-mail valide', 'a valid email address')]);
    if (!msg) manque.push(['message', tr('un message', 'a message')]);
    Object.entries(champs).forEach(([k, c]) => {
      const ko = manque.some(([m]) => m === k);
      if (ko) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
      if (ko) c.setAttribute('aria-describedby', err.id); else c.removeAttribute('aria-describedby');
    });
    if (manque.length) { err.textContent = `${tr('Il manque', 'Missing:')} ${manque.map(([, t]) => t).join(', ')}.`; champs[manque[0][0]].focus(); return; }
    err.textContent = '';
    const oeuvre = titreOeuvre();
    f.innerHTML = tr(
      `<div class="confirmation" role="status" tabindex="-1"><p class="lead" style="margin-bottom:.5em">Merci ${LP.esc(nom)}.</p><p style="margin:0">Votre demande${oeuvre ? ` au sujet de « ${LP.esc(oeuvre)} »` : ''} est prête. Dans cette maquette, rien n’est envoyé : sur le site final, elle arrivera directement à Laure Polin, qui vous répondra à l’adresse ${LP.esc(mail)}.</p></div>`,
      `<div class="confirmation" role="status" tabindex="-1"><p class="lead" style="margin-bottom:.5em">Thank you, ${LP.esc(nom)}.</p><p style="margin:0">Your request${oeuvre ? ` about “${LP.esc(oeuvre)}”` : ''} is ready. In this mock-up nothing is sent: on the final site it will go straight to Laure Polin, who will reply to ${LP.esc(mail)}.</p></div>`);
    f.querySelector('.confirmation').focus();
  });
}
