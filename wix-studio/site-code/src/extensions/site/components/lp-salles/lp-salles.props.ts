import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpSallesProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Mot après le nombre d’œuvres (singulier) */
  motOeuvre?: string;
  /** Mot après le nombre d’œuvres (pluriel) */
  motOeuvres?: string;

  /** Bronze : grand mot (dessiné en métal en fusion) */
  bronzeMot?: string;
  /** Bronze : image d’ambiance du fond */
  bronzeFond?: Image;
  /** Bronze : catégorie Wix Stores de la salle (nombre d’œuvres, adresse) */
  bronzeCategorie?: string;
  /** Bronze : texte */
  bronzeTexte?: string;
  /** Bronze : texte du bouton */
  bronzeBouton?: string;
  /** Bronze : catégorie Wix Stores des trois œuvres montrées */
  bronzeTrio?: string;

  /** Ardoise : grand mot (en feuillets) */
  ardoiseMot?: string;
  /** Ardoise : image d’ambiance du fond */
  ardoiseFond?: Image;
  /** Ardoise : catégorie Wix Stores de la salle */
  ardoiseCategorie?: string;
  /** Ardoise : texte */
  ardoiseTexte?: string;
  /** Ardoise : texte du bouton */
  ardoiseBouton?: string;
  /** Ardoise : catégorie Wix Stores des trois œuvres montrées */
  ardoiseTrio?: string;

  /** Pneu : grand mot (imprimé par la roue) */
  pneuMot?: string;
  /** Pneu : nom complet lu par les lecteurs d’écran */
  pneuNomAccessible?: string;
  /** Pneu : image d’ambiance du fond */
  pneuFond?: Image;
  /** Pneu : catégorie Wix Stores de la salle */
  pneuCategorie?: string;
  /** Pneu : texte */
  pneuTexte?: string;
  /** Pneu : texte du bouton */
  pneuBouton?: string;
  /** Pneu : catégorie Wix Stores des trois œuvres montrées */
  pneuTrio?: string;

  /** Petits formats : grand mot, première ligne */
  petitsLigne1?: string;
  /** Petits formats : grand mot, deuxième ligne */
  petitsLigne2?: string;
  /** Petits formats : image d’ambiance du fond */
  petitsFond?: Image;
  /** Petits formats : catégorie Wix Stores de la salle */
  petitsCategorie?: string;
  /** Petits formats : texte */
  petitsTexte?: string;
  /** Petits formats : texte du bouton */
  petitsBouton?: string;
  /** Petits formats : catégorie Wix Stores des trois œuvres montrées */
  petitsTrio?: string;

  elementProps?: {
    lpSallesMot?: { className?: string };
    lpSallesNombre?: { className?: string };
    lpSallesTexte?: { className?: string };
    lpSallesBouton?: { className?: string };
    lpSallesOeuvre?: { className?: string };
    lpSallesIndex?: { className?: string };
  };
};

export const defaultProps = {
  motOeuvre: 'œuvre',
  motOeuvres: 'œuvres',
  bronzeMot: 'Bronze',
  bronzeFond: { url: 'https://static.wixstatic.com/media/2d5176_6acc46f5b5e140e3b19dcbd398ea1af2~mv2.webp', uri: '2d5176_6acc46f5b5e140e3b19dcbd398ea1af2~mv2.webp', alt: '' },
  bronzeCategorie: 'Bronze',
  bronzeTexte: 'Façonnées en plâtre puis fondues en bronze par les fonderies Chapon et Avangini, le plus souvent en tirages numérotés.',
  bronzeBouton: 'Entrer dans la salle Bronze',
  bronzeTrio: 'Trio accueil – Bronze',
  ardoiseMot: 'Ardoise',
  ardoiseFond: { url: 'https://static.wixstatic.com/media/2d5176_82943e13801346088599d35b00ad3d27~mv2.webp', uri: '2d5176_82943e13801346088599d35b00ad3d27~mv2.webp', alt: '' },
  ardoiseCategorie: 'Ardoise',
  ardoiseTexte: 'Taille directe : l’ardoise est polie, cirée, parfois rehaussée à la cire dorée, puis posée sur un socle de bois, de pierre ou de métal.',
  ardoiseBouton: 'Entrer dans la salle Ardoise',
  ardoiseTrio: 'Trio accueil – Ardoise',
  pneuMot: 'Pneu',
  pneuNomAccessible: 'Pneu recyclé',
  pneuFond: { url: 'https://static.wixstatic.com/media/2d5176_ef71e1b833c041fcad5606f0500e1e31~mv2.webp', uri: '2d5176_ef71e1b833c041fcad5606f0500e1e31~mv2.webp', alt: '' },
  pneuCategorie: 'Pneu recyclé',
  pneuTexte: 'Pneus et chambres à air recyclés, découpés puis assemblés, parfois avec une pièce d’ardoise ou de bronze.',
  pneuBouton: 'Entrer dans la salle Pneu',
  pneuTrio: 'Trio accueil – Pneu',
  petitsLigne1: 'Petits',
  petitsLigne2: 'formats',
  petitsFond: { url: 'https://static.wixstatic.com/media/2d5176_1b52ead1106b455195f467be7d080081~mv2.webp', uri: '2d5176_1b52ead1106b455195f467be7d080081~mv2.webp', alt: '' },
  petitsCategorie: 'Petits formats',
  petitsTexte: 'Découvrez ici une sélection de sculptures à petit prix.',
  petitsBouton: 'Entrer dans la salle Petits formats',
  petitsTrio: 'Trio accueil – Petits formats',
  a11y: {},
} as const satisfies Omit<LpSallesProps, 'id' | 'className'>;
