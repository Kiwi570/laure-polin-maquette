import type { A11y, Direction, Image, WebUrl } from '@wix/editor-react-types';

/** Un lien du pied de page */
export type LienPied = {
  /** Texte du lien */
  texte?: string;
  /** Texte du lien (anglais) */
  texteEn?: string;
  /** Catégorie Wix Stores (nom exact) : l’adresse de sa page est utilisée */
  categorie?: string;
  /** Lien choisi (si pas de catégorie) */
  lien?: WebUrl;
  /** Section de l’accueil visée, sans # (ex. contact), si ni catégorie ni lien */
  ancre?: string;
};

export type LpPiedProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Nom dessiné en grand, lu par les lecteurs d’écran */
  nomAccessible?: string;
  /** Logo officiel */
  logo?: Image;
  /** Texte lu par les lecteurs d’écran sur le logo */
  logoTexteAccessible?: string;
  /** Texte lu par les lecteurs d’écran sur le logo (anglais) */
  logoTexteAccessibleEn?: string;
  /** Lien du logo (vide : l’accueil du site) */
  lienAccueil?: WebUrl;
  /** Coordonnées, première ligne */
  coordLigne1?: string;
  /** Coordonnées, deuxième ligne */
  coordLigne2?: string;
  /** Téléphone affiché */
  telephone?: string;
  /** Adresse e-mail */
  email?: string;
  /** Instagram : texte */
  instagramTexte?: string;
  /** Instagram : lien */
  instagramLien?: WebUrl;
  /** Facebook : texte */
  facebookTexte?: string;
  /** Facebook : lien */
  facebookLien?: WebUrl;
  /** Liens de droite */
  liens: Array<LienPied>;
  /** Note en bas */
  note?: string;
  /** Note en bas (anglais) */
  noteEn?: string;

  elementProps?: {
    lpPiedNom?: { className?: string };
    lpPiedLogo?: { className?: string };
    lpPiedCoordonnees?: { className?: string };
    lpPiedLien?: { className?: string };
    lpPiedNote?: { className?: string };
  };
};

export const defaultProps = {
  nomAccessible: 'Laure Polin',
  logo: {
    url: 'https://static.wixstatic.com/media/2d5176_62e49987f983435883da059ca7224503~mv2.webp',
    uri: '2d5176_62e49987f983435883da059ca7224503~mv2.webp',
    alt: 'Laure Polin, sculptures',
  },
  logoTexteAccessible: 'Laure Polin, sculptures : retour à l’accueil',
  logoTexteAccessibleEn: 'Laure Polin, sculptures: back to the home page',
  coordLigne1: 'Laure Polin, sculptures',
  coordLigne2: '51 rue Lénine, 93170 Bagnolet',
  telephone: '+33 6 77 80 59 60',
  email: 'contact@sculptures-fr.com',
  instagramTexte: 'Instagram',
  instagramLien: 'https://www.instagram.com/laurepolin/',
  facebookTexte: 'Facebook',
  facebookLien: 'https://www.facebook.com/sculptureslaure/',
  liens: [
    { texte: 'Ardoise', texteEn: 'Slate', categorie: 'Ardoise' },
    { texte: 'Bronze', texteEn: 'Bronze', categorie: 'Bronze' },
    { texte: 'Pneu recyclé', texteEn: 'Recycled tyre', categorie: 'Pneu recyclé' },
    { texte: 'Petits formats', texteEn: 'Small works', categorie: 'Petits formats' },
    { texte: 'Collection privée', texteEn: 'Private collection', categorie: '', ancre: 'collection' },
    { texte: 'Contact', texteEn: 'Contact', categorie: '', ancre: 'contact' },
    { texte: 'Mentions légales et CGV', texteEn: 'Legal notice and terms of sale', categorie: '', ancre: '' },
  ],
  note: '',
  noteEn: '',
  a11y: {},
} as const satisfies Omit<LpPiedProps, 'id' | 'className'>;
