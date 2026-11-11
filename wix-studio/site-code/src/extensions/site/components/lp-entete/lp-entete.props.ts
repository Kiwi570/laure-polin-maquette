import type { A11y, Direction, Image } from '@wix/editor-react-types';
import type { ElementState } from '@wix/react-component-utils';

/** Une salle du menu « Les œuvres » et du menu plein écran. */
export type Salle = {
  /** Nom de la salle affiché */
  titre?: string;
  /** Nom de la salle affiché (anglais) */
  titreEn?: string;
  /** Catégorie Wix Stores de la salle (nom exact) : donne le nombre d’œuvres et l’adresse de la page */
  categorie?: string;
  /** Vignette : photo d’une œuvre de la salle */
  image?: Image;
  /** Adresse de la salle si elle n’a pas de catégorie (sinon laissée vide) */
  lien?: string;
};

export type LpEnteteProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Logo officiel (en-tête et menu) */
  logo?: Image;
  /** Texte lu par les lecteurs d’écran sur le logo */
  logoTexteAccessible?: string;
  /** Texte lu par les lecteurs d’écran sur le logo (anglais) */
  logoTexteAccessibleEn?: string;
  /** Adresse de l’accueil */
  lienAccueil?: string;
  /** Libellé du menu des salles */
  libelleOeuvres?: string;
  /** Libellé du menu des salles (anglais) */
  libelleOeuvresEn?: string;
  /** Les salles du menu (dans l’ordre) */
  salles: Array<Salle>;
  /** Mot après le nombre d’œuvres (singulier) */
  motOeuvre?: string;
  /** Mot après le nombre d’œuvres (singulier) (anglais) */
  motOeuvreEn?: string;
  /** Mot après le nombre d’œuvres (pluriel) */
  motOeuvres?: string;
  /** Mot après le nombre d’œuvres (pluriel) (anglais) */
  motOeuvresEn?: string;
  /** Lien « Le livre » : libellé */
  libelleLivre?: string;
  /** Lien « Le livre » : libellé (anglais) */
  libelleLivreEn?: string;
  /** Lien « Le livre » : adresse */
  lienLivre?: string;
  /** Lien « Expositions » : libellé */
  libelleExpositions?: string;
  /** Lien « Expositions » : libellé (anglais) */
  libelleExpositionsEn?: string;
  /** Lien « Expositions » : adresse */
  lienExpositions?: string;
  /** Pastille « Contact » : libellé */
  libelleContact?: string;
  /** Pastille « Contact » : libellé (anglais) */
  libelleContactEn?: string;
  /** Pastille « Contact » : adresse */
  lienContact?: string;
  /** Titre au-dessus des salles dans le menu plein écran */
  titreMenuSalles?: string;
  /** Titre au-dessus des salles dans le menu plein écran (anglais) */
  titreMenuSallesEn?: string;
  /** Adresse de la page panier */
  lienPanier?: string;
  /** Texte en bas de l’ouverture animée */
  texteOuverture?: string;
  /** Texte en bas de l’ouverture animée (anglais) */
  texteOuvertureEn?: string;
  /** Image d’ardoise des feuillets de l’ouverture */
  fondOuverture?: Image;
  /** Message après un ajout au panier ({titre} = titre de l’œuvre) */
  messageAjout?: string;
  /** Message après un ajout au panier ({titre} = titre de l’œuvre) (anglais) */
  messageAjoutEn?: string;
  /** Message si l’œuvre est déjà dans le panier ({titre} = titre de l’œuvre) */
  messageDeja?: string;
  /** Message si l’œuvre est déjà dans le panier ({titre} = titre de l’œuvre) (anglais) */
  messageDejaEn?: string;
  /** Message si l’ajout au panier échoue */
  messageErreur?: string;
  /** Message si l’ajout au panier échoue (anglais) */
  messageErreurEn?: string;
  /** Rideau d’ouverture à la première visite de la session */
  ouvertureAnimee?: boolean;
  /** Défilement doux (Lenis) sur tout le site */
  defilementDoux?: boolean;
  /** Rideau de transition entre les pages */
  transitionsPages?: boolean;
  /** Sélecteur de langue FR / EN (Wix Multilingual, pages anglaises sous /en/) */
  selecteurLangue?: boolean;
  /** Bouton de langue française */
  boutonFrancais?: string;
  /** Bouton de langue anglaise */
  boutonAnglais?: string;
  /** Menu des salles ouvert (aperçu dans l’éditeur) */
  isOpen?: ElementState<boolean>;

  elementProps?: {
    lpEnteteLogo?: { className?: string };
    lpEnteteMenuOeuvres?: { className?: string };
    lpEnteteSalle?: { className?: string };
    lpEnteteLien?: { className?: string };
    lpEnteteContact?: { className?: string };
    lpEntetePanier?: { className?: string };
    lpEnteteMenuBouton?: { className?: string };
    lpEnteteMenuSalle?: { className?: string };
    lpEnteteMenuLien?: { className?: string };
    lpEnteteMenuTitre?: { className?: string };
    lpEnteteNotification?: { className?: string };
    lpEnteteLangue?: { className?: string };
  };
};

