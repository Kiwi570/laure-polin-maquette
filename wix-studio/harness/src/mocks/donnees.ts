/* Données de la maquette (data/oeuvres.js) mises dans la forme des réponses Wix (catalogue V3). */
import '../../../../data/oeuvres.js';

type Photo = { src: string; w: number; h: number; tailles: Array<[number, number]>; role: string };
type O = { id: string; titre: string; series: Array<string>; prix: number | null; statut: string; technique: Array<string>; photos: Array<Photo>; dimensions: { h?: number; l?: number; p?: number; note?: string } | null };
const W = window as unknown as { OEUVRES: Array<O>; SERIES_ORDRE: Record<string, Array<string>> };
export const OEUVRES = W.OEUVRES;
const parId = Object.fromEntries(OEUVRES.map((o) => [o.id, o]));
const serie = (k: string) => (W.SERIES_ORDRE[k] || []).filter((id, i, a) => a.indexOf(id) === i);

const matiereCourte = (o: O) => {
  const t = `${o.technique.join(' ')} ${o.series.join(' ')}`.toLowerCase();
  const m: Array<string> = [];
  if (/bronze/.test(t)) m.push('bronze');
  if (/ardoise/.test(t)) m.push('ardoise');
  if (/pneu|chambre/.test(t)) m.push('pneu recyclé');
  if (/terre cuite/.test(t)) m.push('terre cuite');
  if (/\bbois\b/.test(t) && !m.length) m.push('bois');
  if (/cuivre/.test(t) && !m.includes('bronze')) m.push('cuivre');
  if (/étain/.test(t)) m.push('étain');
  return m.length ? m.join(', ').replace(/^./, (c) => c.toUpperCase()) : '';
};
const dims = (o: O) => {
  const d = o.dimensions; if (!d) return '';
  const n = (v: number) => String(v).replace('.', ',');
  const p: Array<string> = [];
  if (d.h) p.push(`H ${n(d.h)}`); if (d.l) p.push(`L ${n(d.l)}`); if (d.p) p.push(`P ${n(d.p)}`);
  let s = p.length ? `${p.join(' × ')} cm` : '';
  if (d.note) s += s ? ` (${d.note})` : d.note;
  return s;
};

export const produits = OEUVRES.filter((o) => o.statut === 'disponible').map((o) => {
  const lignes: Array<string> = [];
  const m = matiereCourte(o); const d = dims(o);
  if (m) lignes.push(`<p><strong>Matière</strong> : ${m}</p>`);
  if (d) lignes.push(`<p><strong>Dimensions</strong> : ${d}</p>`);
  return {
    _id: `p-${o.id}`,
    slug: o.id,
    name: o.titre,
    actualPriceRange: o.prix ? { minValue: { amount: String(o.prix) }, maxValue: { amount: String(o.prix) } } : undefined,
    media: {
      itemsInfo: {
        items: o.photos.filter((p) => p.role !== 'signature').map((p) => {
          const t = p.tailles.find(([, w]) => w >= 800) || p.tailles[p.tailles.length - 1];
          return { _id: `${o.id}-${t[0]}`, mediaType: 'IMAGE', image: { url: `/assets/${p.src}-${t[0]}.webp`, width: p.w, height: p.h } };
        }),
      },
    },
    infoSections: o.id === 'dialogues-sculptes' ? [] : [{ title: 'Caractéristiques', uniqueName: 'caracteristiques', plainDescription: lignes.join('') }],
  };
});

const DISPO = ['la-faille-bleue', 'l-ardoisier', 'expression', 'la-reverence', 'flamenco', 'desir-no-2', 'le-cerceau', 'entre-deux-silences', 'introspection', 'premices-d-ouragan', 'le-troisieme-oeil'];
const HEROS = ['harmonie', 'la-danse-du-voile', 'a-contre-courant', 'le-coeur-de-l-arene', 'le-cirque', 'racines-d-asphalte', 'megaptere'];
const dispo = (ids: Array<string>) => ids.filter((id) => parId[id]?.statut === 'disponible');
export const categoriesMock = [
  { _id: 'c-ardoise', name: 'Ardoise', slug: 'ardoise', visible: true, ids: dispo(serie('ardoise')) },
  { _id: 'c-bronze', name: 'Bronze', slug: 'bronze', visible: true, ids: dispo(serie('bronze')) },
  { _id: 'c-pneu', name: 'Pneu recyclé', slug: 'pneu-recycle', visible: true, ids: dispo(serie('pneu')) },
  { _id: 'c-petits', name: 'Petits formats', slug: 'petits-formats', visible: true, ids: dispo(serie('petits-formats')) },
  { _id: 'c-livre', name: 'Livre', slug: 'livre', visible: true, ids: ['dialogues-sculptes'] },
  { _id: 'c-moment', name: 'Nos œuvres du moment', slug: 'nos-oeuvres-du-moment', visible: true, ids: dispo(DISPO) },
  { _id: 'c-diapo', name: "Diaporama d'accueil", slug: 'diaporama-d-accueil', visible: false, ids: dispo(HEROS) },
  { _id: 'c-trio-b', name: 'Trio accueil – Bronze', slug: 'trio-accueil-bronze', visible: false, ids: ['la-danse-du-voile', 'la-danse', 'le-cirque'] },
  { _id: 'c-trio-a', name: 'Trio accueil – Ardoise', slug: 'trio-accueil-ardoise', visible: false, ids: ['a-contre-courant', 'megaptere', 'vue-du-ciel'] },
  { _id: 'c-trio-p', name: 'Trio accueil – Pneu', slug: 'trio-accueil-pneu', visible: false, ids: ['racines-d-asphalte', 'le-de-du-chaos', 'paix-en-tension'] },
  { _id: 'c-trio-pf', name: 'Trio accueil – Petits formats', slug: 'trio-accueil-petits-formats', visible: false, ids: ['profil', 'dans-les-nuages', 'la-baigneuse'] },
];
export const attendre = <T,>(v: T, ms = 60): Promise<T> => new Promise((ok) => setTimeout(() => ok(v), ms));
