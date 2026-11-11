import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpDemarcheProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Portrait de l’artiste (recadré 4:5) */
  portrait?: Image;
  /** Légende sous le portrait */
  legende?: string;
  /** Titre de la section, lu par les lecteurs d’écran seulement */
  titreCache?: string;
  /** Premier paragraphe */
  paragraphe1?: string;
  /** Deuxième paragraphe */
  paragraphe2?: string;
  /** Troisième paragraphe */
  paragraphe3?: string;
  /** Ligne en grand italique : premier geste (lettres qui s’assemblent) */
  geste1?: string;
  /** Deuxième geste (sort du flou) */
  geste2?: string;
  /** Troisième geste (secousse) */
  geste3?: string;
  /** Quatrième paragraphe */
  paragraphe4?: string;
  /** Signature sous le texte */
  signature?: string;

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
  legende: 'Laure Polin parmi ses sculptures.',
  titreCache: 'La démarche',
  paragraphe1: 'D’une multitude de mystères, au milieu de la poussière de l’atelier, je tente sans cesse de révéler LA forme. Celle que je portais à mon insu ? Celle qui était enfouie dans la matière ? Peu importe, ce sera celle qui émergera de toutes mes sensations de l’instant présent.',
  paragraphe2: 'Mi-figuratif, mi-abstrait, mon art voyage entre les deux. Dans les courbes et les déliés naissent des visages, des corps, des sensations, des mouvements, des rythmes.',
  paragraphe3: 'Au commencement est l’indécision. Je cherche une trace, une empreinte, un repère, une mémoire dans la matière, un indice…',
  geste1: 'Je taille,',
  geste2: 'je ponce,',
  geste3: 'je bouscule la matière.',
  paragraphe4: 'Je reconnais un œil, un dos, une vertèbre, l’esquisse d’une ossature, d’une construction, d’un mouvement… En réalité je reconnais le début d’une âme (de mon âme ?), le début d’une structure, le début d’une œuvre.',
  signature: 'Texte de Laure Polin.',
  a11y: {},
} as const satisfies Omit<LpDemarcheProps, 'id' | 'className'>;
