import type { A11y, Direction, Image, Link } from '@wix/editor-react-types';

/** Un lien du pied de page */
export type LienPied = {
  /** Texte du lien */
  texte?: string;
  /** Texte du lien (anglais) */
  texteEn?: string;
  /** Catégorie Wix Stores (nom exact) : l’adresse de sa page est utilisée */
  categorie?: string;
  /** Lien choisi (si pas de catégorie) */
  lien?: Link;
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
  lienAccueil?: Link;
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
  instagramLien?: Link;
  /** Facebook : texte */
  facebookTexte?: string;
  /** Facebook : lien */
  facebookLien?: Link;
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
  instagramLien: { href: 'https://www.instagram.com/laurepolin/', target: '_blank' },
  facebookTexte: 'Facebook',
  facebookLien: { href: 'https://www.facebook.com/sculptureslaure/', target: '_blank' },
  liens: [
    { texte: 'Ardoise', texteEn: 'Slate', categorie: 'Ardoise' },
    { texte: 'Bronze', texteEn: 'Bronze', categorie: 'Bronze' },
    { texte: 'Pneu recyclé', texteEn: 'Recycled tyre', categorie: 'Pneu recyclé' },
    { texte: 'Petits formats', texteEn: 'Small works', categorie: 'Petits formats' },
    { texte: 'Collection privée', texteEn: 'Private collection', categorie: '', ancre: 'collection' },
    { texte: 'Contact', texteEn: 'Contact', categorie: '', ancre: 'contact' },
    { texte: 'Mentions légales et CGV', texteEn: 'Legal notice and terms of sale', categorie: '', ancre: '' },
  ],
  note: 'Maquette de démonstration : le panier, le paiement et les formulaires sont simulés. Certaines ambiances sont des visuels provisoires, en attendant les images définitives.',
  noteEn: 'Demonstration mock-up: the basket, payment and forms are simulated. Some background images are temporary, pending the final images.',
  a11y: {},
} as const satisfies Omit<LpPiedProps, 'id' | 'className'>;
