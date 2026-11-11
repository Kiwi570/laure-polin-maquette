import type { A11y, Direction, Image, Link } from '@wix/editor-react-types';

export type LpOuvertureProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Grand titre, première ligne */
  titreLigne1?: string;
  /** Grand titre, deuxième ligne (décalée) */
  titreLigne2?: string;
  /** Texte sous le titre */
  texte?: string;
  /** Texte sous le titre (anglais) */
  texteEn?: string;
  /** Bouton plein : texte */
  boutonPrincipalTexte?: string;
  /** Bouton plein : texte (anglais) */
  boutonPrincipalTexteEn?: string;
  /** Bouton plein : lien (vide : section #disponibles) */
  boutonPrincipalLien?: Link;
  /** Bouton contour : texte */
  boutonSecondaireTexte?: string;
  /** Bouton contour : texte (anglais) */
  boutonSecondaireTexteEn?: string;
  /** Bouton contour : lien (vide : section #contact) */
  boutonSecondaireLien?: Link;
  /** Lien « Défiler » en bas : texte */
  texteDefiler?: string;
  /** Lien « Défiler » en bas : texte (anglais) */
  texteDefilerEn?: string;
  /** Lien « Défiler » (vide : section #manifeste) */
  lienDefiler?: Link;
  /** Fond d’ardoise (écran horizontal) */
  fondArdoise?: Image;
  /** Fond d’ardoise (écran vertical, téléphone) */
  fondArdoisePortrait?: Image;
  /** Catégorie Wix Stores des œuvres du diaporama (nom exact, dans son ordre) */
  categorieDiaporama?: string;
  /** Lecture automatique du diaporama */
  autoPlay?: boolean;
  /** Bouton pause du diaporama : toujours visible ou au survol */
  pauseButtonVisibility?: 'showAlways' | 'showOnHover';

  elementProps?: {
    lpOuvertureTitre?: { className?: string };
    lpOuvertureTexte?: { className?: string };
    lpOuvertureBoutonPrincipal?: { className?: string };
    lpOuvertureBoutonSecondaire?: { className?: string };
    lpOuvertureCadre?: { className?: string };
    lpOuvertureCartel?: { className?: string };
    lpOuverturePause?: { className?: string };
    lpOuverturePoint?: { className?: string };
    lpOuvertureDefiler?: { className?: string };
  };
};

export const defaultProps = {
  titreLigne1: 'Laure',
  titreLigne2: 'Polin',
  texte: 'Sculptures en ardoise taillée, en bronze et en pneu recyclé. Mi-figuratives, mi-abstraites, elles naissent dans l’atelier de Bagnolet.',
  texteEn: 'Sculptures in carved slate, bronze and recycled tyre. Half-figurative, half-abstract, they are born in the studio in Bagnolet, just outside Paris.',
  boutonPrincipalTexte: 'Voir les œuvres disponibles',
  boutonPrincipalTexteEn: 'See the available works',
  boutonSecondaireTexte: 'Visiter l’atelier',
  boutonSecondaireTexteEn: 'Visit the studio',
  texteDefiler: 'Défiler',
  texteDefilerEn: 'Scroll',
  fondArdoise: {
    url: 'https://static.wixstatic.com/media/2d5176_1b52ead1106b455195f467be7d080081~mv2.webp',
    uri: '2d5176_1b52ead1106b455195f467be7d080081~mv2.webp',
    alt: 'Ardoise éclairée en lumière rasante',
  },
  fondArdoisePortrait: {
    url: 'https://static.wixstatic.com/media/2d5176_604fa89566e048a9ac14bc69ebdeb059~mv2.webp',
    uri: '2d5176_604fa89566e048a9ac14bc69ebdeb059~mv2.webp',
    alt: 'Ardoise éclairée en lumière rasante',
  },
  categorieDiaporama: 'Diaporama d’accueil',
  autoPlay: true,
  pauseButtonVisibility: 'showAlways',
  a11y: {},
} as const satisfies Omit<LpOuvertureProps, 'id' | 'className'>;