export const defaultProps = {
  logo: {
    url: 'https://static.wixstatic.com/media/2d5176_62e49987f983435883da059ca7224503~mv2.webp',
    uri: '2d5176_62e49987f983435883da059ca7224503~mv2.webp',
    alt: 'Laure Polin, sculptures',
  },
  logoTexteAccessible: 'Laure Polin, sculptures : retour à l’accueil',
  logoTexteAccessibleEn: 'Laure Polin, sculptures: back to the home page',
  lienAccueil: '/',
  libelleOeuvres: 'Les œuvres',
  libelleOeuvresEn: 'The works',
  salles: [
    {
      titre: 'Ardoise',
      titreEn: 'Slate',
      categorie: 'Ardoise',
      image: { url: 'https://static.wixstatic.com/media/2d5176_7c67d2220271445eac60f0802cc325af~mv2.webp', uri: '2d5176_7c67d2220271445eac60f0802cc325af~mv2.webp', alt: 'À contre-courant, sculpture en ardoise de Laure Polin' },
      lien: '',
    },
    {
      titre: 'Bronze',
      titreEn: 'Bronze',
      categorie: 'Bronze',
      image: { url: 'https://static.wixstatic.com/media/2d5176_292c7afd2cdb43a2a514d893cba5cc4d~mv2.webp', uri: '2d5176_292c7afd2cdb43a2a514d893cba5cc4d~mv2.webp', alt: 'La danse du voile, sculpture en bronze de Laure Polin' },
      lien: '',
    },
    {
      titre: 'Pneu recyclé',
      titreEn: 'Recycled tyre',
      categorie: 'Pneu recyclé',
      image: { url: 'https://static.wixstatic.com/media/2d5176_377fc0b5673f4a96b66fc46c50258d18~mv2.webp', uri: '2d5176_377fc0b5673f4a96b66fc46c50258d18~mv2.webp', alt: 'Le dé du chaos, sculpture en pneu recyclé de Laure Polin' },
      lien: '',
    },
    {
      titre: 'Petits formats',
      titreEn: 'Small works',
      categorie: 'Petits formats',
      image: { url: 'https://static.wixstatic.com/media/2d5176_28c2cf2b2f584679a199743354a9477c~mv2.webp', uri: '2d5176_28c2cf2b2f584679a199743354a9477c~mv2.webp', alt: 'Profil, sculpture de Laure Polin' },
      lien: '',
    },
    {
      titre: 'Collection privée',
      titreEn: 'Private collection',
      categorie: '',
      image: { url: 'https://static.wixstatic.com/media/2d5176_7c4c4ecc22064cb3ac1404d9adfdee29~mv2.webp', uri: '2d5176_7c4c4ecc22064cb3ac1404d9adfdee29~mv2.webp', alt: 'Cheveux au vent, sculpture de Laure Polin' },
      lien: '/#collection',
    },
  ],
  motOeuvre: 'œuvre',
  motOeuvreEn: 'work',
  motOeuvres: 'œuvres',
  motOeuvresEn: 'works',
  libelleLivre: 'Le livre',
  libelleLivreEn: 'The book',
  lienLivre: '/#livre',
  libelleExpositions: 'Expositions',
  libelleExpositionsEn: 'Exhibitions',
  lienExpositions: '/#ou-voir',
  libelleContact: 'Contact',
  libelleContactEn: 'Contact',
  lienContact: '/#contact',
  titreMenuSalles: 'Les salles',
  titreMenuSallesEn: 'The rooms',
  lienPanier: '/cart-page',
  texteOuverture: 'Sculptures, Bagnolet',
  texteOuvertureEn: 'Sculptures, Bagnolet, France',
  fondOuverture: {
    url: 'https://static.wixstatic.com/media/2d5176_1b52ead1106b455195f467be7d080081~mv2.webp',
    uri: '2d5176_1b52ead1106b455195f467be7d080081~mv2.webp',
    alt: 'Ardoise éclairée en lumière rasante',
  },
  messageAjout: '{titre} ajouté au panier.',
  messageAjoutEn: '{titre} added to your basket.',
  messageDeja: '{titre} est déjà dans votre panier (pièce unique).',
  messageDejaEn: '{titre} is already in your basket (unique piece).',
  messageErreur: 'L’œuvre n’a pas pu être ajoutée au panier. Réessayez dans un instant.',
  messageErreurEn: 'The work could not be added to your basket. Please try again in a moment.',
  ouvertureAnimee: true,
  defilementDoux: true,
  transitionsPages: true,
  selecteurLangue: true,
  boutonFrancais: 'FR',
  boutonAnglais: 'EN',
  isOpen: false,
  a11y: {},
} as const satisfies Omit<LpEnteteProps, 'id' | 'className'>;
