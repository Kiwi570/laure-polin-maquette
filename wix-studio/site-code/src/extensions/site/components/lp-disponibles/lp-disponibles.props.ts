import type { A11y, Direction } from '@wix/editor-react-types';

export type LpDisponiblesProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre de la section */
  titre?: string;

  /** Titre de la section (anglais) */

  titreEn?: string;
  /** Texte à côté du titre */
  texte?: string;
  /** Texte à côté du titre (anglais) */
  texteEn?: string;
  /** Catégorie Wix Stores des œuvres montrées (nom exact, dans son ordre) */
  categorie?: string;
  /** Mention d’une œuvre vendue (stock épuisé) */
  statutVendue?: string;
  /** Mention d’une œuvre vendue (anglais) */
  statutVendueEn?: string;
  /** Bloc final : phrase */
  finTexte?: string;
  /** Bloc final : phrase (anglais) */
  finTexteEn?: string;
  /** Bloc final, bouton 1 (plein) : texte */
  fin1Texte?: string;
  /** Bloc final, bouton 1 (plein) : texte (anglais) */
  fin1TexteEn?: string;
  /** Bloc final, bouton 1 : catégorie de la salle */
  fin1Categorie?: string;
  /** Bloc final, bouton 2 : texte */
  fin2Texte?: string;
  /** Bloc final, bouton 2 : texte (anglais) */
  fin2TexteEn?: string;
  /** Bloc final, bouton 2 : catégorie de la salle */
  fin2Categorie?: string;
  /** Bloc final, bouton 3 : texte */
  fin3Texte?: string;
  /** Bloc final, bouton 3 : texte (anglais) */
  fin3TexteEn?: string;
  /** Bloc final, bouton 3 : catégorie de la salle */
  fin3Categorie?: string;
  /** Bloc final, bouton 4 : texte */
  fin4Texte?: string;
  /** Bloc final, bouton 4 : texte (anglais) */
  fin4TexteEn?: string;
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
  titreEn: 'Our current works',
  texte: 'Une sélection d’œuvres disponibles. Chaque pièce est unique ou tirée en exemplaires numérotés ; Laure Polin envoie d’autres photos sur demande.',
  texteEn: 'A selection of available works. Each piece is unique or cast in a numbered edition; Laure Polin will send more photos on request.',
  categorie: 'Nos œuvres du moment',
  statutVendue: 'Vendue',
  statutVendueEn: 'Sold',
  finTexte: 'Toutes les œuvres sont à découvrir dans les salles.',
  finTexteEn: 'All the works can be seen in the rooms.',
  fin1Texte: 'Salle Ardoise',
  fin1TexteEn: 'Slate room',
  fin1Categorie: 'Ardoise',
  fin2Texte: 'Salle Bronze',
  fin2TexteEn: 'Bronze room',
  fin2Categorie: 'Bronze',
  fin3Texte: 'Salle Pneu',
  fin3TexteEn: 'Tyre room',
  fin3Categorie: 'Pneu recyclé',
  fin4Texte: 'Salle Petits formats',
  fin4TexteEn: 'Small works room',
  fin4Categorie: 'Petits formats',
  a11y: {},
} as const satisfies Omit<LpDisponiblesProps, 'id' | 'className'>;
