/* Langue de la page (Wix Multilingual, adresses en sous-dossier : les pages anglaises sont sous /en/…).
   - Vérifié dans la documentation : la Site SDK « Locale » ne donne que la langue PRINCIPALE du site
     (« this is the main language, even when a site visitor views the site in another language »),
     et rien n'indique que Wix Multilingual traduise les réglages d'un composant sur mesure.
   - Donc : la langue est lue dans l'adresse de la page (useCurrentUrl, identique serveur / navigateur),
     et chaque texte a sa version anglaise dans un réglage « …En » (valeurs par défaut : l'anglais de la maquette). */
import { useCurrentUrl, useSiteUrl } from '@wix/react-component-utils';

export type Langue = 'fr' | 'en';

const lireUrl = (): { page: string; site: string } => {
  let page = ''; let site = '';
  try { page = useCurrentUrl(); } catch (e) { page = ''; }
  try { site = useSiteUrl(); } catch (e) { site = ''; }
  if (!page && typeof window !== 'undefined') page = window.location.href;
  return { page, site };
};
const base = (site: string): string => { try { return new URL(site).pathname.replace(/\/$/, ''); } catch (e) { return ''; } };
const reste = (page: string, site: string): string => {
  let p = '/';
  try { p = new URL(page, 'https://x.invalid').pathname; } catch (e) { p = '/'; }
  const b = base(site);
  if (b && p.startsWith(b)) p = p.slice(b.length) || '/';
  return p;
};
export const langueDe = (page: string, site = ''): Langue => (/^\/en(\/|$)/.test(reste(page, site)) ? 'en' : 'fr');

/** langue de la page affichée, et de quoi fabriquer des liens dans cette langue */
export function useLangue(): { langue: Langue; lien: (href?: string) => string | undefined; autre: (cible: Langue) => string } {
  const { page, site } = lireUrl();
  const langue = langueDe(page, site);
  const b = base(site);
  const lien = (href?: string) => {
    if (!href || langue !== 'en' || !href.startsWith('/') || href.startsWith('//')) return href;
    if (/^\/en(\/|$|#|\?)/.test(href)) return href;
    return href === '/' ? '/en' : href.startsWith('/#') ? `/en${href.slice(1)}` : `/en${href}`;
  };
  const autre = (cible: Langue) => {
    let u: URL;
    try { u = new URL(page || '/', 'https://x.invalid'); } catch (e) { return cible === 'en' ? '/en' : '/'; }
    let r = reste(page, site).replace(/^\/en(?=\/|$)/, '') || '/';
    if (cible === 'en') r = r === '/' ? '/en' : `/en${r}`;
    return `${b}${r}${u.search}${u.hash}`;
  };
  return { langue, lien, autre };
}

/** les réglages dans la langue de la page : « xEn » remplace « x » (aussi dans les éléments des listes) */
export function traduire<T extends object>(props: T, langue: Langue): T {
  if (langue !== 'en') return props;
  const objet = (o: Record<string, unknown>): Record<string, unknown> => {
    const r: Record<string, unknown> = { ...o };
    Object.entries(o).forEach(([k, v]) => {
      if (k === 'elementProps' || k === 'a11y') return;
      if (k.length > 2 && k.endsWith('En') && typeof v === 'string') {
        const b = k.slice(0, -2);
        if (!v) return;
        if (b.endsWith('Alt') && o[b.slice(0, -3)] && typeof o[b.slice(0, -3)] === 'object') {
          r[b.slice(0, -3)] = { ...(o[b.slice(0, -3)] as object), alt: v };
        } else r[b] = v;
      } else if (Array.isArray(v)) {
        r[k] = v.map((it) => (it && typeof it === 'object' && !('url' in (it as object)) ? objet(it as Record<string, unknown>) : it));
      }
    });
    return r;
  };
  return objet(props as unknown as Record<string, unknown>) as unknown as T;
}
