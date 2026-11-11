import type { A11y, Direction } from '@wix/editor-react-types';

/** Un choix de la ligne « Votre demande » */
export type Demande = {
  /** Libellé de la pastille */
  libelle?: string;
  /** Valeur transmise avec la demande */
  valeur?: string;
};

export type LpContactProps = {
  id: string;
  className?: string;
  direction?: Direction;
  a11y?: A11y;

  /** Titre de la section */
  titre?: string;
  /** Texte à côté du titre */
  texte?: string;
  /** Petit titre au-dessus de l’adresse */
  etiquetteAtelier?: string;
  /** Adresse, première ligne */
  adresseLigne1?: string;
  /** Adresse, deuxième ligne */
  adresseLigne2?: string;
  /** Téléphone affiché */
  telephone?: string;
  /** Lien du téléphone */
  telephoneLien?: string;
  /** Adresse e-mail */
  email?: string;
  /** Visites : texte avant le téléphone */
  visitesTexte?: string;
  /** Visites : téléphone affiché */
  visitesTelephone?: string;
  /** Lien d’itinéraire : texte */
  itineraireTexte?: string;
  /** Lien d’itinéraire : adresse */
  itineraireLien?: string;
  /** Description du plan pour les lecteurs d’écran */
  descriptionPlan?: string;
  /** Bouton Instagram : texte */
  instagramTexte?: string;
  /** Bouton Instagram : adresse */
  instagramLien?: string;
  /** Bouton Facebook : texte */
  facebookTexte?: string;
  /** Bouton Facebook : adresse */
  facebookLien?: string;

  /** Formulaire : légende des types de demande */
  legendeDemande?: string;
  /** Formulaire : types de demande (le premier est coché) */
  demandes: Array<Demande>;
  /** Formulaire : libellé de la liste des œuvres */
  libelleOeuvre?: string;
  /** Formulaire : premier choix de la liste des œuvres */
  optionAucune?: string;
  /** Catégories Wix Stores des œuvres proposées dans la liste (noms séparés par des virgules) */
  categoriesOeuvres?: string;
  /** Formulaire : libellé du nom */
  libelleNom?: string;
  /** Formulaire : libellé de l’e-mail */
  libelleEmail?: string;
  /** Formulaire : libellé du téléphone */
  libelleTelephone?: string;
  /** Formulaire : libellé du message */
  libelleMessage?: string;
  /** Formulaire : texte du bouton */
  boutonEnvoyer?: string;
  /** Formulaire : note sous le bouton */
  noteEnvoi?: string;
  /** Erreur : début de la phrase */
  erreurDebut?: string;
  /** Erreur : nom manquant */
  erreurNom?: string;
  /** Erreur : e-mail manquant ou invalide */
  erreurEmail?: string;
  /** Erreur : message manquant */
  erreurMessage?: string;
  /** Confirmation : titre ({nom} = nom saisi) */
  merciTitre?: string;
  /** Confirmation : texte ({oeuvre} = mention de l’œuvre, {email} = e-mail saisi) */
  merciTexte?: string;
  /** Confirmation : mention de l’œuvre ({titre} = titre de l’œuvre) */
  merciOeuvre?: string;

  elementProps?: {
    lpContactTitre?: { className?: string };
    lpContactTexte?: { className?: string };
    lpContactAdresse?: { className?: string };
    lpContactLien?: { className?: string };
    lpContactPlan?: { className?: string };
    lpContactReseau?: { className?: string };
    lpContactChoix?: { className?: string };
    lpContactChamp?: { className?: string };
    lpContactLibelle?: { className?: string };
    lpContactEnvoyer?: { className?: string };
    lpContactNote?: { className?: string };
    lpContactConfirmation?: { className?: string };
  };
};

export const defaultProps = {
  titre: 'Contact',
  texte: 'Une question sur une œuvre, d’autres photos, un tarif, une commande ou une visite de l’atelier : Laure Polin répond elle-même.',
  etiquetteAtelier: 'L’atelier',
  adresseLigne1: '51 rue Lénine',
  adresseLigne2: '93170 Bagnolet',
  telephone: '+33 6 77 80 59 60',
  telephoneLien: 'tel:+33677805960',
  email: 'contact@sculptures-fr.com',
  visitesTexte: 'Visites de l’atelier sur rendez-vous. Pour convenir d’une visite :',
  visitesTelephone: '06 77 80 59 60',
  itineraireTexte: 'Itinéraire vers l’atelier',
  itineraireLien: 'https://www.google.com/maps/dir/?api=1&destination=51%20rue%20L%C3%A9nine%2C%2093170%20Bagnolet%2C%20France',
  descriptionPlan: 'Plan : Bagnolet, à l’est de Paris, entre Montreuil, Romainville et Les Lilas',
  instagramTexte: 'Instagram',
  instagramLien: 'https://www.instagram.com/laurepolin/',
  facebookTexte: 'Facebook',
  facebookLien: 'https://www.facebook.com/sculptureslaure/',
  legendeDemande: 'Votre demande',
  demandes: [
    { libelle: 'Acquérir une œuvre', valeur: 'acquerir' },
    { libelle: 'Plus de photos ou un tarif', valeur: 'photos' },
    { libelle: 'Visiter l’atelier', valeur: 'visite' },
    { libelle: 'Une commande', valeur: 'commande' },
    { libelle: 'Exposition, salon', valeur: 'exposition' },
  ],
  libelleOeuvre: 'Œuvre concernée',
  optionAucune: 'Aucune en particulier',
  categoriesOeuvres: 'Ardoise, Bronze, Pneu recyclé, Petits formats',
  libelleNom: 'Nom',
  libelleEmail: 'E-mail',
  libelleTelephone: 'Téléphone (facultatif)',
  libelleMessage: 'Message',
  boutonEnvoyer: 'Envoyer la demande',
  noteEnvoi: 'Maquette : le message n’est pas envoyé. Sur le site final, il arrivera à contact@sculptures-fr.com.',
  erreurDebut: 'Il manque',
  erreurNom: 'votre nom',
  erreurEmail: 'une adresse e-mail valide',
  erreurMessage: 'un message',
  merciTitre: 'Merci {nom}.',
  merciTexte: 'Votre demande{oeuvre} est prête. Dans cette maquette, rien n’est envoyé : sur le site final, elle arrivera directement à Laure Polin, qui vous répondra à l’adresse {email}.',
  merciOeuvre: ' au sujet de « {titre} »',
  a11y: {},
} as const satisfies Omit<LpContactProps, 'id' | 'className'>;
