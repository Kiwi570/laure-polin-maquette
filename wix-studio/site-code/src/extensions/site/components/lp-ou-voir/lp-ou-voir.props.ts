import type { A11y, Direction, Image } from '@wix/editor-react-types';

export type LpOuVoirProps = {
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
  /** Étiquette du point sur la carte */
  etiquetteCarte?: string;
  /** Étiquette du point sur la carte (anglais) */
  etiquetteCarteEn?: string;
  /** Description de la carte pour les lecteurs d’écran */
  descriptionCarte?: string;
  /** Description de la carte pour les lecteurs d’écran (anglais) */
  descriptionCarteEn?: string;

  /** Atelier : nom */
  atelierTitre?: string;

  /** Atelier : nom (anglais) */

  atelierTitreEn?: string;
  /** Atelier : précision à droite */
  atelierPrecision?: string;
  /** Atelier : précision à droite (anglais) */
  atelierPrecisionEn?: string;
  /** Atelier : adresse */
  atelierAdresse?: string;
  /** Atelier : adresse (anglais) */
  atelierAdresseEn?: string;
  /** Atelier : texte avant le téléphone */
  atelierVisites?: string;
  /** Atelier : texte avant le téléphone (anglais) */
  atelierVisitesEn?: string;
  /** Atelier : téléphone affiché */
  atelierTelephone?: string;
  /** Atelier : téléphone affiché (anglais) */
  atelierTelephoneEn?: string;
  /** Atelier : lien du téléphone */
  atelierTelephoneLien?: string;
  /** Atelier : texte du lien d’itinéraire */
  atelierItineraire?: string;
  /** Atelier : texte du lien d’itinéraire (anglais) */
  atelierItineraireEn?: string;
  /** Atelier : adresse du lien d’itinéraire */
  atelierItineraireLien?: string;

  /** Galerie : nom */
  galerieTitre?: string;

  /** Galerie : nom (anglais) */

  galerieTitreEn?: string;
  /** Galerie : texte du lien */
  galerieLienTexte?: string;
  /** Galerie : texte du lien (anglais) */
  galerieLienTexteEn?: string;
  /** Galerie : adresse du lien */
  galerieLien?: string;
  /** Galerie : texte */
  galerieTexte?: string;
  /** Galerie : texte (anglais) */
  galerieTexteEn?: string;

  /** Plateforme en ligne : nom */
  plateformeTitre?: string;
  /** Plateforme : texte du lien */
  plateformeLienTexte?: string;
  /** Plateforme : texte du lien (anglais) */
  plateformeLienTexteEn?: string;
  /** Plateforme : adresse du lien */
  plateformeLien?: string;
  /** Plateforme : texte */
  plateformeTexte?: string;
  /** Plateforme : texte (anglais) */
  plateformeTexteEn?: string;

  /** Expositions en cours et à venir : titre */
  exposTitre?: string;

  /** Expositions en cours et à venir : titre (anglais) */

  exposTitreEn?: string;
  /** Expositions : précision à droite */
  exposPrecision?: string;
  /** Expositions : précision à droite (anglais) */
  exposPrecisionEn?: string;
  /** Expositions : texte */
  exposTexte?: string;
  /** Expositions : texte (anglais) */
  exposTexteEn?: string;

  /** Expositions passées : titre (vide = bloc masqué) */
  passeesTitre?: string;

  /** Expositions passées : titre (vide = bloc masqué) (anglais) */

  passeesTitreEn?: string;
  /** Exposition passée : nom */
  passeeNom?: string;
  /** Exposition passée : dates et lieu */
  passeeTexte?: string;
  /** Exposition passée : dates et lieu (anglais) */
  passeeTexteEn?: string;
  /** Exposition passée : affiche */
  passeeAffiche?: Image;
  /** Exposition passée : affiche — texte alternatif en anglais */
  passeeAfficheAltEn?: string;

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
  titreEn: 'Where to see the works',
  texte: 'Aujourd’hui : l’atelier de Bagnolet, sur rendez-vous, et les lieux qui présentent les sculptures toute l’année.',
  texteEn: 'Today: the studio in Bagnolet, by appointment, and the places that show the sculptures all year round.',
  etiquetteCarte: 'Atelier, Bagnolet',
  etiquetteCarteEn: 'Studio, Bagnolet',
  descriptionCarte: 'Carte de France : l’atelier de Laure Polin à Bagnolet, à l’est de Paris',
  descriptionCarteEn: 'Map of France: Laure Polin’s studio in Bagnolet, east of Paris',
  atelierTitre: 'Atelier de Bagnolet',
  atelierTitreEn: 'Bagnolet studio',
  atelierPrecision: 'Seine-Saint-Denis',
  atelierPrecisionEn: 'Seine-Saint-Denis, east of Paris',
  atelierAdresse: '51 rue Lénine, 93170 Bagnolet.',
  atelierAdresseEn: '51 rue Lénine, 93170 Bagnolet, France.',
  atelierVisites: 'Visites de l’atelier sur rendez-vous. Pour convenir d’une visite :',
  atelierVisitesEn: 'Studio visits by appointment. To arrange a visit:',
  atelierTelephone: '06 77 80 59 60',
  atelierTelephoneEn: '+33 6 77 80 59 60',
  atelierTelephoneLien: 'tel:+33677805960',
  atelierItineraire: 'Itinéraire vers l’atelier',
  atelierItineraireEn: 'Directions to the studio',
  atelierItineraireLien: 'https://www.google.com/maps/dir/?api=1&destination=51%20rue%20L%C3%A9nine%2C%2093170%20Bagnolet%2C%20France',
  galerieTitre: 'Galerie Majestic',
  galerieTitreEn: 'Majestic Gallery',
  galerieLienTexte: 'Voir la galerie',
  galerieLienTexteEn: 'See the gallery',
  galerieLien: 'https://www.majestic-gallery.com/collections/laure-polin',
  galerieTexte: 'Laure Polin en est artiste permanente ; ses sculptures y sont aussi en vente.',
  galerieTexteEn: 'Laure Polin is one of its permanent artists; her sculptures are also for sale there.',
  plateformeTitre: 'Rise Art',
  plateformeLienTexte: 'Voir la page',
  plateformeLienTexteEn: 'See the page',
  plateformeLien: 'https://www.riseart.com/fr/artiste/130832/laure-polin',
  plateformeTexte: 'Œuvres présentées sur la plateforme d’art contemporain en ligne.',
  plateformeTexteEn: 'Works shown on the online contemporary art platform.',
  exposTitre: 'Expositions et salons',
  exposTitreEn: 'Exhibitions and fairs',
  exposPrecision: 'En cours et à venir',
  exposPrecisionEn: 'Current and upcoming',
  exposTexte: 'Aucune exposition n’est annoncée pour le moment. Les prochaines dates seront publiées ici.',
  exposTexteEn: 'No exhibition is announced for the moment. Upcoming dates will be published here.',
  passeesTitre: 'Expositions passées',
  passeesTitreEn: 'Past exhibitions',
  passeeNom: 'Vendée Art Show 2025',
  passeeTexte: 'Du 31 octobre au 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.',
  passeeTexteEn: '31 October to 2 November 2025, Les Atlantes conference centre, Les Sables-d’Olonne.',
  passeeAffiche: {
    url: 'https://static.wixstatic.com/media/2d5176_5e41547f770849848e0a0a48240cdfa7~mv2.webp',
    uri: '2d5176_5e41547f770849848e0a0a48240cdfa7~mv2.webp',
    alt: 'Affiche du Vendée Art Show, 31 octobre, 1er et 2 novembre 2025, Centre de congrès Les Atlantes, Les Sables-d’Olonne.',
  },
  passeeAfficheAltEn: 'Poster for the Vendée Art Show, 31 October, 1 and 2 November 2025, Les Atlantes conference centre, Les Sables-d’Olonne.',
  a11y: {},
} as const satisfies Omit<LpOuVoirProps, 'id' | 'className'>;
