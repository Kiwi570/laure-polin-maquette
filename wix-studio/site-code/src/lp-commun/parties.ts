/* Parties internes éditables (manifeste « elements » des Editor React Components) :
   Wix transmet leurs données dans props.elementProps.<partie>. Ces aides lisent ces données avec des
   valeurs de repli (le champ du bloc, puis la valeur par défaut), pour que le contenu existant reste affiché
   tant que le client n'a rien changé, et qu'un champ vidé ne laisse pas un trou dans la page. */
import type { Image } from '@wix/editor-react-types';
import { imageWix } from './donnees';
import type { Langue } from './langue';

/** Données éditoriales qu'une partie peut porter (jamais posées comme attributs HTML). */
export type DonneesPartie = { texte?: string; texteEn?: string; image?: Image; altEn?: string };
const CLES_DONNEES = ['texte', 'texteEn', 'image', 'altEn'];

/** Ce qui peut aller sur l'élément HTML : tout l'entrée elementProps sauf les données éditoriales. */
export function domDePartie<T extends object>(entree: T | undefined): Partial<T> {
  if (!entree) return {};
  const r: Record<string, unknown> = {};
  Object.entries(entree).forEach(([k, v]) => { if (!CLES_DONNEES.includes(k)) r[k] = v; });
  return r as Partial<T>;
}

/** Texte de la partie dans la langue de la page, sinon le texte de repli (champ du bloc déjà traduit). */
export function texteDePartie(entree: DonneesPartie | undefined, langue: Langue, repli?: string): string {
  const v = langue === 'en' ? entree?.texteEn : entree?.texte;
  return (typeof v === 'string' && v.trim()) ? v : (repli || '');
}

/** Image de la partie (médiathèque Wix) ramenée à { url, uri, w, h, alt }, sinon l'image de repli. */
export function imageDePartie(
  entree: DonneesPartie | undefined,
  langue: Langue,
  repli?: { url?: string; uri?: string; width?: number; height?: number; alt?: string },
  altEnRepli?: string,
): { url: string; uri: string; w: number; h: number; alt: string } | null {
  const img = entree?.image;
  const source = img && (img.uri || img.url) ? img : repli;
  if (!source || !(source.uri || source.url)) return null;
  // l'uri d'une image choisie dans la médiathèque peut être « wix:image://v1/… », un nom de fichier ou une adresse
  const brut = source.uri && !source.uri.startsWith('wix:') && !source.uri.includes('/') ? `https://static.wixstatic.com/media/${source.uri}` : (source.uri || source.url || '');
  const i = imageWix(brut, source.width || 0, source.height || 0);
  const altFr = source.alt || '';
  const altEn = (source === img ? entree?.altEn : '') || altEnRepli || altFr;
  return { url: i.url || source.url || '', uri: i.uri, w: i.w || source.width || 1600, h: i.h || source.height || 1066, alt: langue === 'en' ? altEn : altFr };
}
