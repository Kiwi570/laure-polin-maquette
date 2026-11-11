import type { A11y, Direction } from '@wix/editor-react-types';

export type LpDisponiblesProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre de la section */
  titre?: string;
  /** Texte à côté du titre */
  texte?: string;
  /** Catégorie Wix Stores des œuvres montrées (nom exact, dans son ordre) */
  categorie?: string;
  /** Bloc final : phrase */
  finTexte?: string;
  /** Bloc final, bouton 1 (plein) : texte */
  fin1Texte?: string;
  /** Bloc final, bouton 1 : catégorie de la salle */
  fin1Categorie?: string;
  /** Bloc final, bouton 2 : texte */
  fin2Texte?: string;
  /** Bloc final, bouton 2 : catégorie de la salle */
  fin2Categorie?: string;
  /** Bloc final, bouton 3 : texte */
  fin3Texte?: string;
  /** Bloc final, bouton 3 : catégorie de la salle */
  fin3Categorie?: string;
  /** Bloc final, bouton 4 : texte */
  fin4Texte?: string;
  /** Bloc final, bouton 4 : catégorie de la salle */
  fin4Categorie?: string;

  elementProps?: {
    lpDisponiblesTitre?: { className?: string };
    lpDisponiblesTexte?: { className?: string };
    lpDisponiblesCarte?: { className?: string };
    lpDisponiblesAjout?: { className?: string };
    lpDisponiblesFinTexte?: { className?: string };
    lpDisponiblesFinBouton?: { className?: string };
    lpDisponiblesRepere?: { className?: string };
  };
};

export const defaultProps = {
  titre: 'Nos œuvres du moment',
  texte: 'Une sélection d’œuvres disponibles. Chaque pièce est unique ou tirée en exemplaires numérotés ; Laure Polin envoie d’autres photos sur demande.',
  categorie: 'Nos œuvres du moment',
  finTexte: 'Toutes les œuvres sont à découvrir dans les salles.',
  fin1Texte: 'Salle Ardoise',
  fin1Categorie: 'Ardoise',
  fin2Texte: 'Salle Bronze',
  fin2Categorie: 'Bronze',
  fin3Texte: 'Salle Pneu',
  fin3Categorie: 'Pneu recyclé',
  fin4Texte: 'Salle Petits formats',
  fin4Categorie: 'Petits formats',
  a11y: {},
} as const satisfies Omit<LpDisponiblesProps, 'id' | 'className'>;
