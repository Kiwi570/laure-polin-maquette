import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpOuVoirProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre de la section */
  titre?: string;
  /** Texte à côté du titre */
  texte?: string;
  /** Étiquette du point sur la carte */
  etiquetteCarte?: string;
  /** Description de la carte pour les lecteurs d’écran */
  descriptionCarte?: string;

  /** Atelier : nom */
  atelierTitre?: string;
  /** Atelier : précision à droite */
  atelierPrecision?: string;
  /** Atelier : adresse */
  atelierAdresse?: string;
  /** Atelier : texte avant le téléphone */
  atelierVisites?: string;
  /** Atelier : téléphone affiché */
  atelierTelephone?: string;
  /** Atelier : lien du téléphone */
  atelierTelephoneLien?: string;
  /** Atelier : texte du lien d’itinéraire */
  atelierItineraire?: string;
  /** Atelier : adresse du lien d’itinéraire */
  atelierItineraireLien?: string;

  /** Galerie : nom */
  galerieTitre?: string;
  /** Galerie : texte du lien */
  galerieLienTexte?: string;
  /** Galerie : adresse du lien */
  galerieLien?: string;
  /** Galerie : texte */
  galerieTexte?: string;

  /** Plateforme en ligne : nom */
  plateformeTitre?: string;
  /** Plateforme : texte du lien */
  plateformeLienTexte?: string;
  /** Plateforme : adresse du lien */
  plateformeLien?: string;
  /** Plateforme : texte */
  plateformeTexte?: string;

  /** Expositions en cours et à venir : titre */
  exposTitre?: string;
  /** Expositions : précision à droite */
  exposPrecision?: string;
  /** Expositions : texte */
  exposTexte?: string;

  /** Expositions passées : titre (vide = bloc masqué) */
  passeesTitre?: string;
  /** Exposition passée : nom */
  passeeNom?: string;
  /** Exposition passée : dates et lieu */
  passeeTexte?: string;
  /** Exposition passée : affiche */
  passeeAffiche?: Image;

  elementProps?: {
    lpOuVoirTitre?: { className?: string };
    lpOuVoirTexte?: { className?: string };
    lpOuVoirCarte?: { className?: string };
    lpOuVoirLieuTitre?: { className?: string };
    lpOuVoirLieuTexte?: { className?: string };
    lpOuVoirLien?: { className?: string };
    lpOuVoirPassees?: { className?: string };
  };
};

export const defaultProps = {
  titre: 'Où voir les œuvres',
  texte: 'Aujourd’hui : l’atelier de Bagnolet, sur rendez-vous, et les lieux qui présentent les sculptures toute l’année.',
  etiquetteCarte: 'Atelier, Bagnolet',
  descriptionCarte: 'Carte de France : l’atelier de Laure Polin à Bagnolet, à l’est de Paris',
  atelierTitre: 'Atelier de Bagnolet',
  atelierPrecision: 'Seine-Saint-Denis',
  atelierAdresse: '51 rue Lénine, 93170 Bagnolet.',
  atelierVisites: 'Visites de l’atelier sur rendez-vous. Pour convenir d’une visite :',
  atelierTelephone: '06 77 80 59 60',
  atelierTelephoneLien: 'tel:+33677805960',
  atelierItineraire: 'Itinéraire vers l’atelier',
  atelierItineraireLien: 'https://www.google.com/maps/dir/?api=1&destination=51%20rue%20L%C3%A9nine%2C%2093170%20Bagnolet%2C%20France',
  galerieTitre: 'Galerie Majestic',
  galerieLienTexte: 'Voir la galerie',
  galerieLien: 'https://www.majestic-gallery.com/collections/laure-polin',
  galerieTexte: 'Laure Polin en est artiste permanente ; ses sculptures y sont aussi en vente.',
  plateformeTitre: 'Rise Art',
  plateformeLienTexte: 'Voir la page',
  plateformeLien: 'https://www.riseart.com/fr/artiste/130832/laure-polin',
  plateformeTexte: 'Œuvres présentées sur la plateforme d’art contemporain en ligne.',
  exposTitre: 'Expositions et salons',
  exposPrecision: 'En cours et à venir',
  exposTexte: 'Aucune exposition n’est annoncée pour le moment. Les prochaines dates seront publiées ici.',
  passeesTitre: 'Expositions passées',
  passeeNom: 'Vendée Art Show 2025',
  passeeTexte: 'Du 31 octobre au 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.',
  passeeAffiche: {
    url: 'https://static.wixstatic.com/media/2d5176_5e41547f770849848e0a0a48240cdfa7~mv2.webp',
    uri: '2d5176_5e41547f770849848e0a0a48240cdfa7~mv2.webp',
    alt: 'Affiche du Vendée Art Show, 31 octobre, 1er et 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.',
  },
  a11y: {},
} as const satisfies Omit<LpOuVoirProps, 'id' | 'className'>;
