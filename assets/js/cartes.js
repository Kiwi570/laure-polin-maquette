/* Gabarits communs : image d'oeuvre, carte de salle, carte petit format, vignette. */
import LP from './base.js';

const e = LP.esc;

export function imgOeuvre(o, { sizes = '40vw', cls = 'oeuvre', charge = 'lazy', style = '' } = {}) {
  const v = LP.visuel(o);
  if (!v) {
    return `<div class="${cls} oeuvre-absente" style="${style}" role="img" aria-label="${e(o.titre)} : photo à compléter"><svg viewBox="0 0 120 160" width="120" height="160" aria-hidden="true"><rect x="40" y="128" width="40" height="22" fill="#2c333b"/><path d="M60 30c14 10 18 34 10 60s-8 34-10 38c-4-6-14-22-12-44s4-44 12-54z" fill="none" stroke="#8a929b" stroke-dasharray="3 4"/></svg><span class="mini" aria-hidden="true" data-txt="Photo à compléter"></span></div>`;
  }
  const opaque = o.detoure ? '0' : '1';
  return `<img class="${cls}" src="${LP.src(v, 800)}" srcset="${LP.srcset(v)}" sizes="${sizes}" alt="${e(altOeuvre(o))}" width="${v.w}" height="${v.h}" loading="${charge}" decoding="async" data-opaque="${opaque}" style="${style}">`;
}

export function altOeuvre(o) {
  const m = LP.matiereCourte(o);
  return `${o.titre}${m ? `, sculpture en ${m.toLowerCase()}` : ''}, de Laure Polin`;
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
  return `<button class="ajout${dedans ? ' dans-panier' : ''}" type="button" data-ajout="${o.id}" aria-label="${dedans ? `${e(o.titre)} est dans le panier` : `Ajouter ${e(o.titre)} au panier`}">${dedans ? LP.ICO.ok : LP.ICO.plus}</button>`;
}

/** Carte d'oeuvre posee sur un socle (salles). hauteurPx = hauteur d'affichage de l'oeuvre */
export function carteOeuvre(o, { hauteurPx = 420, sizes = '(max-width: 860px) 70vw, 30vw' } = {}) {
  const v = LP.visuel(o);
  const ratio = v ? v.w / v.h : 0.7;
  const largeur = Math.max(160, Math.round(hauteurPx * ratio));
  const visuel = o.detoure
    ? `<div class="socle-zone" style="height:${hauteurPx}px"><span class="halo-mur" aria-hidden="true"></span>${imgOeuvre(o, { sizes, style: `height:${hauteurPx}px` })}<span class="ombre-sol" aria-hidden="true" style="width:${Math.min(largeur * 1.1, 380)}px"></span></div>`
    : `<div class="socle-zone" style="height:${hauteurPx}px"><div class="photo-cadre">${imgOeuvre(o, { sizes, style: `height:${hauteurPx - 20}px` })}</div></div>`;
  return `<article class="oeuvre-carte" data-carte data-id="${o.id}" data-couleur="${o.couleur}" style="width:${Math.max(largeur, 220)}px">
    <a href="${LP.lienOeuvre(o)}" data-curseur="Voir" aria-label="${e(o.titre)}, voir la fiche">${visuel}</a>
    <div class="cartel">
      <div>${cartelHTML(o)}</div>
      ${boutonAjout(o)}
    </div>
  </article>`;
}

export function cartePetit(o) {
  return `<article class="carte-petit" data-carte data-tilt>
    <a class="vitrine" href="${LP.lienOeuvre(o)}" data-curseur="Voir" aria-label="${e(o.titre)}, voir la fiche">${imgOeuvre(o, { sizes: '(max-width: 600px) 80vw, 260px' })}<span class="reflet" aria-hidden="true"></span></a>
    <div class="cartel"><div>${cartelHTML(o)}</div>${boutonAjout(o)}</div>
  </article>`;
}

export function vignette(o) {
  const v = o.photos.find((p) => p.role !== 'signature');
  if (!v) return '';
  return `<a class="vignette" href="${LP.lienOeuvre(o)}" data-curseur="Voir">
    <img src="${LP.src(v, 600)}" alt="${e(altOeuvre(o))}" width="${v.w}" height="${v.h}" loading="lazy" decoding="async">
    <span class="legende"><strong style="font-family:var(--f-display);font-size:1.15rem;font-weight:500">${e(o.titre)}</strong><br>En collection privée</span>
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
    if (!nom) manque.push(['nom', 'votre nom']);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) manque.push(['email', 'une adresse e-mail valide']);
    if (!msg) manque.push(['message', 'un message']);
    Object.entries(champs).forEach(([k, c]) => {
      const ko = manque.some(([m]) => m === k);
      if (ko) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid');
      if (ko) c.setAttribute('aria-describedby', err.id); else c.removeAttribute('aria-describedby');
    });
    if (manque.length) { err.textContent = `Il manque ${manque.map(([, t]) => t).join(', ')}.`; champs[manque[0][0]].focus(); return; }
    err.textContent = '';
    const oeuvre = titreOeuvre();
    f.innerHTML = `<div class="confirmation" role="status" tabindex="-1"><p class="lead" style="margin-bottom:.5em">Merci ${LP.esc(nom)}.</p><p style="margin:0">Votre demande${oeuvre ? ` au sujet de « ${LP.esc(oeuvre)} »` : ''} est prête. Dans cette maquette, rien n’est envoyé : sur le site final, elle arrivera directement à Laure Polin, qui vous répondra à l’adresse ${LP.esc(mail)}.</p></div>`;
    f.querySelector('.confirmation').focus();
    if (LP.son.actif) LP.son.coup(0.8);
  });
}
