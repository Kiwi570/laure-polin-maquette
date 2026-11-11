/* Données réelles du site : Wix Stores (catalogue V3), catégories, panier Wix (Cart V2).
   Appels faits depuis le navigateur du visiteur : dans un composant de site, l'authentification
   est fournie par Wix (identité visiteur ou membre), aucun client à créer.
   Documentation vérifiée :
   - productsV3.queryProducts(query, { fields }) — filtre _id $in, champs INFO_SECTION, MEDIA_ITEMS_INFO…
   - categories.queryCategories(query, { treeReference, returnNonVisibleCategories })
   - categories.listItemsInCategory(id, treeReference, { useCategoryArrangement: true })
   - currentCartV2.getCurrentCart() / addLineItemsToCurrentCart({ catalogItems })
   Les résultats sont partagés entre composants (window.__lpDonnees), chacun étant un paquet séparé. */
import { productsV3 } from '@wix/stores';
import { categories } from '@wix/categories';
import { currentCartV2 } from '@wix/ecom';

export const APP_STORES = '215238eb-22a5-4c36-9e7b-e7c08025e04e';
const ARBRE = { appNamespace: '@wix/stores' };

export type Photo = { url: string; uri: string; w: number; h: number; alt: string };
export type Oeuvre = {
  id: string;
  slug: string;
  titre: string;
  prix: number | null;
  photos: Array<Photo>;
  matiere: string;
  technique: string;
  dimensions: string;
  hauteur: number | null;
  edition: string;
  lien: string;
  /** stock épuisé (quantité 0) : affichée « Vendue », pas d'ajout au panier */
  vendue: boolean;
};
export type Categorie = { id: string; nom: string; slug: string; nombre: number; visible: boolean; lien: string };

type Cache = {
  categories?: Promise<Array<Categorie>>;
  oeuvres: Record<string, Promise<Array<Oeuvre>>>;
  couleurs: Record<string, Promise<Couleurs>>;
  panier?: Promise<EtatPanier>;
};
declare global {
  interface Window { __lpDonnees?: Cache; __lpEtatPanier?: EtatPanier }
}
const cache = (): Cache => {
  if (!window.__lpDonnees) window.__lpDonnees = { oeuvres: {}, couleurs: {} };
  return window.__lpDonnees;
};

/* ---------- formats (identiques à la maquette) ---------- */
const fmtFr = typeof Intl !== 'undefined' ? new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }) : null;
const fmtEn = typeof Intl !== 'undefined' ? new Intl.NumberFormat('en-GB', { maximumFractionDigits: 0 }) : null;
/** « 2 800 € » en français, « €2,800 » en anglais (LP.prix) */
export const prix = (n: number | null | undefined, langue: 'fr' | 'en' = 'fr'): string => {
  if (!n) return langue === 'en' ? 'Price on request' : 'Prix sur demande';
  return langue === 'en' ? `€${fmtEn ? fmtEn.format(n) : String(n)}` : `${fmtFr ? fmtFr.format(n) : String(n)} €`;
};
export const lienProduit = (slug: string): string => `/product-page/${slug}`;
export const lienCategorie = (slug: string): string => `/category/${slug}`;

