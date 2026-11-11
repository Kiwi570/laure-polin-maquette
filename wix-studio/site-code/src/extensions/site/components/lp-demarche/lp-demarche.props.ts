import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpDemarcheProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Portrait de l’artiste (recadré 4:5) */
  portrait?: Image;

  /** Portrait de l’artiste (recadré 4:5) — texte alternatif en anglais */

  portraitAltEn?: string;
  /** Légende sous le portrait */
  legende?: string;
  /** Légende sous le portrait (anglais) */
  legendeEn?: string;
  /** Titre de la section, lu par les lecteurs d’écran seulement */
  titreCache?: string;
  /** Titre de la section, lu par les lecteurs d’écran seulement (anglais) */
  titreCacheEn?: string;
  /** Premier paragraphe */
  paragraphe1?: string;
  /** Premier paragraphe (anglais) */
  paragraphe1En?: string;
  /** Deuxième paragraphe */
  paragraphe2?: string;
  /** Deuxième paragraphe (anglais) */
  paragraphe2En?: string;
  /** Troisième paragraphe */
  paragraphe3?: string;
  /** Troisième paragraphe (anglais) */
  paragraphe3En?: string;
  /** Ligne en grand italique : premier geste (lettres qui s’assemblent) */
  geste1?: string;
  /** Ligne en grand italique : premier geste (lettres qui s’assemblent) (anglais) */
  geste1En?: string;
  /** Deuxième geste (sort du flou) */
  geste2?: string;
  /** Deuxième geste (sort du flou) (anglais) */
  geste2En?: string;
  /** Troisième geste (secousse) */
  geste3?: string;
  /** Troisième geste (secousse) (anglais) */
  geste3En?: string;
  /** Quatrième paragraphe */
  paragraphe4?: string;
  /** Quatrième paragraphe (anglais) */
  paragraphe4En?: string;
  /** Signature sous le texte */
  signature?: string;
  /** Signature sous le texte (anglais) */
  signatureEn?: string;

  elementProps?: {
    lpDemarchePortrait?: { className?: string };
    lpDemarcheLegende?: { className?: string };
    lpDemarcheParagraphe?: { className?: string };
    lpDemarcheGestes?: { className?: string };
    lpDemarcheSignature?: { className?: string };
  };
};

export const defaultProps = {
  portrait: {
    url: 'https://static.wixstatic.com/media/2d5176_3d6a4f5eeb0b4d4d991b173176be4391~mv2.webp',
    uri: '2d5176_3d6a4f5eeb0b4d4d991b173176be4391~mv2.webp',
    alt: 'Laure Polin parmi ses sculptures en ardoise et en bronze, lors d’une exposition.',
  },
  portraitAltEn: 'Laure Polin among her slate and bronze sculptures at an exhibition.',
  legende: 'Laure Polin parmi ses sculptures.',
  legendeEn: 'Laure Polin among her sculptures.',
  titreCache: 'La démarche',
  titreCacheEn: 'Her approach',
  paragraphe1: 'D’une multitude de mystères, au milieu de la poussière de l’atelier, je tente sans cesse de révéler LA forme. Celle que je portais à mon insu ? Celle qui était enfouie dans la matière ? Peu importe, ce sera celle qui émergera de toutes mes sensations de l’instant présent.',
  paragraphe1En: 'From a multitude of mysteries, amid the dust of the studio, I keep trying to reveal THE form. The one I was carrying without knowing it? The one buried in the material? It doesn’t matter: it will be the one that emerges from everything I feel in the present moment.',
  paragraphe2: 'Mi-figuratif, mi-abstrait, mon art voyage entre les deux. Dans les courbes et les déliés naissent des visages, des corps, des sensations, des mouvements, des rythmes.',
  paragraphe2En: 'Half-figurative, half-abstract, my art travels between the two. In the curves and flowing lines, faces, bodies, sensations, movements and rhythms are born.',
  paragraphe3: 'Au commencement est l’indécision. Je cherche une trace, une empreinte, un repère, une mémoire dans la matière, un indice…',
  paragraphe3En: 'In the beginning there is indecision. I look for a trace, an imprint, a landmark, a memory in the material, a clue…',
  geste1: 'Je taille,',
  geste1En: 'I carve,',
  geste2: 'je ponce,',
  geste2En: 'I sand,',
  geste3: 'je bouscule la matière.',
  geste3En: 'I shake up the material.',
  paragraphe4: 'Je reconnais un œil, un dos, une vertèbre, l’esquisse d’une ossature, d’une construction, d’un mouvement… En réalité je reconnais le début d’une âme (de mon âme ?), le début d’une structure, le début d’une œuvre.',
  paragraphe4En: 'I recognise an eye, a back, a vertebra, the outline of a skeleton, of a structure, of a movement… In truth I recognise the beginning of a soul (my soul?), the beginning of a structure, the beginning of a work.',
  signature: 'Texte de Laure Polin.',
  signatureEn: 'Text by Laure Polin.',
  a11y: {},
} as const satisfies Omit<LpDemarcheProps, 'id' | 'className'>;
