import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpLivreProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre du livre */
  titre?: string;
  /** Chapô */
  chapo?: string;
  /** Crédit 1 : intitulé */
  credit1Intitule?: string;
  /** Crédit 1 : valeur */
  credit1Valeur?: string;
  /** Crédit 2 : intitulé */
  credit2Intitule?: string;
  /** Crédit 2 : valeur */
  credit2Valeur?: string;
  /** Crédit 3 : intitulé */
  credit3Intitule?: string;
  /** Crédit 3 : valeur */
  credit3Valeur?: string;
  /** Crédit 4 : intitulé */
  credit4Intitule?: string;
  /** Crédit 4 : valeur */
  credit4Valeur?: string;
  /** Couverture */
  couverture?: Image;
  /** Revers de la couverture (visible quand elle s’ouvre) */
  dosCouverture?: Image;
  /** Double page intérieure */
  doublePage?: Image;
  /** Catégorie Wix Stores du livre (le premier produit donne le prix et l’ajout au panier) */
  categorie?: string;
  /** Texte du bouton */
  boutonTexte?: string;

  elementProps?: {
    lpLivreTitre?: { className?: string };
    lpLivreChapo?: { className?: string };
    lpLivreCredits?: { className?: string };
    lpLivrePrix?: { className?: string };
    lpLivreBouton?: { className?: string };
    lpLivreLivre?: { className?: string };
  };
};

export const defaultProps = {
  titre: 'Dialogues sculptés',
  chapo: 'Une conversation entre deux femmes artistes : l’une sculpte, l’autre écrit.',
  credit1Intitule: 'Sculptures',
  credit1Valeur: 'Laure Polin, 15 œuvres',
  credit2Intitule: 'Poèmes',
  credit2Valeur: 'Claire Sistach',
  credit3Intitule: 'Photographies',
  credit3Valeur: 'Franck Sanyas',
  credit4Intitule: 'Éditeur',
  credit4Valeur: 'Le Livre d’art',
  couverture: {
    url: 'https://static.wixstatic.com/media/2d5176_f0bb236e3c024213bafa72b998d843fb~mv2.webp',
    uri: '2d5176_f0bb236e3c024213bafa72b998d843fb~mv2.webp',
    alt: 'Couverture du livre Dialogues sculptés : sculptures de Laure Polin, poèmes de Claire Sistach.',
  },
  dosCouverture: {
    url: 'https://static.wixstatic.com/media/2d5176_d51b88d0aee5400a87541016e006be0e~mv2.webp',
    uri: '2d5176_d51b88d0aee5400a87541016e006be0e~mv2.webp',
    alt: 'Page de présentation des deux autrices.',
  },
  doublePage: {
    url: 'https://static.wixstatic.com/media/2d5176_14fdf504f3c34a2ca5d179648f4d9364~mv2.webp',
    uri: '2d5176_14fdf504f3c34a2ca5d179648f4d9364~mv2.webp',
    alt: 'Double page intérieure du livre, consacrée à la sculpture Énergies.',
  },
  categorie: 'Livre',
  boutonTexte: 'Ajouter au panier',
  a11y: {},
} as const satisfies Omit<LpLivreProps, 'id' | 'className'>;