/* ---------- images Wix ---------- */
/** wix:image://v1/<id>/<nom>#originWidth=..&originHeight=.. ou une adresse http(s) */
export function imageWix(src: string | undefined, w0 = 0, h0 = 0): { url: string; uri: string; w: number; h: number; nom: string } {
  if (!src) return { url: '', uri: '', w: w0, h: h0, nom: '' };
  const m = /^wix:image:\/\/v1\/([^/]+)\/([^#]*)(?:#(.*))?$/.exec(src);
  if (m) {
    const q = new URLSearchParams(m[3] || '');
    return {
      url: `https://static.wixstatic.com/media/${m[1]}`,
      uri: m[1],
      w: Number(q.get('originWidth')) || w0,
      h: Number(q.get('originHeight')) || h0,
      nom: decodeURIComponent(m[2] || 'image.webp'),
    };
  }
  const s = /static\.wixstatic\.com\/media\/([^/?#]+)/.exec(src);
  return { url: src, uri: s ? s[1] : '', w: w0, h: h0, nom: 'image.webp' };
}
/** adresse redimensionnée par Wix (« fit », proportions gardées) ; sans uri : l'adresse telle quelle */
export function tailleWix(p: { url: string; uri: string; w?: number; h?: number }, largeur: number): string {
  if (!p.uri) return p.url;
  const r = p.w && p.h ? p.h / p.w : 1.4;
  const w = Math.round(largeur);
  const h = Math.round(largeur * r);
  return `https://static.wixstatic.com/media/${p.uri}/v1/fit/w_${w},h_${h},q_90,enc_auto/image.webp`;
}
export function srcsetWix(p: { url: string; uri: string; w?: number; h?: number }, largeurs: Array<number> = [800, 1600]): string | undefined {
  if (!p.uri) return undefined;
  const max = p.w || 1600;
  const l = largeurs.filter((x) => x <= max);
  if (!l.length) l.push(max);
  return l.map((x) => `${tailleWix(p, x)} ${x}w`).join(', ');
}

/* ---------- catégories ---------- */
type CatBrute = { _id?: string; name?: string; slug?: string; itemCounter?: number; visible?: boolean };
async function toutesCategories(): Promise<Array<Categorie>> {
  const lire = async (nonVisibles: boolean): Promise<Array<CatBrute>> => {
    const res = await categories.queryCategories(
      { cursorPaging: { limit: 100 } },
      { treeReference: ARBRE, returnNonVisibleCategories: nonVisibles },
    );
    return ((res as unknown as { categories?: Array<CatBrute> }).categories) || [];
  };
  let liste: Array<CatBrute> = [];
  try {
    liste = await lire(true);
  } catch (e) {
    // si le visiteur ne peut pas lire les catégories masquées, on lit au moins les visibles
    liste = await lire(false);
  }
  return liste.map((c) => ({
    id: c._id || '',
    nom: c.name || '',
    slug: c.slug || '',
    nombre: c.itemCounter || 0,
    visible: c.visible !== false,
    lien: c.slug ? lienCategorie(c.slug) : '',
  }));
}
const norm = (s: string) => s.normalize('NFC').replace(/[‐-―]/g, '-').replace(/[‘’ʼ`]/g, "'").replace(/\s+/g, ' ').trim().toLowerCase();
export async function categorie(nom: string): Promise<Categorie | null> {
  const c = cache();
  if (!c.categories) c.categories = toutesCategories().catch((e) => { c.categories = undefined; throw e; });
  const liste = await c.categories;
  return liste.find((x) => norm(x.nom) === norm(nom)) || null;
}

/* ---------- produits ---------- */
type MediaBrut = { _id?: string; image?: string | { url?: string; width?: number; height?: number }; url?: string; altText?: string; mediaType?: string };
type ProduitBrut = {
  _id?: string;
  slug?: string;
  name?: string;
  actualPriceRange?: { minValue?: { amount?: string } };
  media?: { main?: MediaBrut; itemsInfo?: { items?: Array<MediaBrut> } };
  infoSections?: Array<{ title?: string; uniqueName?: string; plainDescription?: string }>;
  inventory?: { availabilityStatus?: string };
};

const decoder = (s: string) => s
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, '’')
  .trim();
/** lit les lignes « Matière : … » de la section « Caractéristiques », quelle que soit la mise en forme
   du libellé : Wix enregistre le gras en <span style="font-weight: 700">, l'éditeur peut écrire <strong> ou <b> */
export function caracteristiques(html: string): Record<string, string> {
  const r: Record<string, string> = {};
  const re = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    const ligne = decoder(m[1]).replace(/\u00a0/g, ' ');
    const k = /^([^:]{1,40}?)\s*:\s*([\s\S]+)$/.exec(ligne);
    if (k) r[k[1].trim().toLowerCase()] = k[2].trim();
  }
  return r;
}
const hauteurDe = (dims: string): number | null => {
  const m = /\bH\s*([\d]+(?:[.,]\d+)?)/.exec(dims);
  return m ? parseFloat(m[1].replace(',', '.')) : null;
};
function versOeuvre(p: ProduitBrut): Oeuvre {
  const items = p.media?.itemsInfo?.items?.length ? p.media.itemsInfo.items : (p.media?.main ? [p.media.main] : []);
  const photos: Array<Photo> = items
    .filter((it) => !it.mediaType || it.mediaType === 'IMAGE')
    .map((it) => {
      const brut = typeof it.image === 'string' ? it.image : (it.image?.url || it.url || '');
      const w = typeof it.image === 'object' && it.image ? it.image.width || 0 : 0;
      const h = typeof it.image === 'object' && it.image ? it.image.height || 0 : 0;
      const i = imageWix(brut, w, h);
      return { url: i.url, uri: i.uri, w: i.w || 800, h: i.h || 1120, alt: it.altText || '' };
    })
    .filter((x) => x.url);
  const sec = (p.infoSections || []).find((s) => /caract/i.test(s.title || s.uniqueName || '')) || (p.infoSections || [])[0];
  const c = sec?.plainDescription ? caracteristiques(sec.plainDescription) : {};
  const montant = p.actualPriceRange?.minValue?.amount;
  const dims = c.dimensions || '';
  return {
    id: p._id || '',
    slug: p.slug || '',
    titre: p.name || '',
    prix: montant ? Number(montant) : null,
    photos,
    matiere: c['matière'] || c.matiere || '',
    technique: c.technique || '',
    dimensions: dims,
    hauteur: hauteurDe(dims),
    edition: c['édition'] || c.edition || '',
    lien: p.slug ? lienProduit(p.slug) : '',
    vendue: p.inventory?.availabilityStatus === 'OUT_OF_STOCK',
  };
}

async function produitsParIds(ids: Array<string>): Promise<Array<Oeuvre>> {
  const res: Array<Oeuvre> = [];
  for (let i = 0; i < ids.length; i += 100) {
    const lot = ids.slice(i, i + 100);
    const r = await productsV3.queryProducts(
      { filter: { _id: { $in: lot } }, cursorPaging: { limit: 100 } },
      { fields: ['INFO_SECTION', 'INFO_SECTION_PLAIN_DESCRIPTION', 'MEDIA_ITEMS_INFO', 'CURRENCY'] },
    );
    const produits = ((r as unknown as { products?: Array<ProduitBrut> }).products) || [];
    res.push(...produits.map(versOeuvre));
  }
  const parId = new Map(res.map((o) => [o.id, o]));
  return ids.map((id) => parId.get(id)).filter((x): x is Oeuvre => !!x);
}

async function idsDeCategorie(id: string): Promise<Array<string>> {
  const ids: Array<string> = [];
  let curseur: string | undefined;
  for (let page = 0; page < 10; page++) {
    const r = await categories.listItemsInCategory(id, ARBRE, {
      useCategoryArrangement: true,
      cursorPaging: curseur ? { limit: 100, cursor: curseur } : { limit: 100 },
    });
    const brut = r as unknown as { items?: Array<{ catalogItemId?: string; appId?: string }>; pagingMetadata?: { cursors?: { next?: string }; hasNext?: boolean } };
    (brut.items || []).forEach((it) => { if (it.catalogItemId && (!it.appId || it.appId === APP_STORES)) ids.push(it.catalogItemId); });
    curseur = brut.pagingMetadata?.cursors?.next || undefined;
    if (!curseur) break;
  }
  return ids;
}

/** les œuvres d'une catégorie, dans l'ordre de la catégorie (agencement manuel) */
export function oeuvresDe(nomCategorie: string): Promise<Array<Oeuvre>> {
  const c = cache();
  const k = norm(nomCategorie);
  if (!c.oeuvres[k]) {
    c.oeuvres[k] = (async () => {
      const cat = await categorie(nomCategorie);
      if (!cat) return [];
      return produitsParIds(await idsDeCategorie(cat.id));
    })().catch((e) => { delete c.oeuvres[k]; throw e; });
  }
  return c.oeuvres[k];
}

/* ---------- panier Wix ---------- */
export type EtatPanier = { nombre: number; ids: Array<string> };
type LigneBrute = { quantity?: number; quantityInfo?: { requestedQuantity?: number; confirmedQuantity?: number }; catalogReference?: { catalogItemId?: string } };
const lireEtat = (brut: unknown): EtatPanier => {
  const b = brut as { cart?: { lineItems?: Array<LigneBrute> }; lineItems?: Array<LigneBrute> };
  const lignes = b?.cart?.lineItems || b?.lineItems || [];
  return {
    nombre: lignes.reduce((s, l) => s + (l.quantityInfo?.requestedQuantity || l.quantity || 1), 0),
    ids: lignes.map((l) => l.catalogReference?.catalogItemId || '').filter(Boolean),
  };
};
export function etatPanier(forcer = false): Promise<EtatPanier> {
  const c = cache();
  if (!c.panier || forcer) {
    c.panier = currentCartV2.getCurrentCart()
      .then(lireEtat)
      .catch((): EtatPanier => ({ nombre: 0, ids: [] }))
      .then((e) => { window.__lpEtatPanier = e; window.dispatchEvent(new CustomEvent('lp:panier-etat', { detail: e })); return e; });
  }
  return c.panier;
}

export type DetailAjout = { titre: string; image?: string; depuis?: DOMRect | null; etat?: EtatPanier; erreur?: boolean; deja?: boolean };
/** ajoute une œuvre au panier Wix (variante unique des sculptures), puis prévient l'en-tête */
export async function ajouterAuPanier(o: Pick<Oeuvre, 'id' | 'titre' | 'photos' | 'vendue'>, depuis?: Element | null, unique = true): Promise<boolean> {
  if (o.vendue) return false;
  const rect = depuis ? (depuis.closest('[data-carte]')?.querySelector('img') || depuis).getBoundingClientRect() : null;
  const image = o.photos[0] ? tailleWix(o.photos[0], 200) : undefined;
  try {
    const avant = await etatPanier();
    if (unique && avant.ids.includes(o.id)) {
      window.dispatchEvent(new CustomEvent<DetailAjout>('lp:panier', { detail: { titre: o.titre, image, depuis: null, etat: avant, deja: true } }));
      return true;
    }
    const prod = await productsV3.getProduct(o.id);
    const v = (prod as unknown as { variantsInfo?: { variants?: Array<{ _id?: string; id?: string }> } }).variantsInfo?.variants?.[0];
    const variantId = v?._id || v?.id;
    const res = await currentCartV2.addLineItemsToCurrentCart({
      catalogItems: [{
        catalogReference: { catalogItemId: o.id, appId: APP_STORES, ...(variantId ? { options: { variantId } } : {}) },
        quantity: 1,
      }],
    });
    const etat = lireEtat(res);
    cache().panier = Promise.resolve(etat);
    window.__lpEtatPanier = etat;
    window.dispatchEvent(new CustomEvent('lp:panier-etat', { detail: etat }));
    window.dispatchEvent(new CustomEvent<DetailAjout>('lp:panier', { detail: { titre: o.titre, image, depuis: rect, etat } }));
    return true;
  } catch (e) {
    window.dispatchEvent(new CustomEvent<DetailAjout>('lp:panier', { detail: { titre: o.titre, erreur: true } }));
    return false;
  }
}

/* ---------- couleurs d'une photo : fond (bord de la photo) et teinte de l'œuvre ----------
   La maquette les lisait dans ses données (photos[].fond, couleur) ; ici elles sont mesurées
   sur la photo Wix (servie avec Access-Control-Allow-Origin: *). */
export type Couleurs = { fond: string; couleur: string };
const hex = (r: number, g: number, b: number) => `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')}`;
export function couleursPhoto(url: string): Promise<Couleurs> {
  const c = cache();
  if (!url) return Promise.resolve({ fond: '#e6e6e4', couleur: '#171b20' });
  if (!c.couleurs[url]) {
    c.couleurs[url] = new Promise<Couleurs>((ok) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      const repli = () => ok({ fond: '#e6e6e4', couleur: '#3c444e' });
      img.onerror = repli;
      img.onload = () => {
        try {
          const L = 48;
          const H = Math.max(8, Math.round((L * img.naturalHeight) / img.naturalWidth));
          const cv = document.createElement('canvas');
          cv.width = L; cv.height = H;
          const x = cv.getContext('2d', { willReadFrequently: true });
          if (!x) { repli(); return; }
          x.drawImage(img, 0, 0, L, H);
          const d = x.getImageData(0, 0, L, H).data;
          let fr = 0, fg = 0, fb = 0, fn = 0;
          for (let yy = 0; yy < H; yy++) for (let xx = 0; xx < L; xx++) {
            if (xx > 1 && xx < L - 2 && yy > 1 && yy < H - 2) continue;
            const i = (yy * L + xx) * 4; fr += d[i]; fg += d[i + 1]; fb += d[i + 2]; fn++;
          }
          fr /= fn; fg /= fn; fb /= fn;
          let cr = 0, cg = 0, cb = 0, cn = 0;
          for (let i = 0; i < d.length; i += 4) {
            const dist = Math.abs(d[i] - fr) + Math.abs(d[i + 1] - fg) + Math.abs(d[i + 2] - fb);
            if (dist > 60) { cr += d[i]; cg += d[i + 1]; cb += d[i + 2]; cn++; }
          }
          ok({ fond: hex(fr, fg, fb), couleur: cn ? hex(cr / cn, cg / cn, cb / cn) : hex(fr * 0.4, fg * 0.4, fb * 0.4) });
        } catch (e) { repli(); }
      };
      img.src = tailleWix(imageWix(url), 96) || url;
    });
  }
  return c.couleurs[url];
}

/** couleur assombrie pour teinter un fond d'ardoise (cartes.js, teinteSombre) */
export function teinteSombre(couleur: string, force = 0.22): string {
  const c = (couleur.match(/\w\w/g) || ['17', '1b', '20']).slice(0, 3).map((x) => parseInt(x, 16));
  const base = [23, 27, 32];
  const m = c.map((v, i) => Math.round(base[i] * (1 - force) + v * force));
  return `rgb(${m.join(',')})`;
}
