import type { A11y, Direction } from '@wix/editor-react-types';

/** Un choix de la ligne « Votre demande » */
export type Demande = {
  /** Libellé de la pastille */
  libelle?: string;
  /** Libellé de la pastille (anglais) */
  libelleEn?: string;
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
  /** Texte à côté du titre (anglais) */
  texteEn?: string;
  /** Petit titre au-dessus de l’adresse */
  etiquetteAtelier?: string;
  /** Petit titre au-dessus de l’adresse (anglais) */
  etiquetteAtelierEn?: string;
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
  /** Visites : texte avant le téléphone (anglais) */
  visitesTexteEn?: string;
  /** Visites : téléphone affiché */
  visitesTelephone?: string;
  /** Visites : téléphone affiché (anglais) */
  visitesTelephoneEn?: string;
  /** Lien d’itinéraire : texte */
  itineraireTexte?: string;
  /** Lien d’itinéraire : texte (anglais) */
  itineraireTexteEn?: string;
  /** Lien d’itinéraire : adresse */
  itineraireLien?: string;
  /** Description du plan pour les lecteurs d’écran */
  descriptionPlan?: string;
  /** Description du plan pour les lecteurs d’écran (anglais) */
  descriptionPlanEn?: string;
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

  /** Formulaire : légende des types de demande (anglais) */

  legendeDemandeEn?: string;
  /** Formulaire : types de demande (le premier est coché) */
  demandes: Array<Demande>;
  /** Formulaire : libellé de la liste des œuvres */
  libelleOeuvre?: string;
  /** Formulaire : libellé de la liste des œuvres (anglais) */
  libelleOeuvreEn?: string;
  /** Formulaire : premier choix de la liste des œuvres */
  optionAucune?: string;
  /** Formulaire : premier choix de la liste des œuvres (anglais) */
  optionAucuneEn?: string;
  /** Catégories Wix Stores des œuvres proposées dans la liste (noms séparés par des virgules) */
  categoriesOeuvres?: string;
  /** Formulaire : libellé du nom */
  libelleNom?: string;
  /** Formulaire : libellé du nom (anglais) */
  libelleNomEn?: string;
  /** Formulaire : libellé de l’e-mail */
  libelleEmail?: string;
  /** Formulaire : libellé de l’e-mail (anglais) */
  libelleEmailEn?: string;
  /** Formulaire : libellé du téléphone */
  libelleTelephone?: string;
  /** Formulaire : libellé du téléphone (anglais) */
  libelleTelephoneEn?: string;
  /** Formulaire : libellé du message */
  libelleMessage?: string;
  /** Formulaire : texte du bouton */
  boutonEnvoyer?: string;
  /** Formulaire : texte du bouton (anglais) */
  boutonEnvoyerEn?: string;
  /** Formulaire : note sous le bouton */
  noteEnvoi?: string;
  /** Formulaire : note sous le bouton (anglais) */
  noteEnvoiEn?: string;
  /** Erreur : début de la phrase */
  erreurDebut?: string;
  /** Erreur : début de la phrase (anglais) */
  erreurDebutEn?: string;
  /** Erreur : nom manquant */
  erreurNom?: string;
  /** Erreur : nom manquant (anglais) */
  erreurNomEn?: string;
  /** Erreur : e-mail manquant ou invalide */
  erreurEmail?: string;
  /** Erreur : e-mail manquant ou invalide (anglais) */
  erreurEmailEn?: string;
  /** Erreur : message manquant */
  erreurMessage?: string;
  /** Erreur : message manquant (anglais) */
  erreurMessageEn?: string;
  /** Confirmation : titre ({nom} = nom saisi) */
  merciTitre?: string;
  /** Confirmation : titre ({nom} = nom saisi) (anglais) */
  merciTitreEn?: string;
  /** Confirmation : texte ({oeuvre} = mention de l’œuvre, {email} = e-mail saisi) */
  merciTexte?: string;
  /** Confirmation : texte ({oeuvre} = mention de l’œuvre, {email} = e-mail saisi) (anglais) */
  merciTexteEn?: string;
  /** Confirmation : mention de l’œuvre ({titre} = titre de l’œuvre) */
  merciOeuvre?: string;
  /** Confirmation : mention de l’œuvre ({titre} = titre de l’œuvre) (anglais) */
  merciOeuvreEn?: string;

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
  texteEn: 'A question about a work, more photos, a price, a commission or a visit to the studio: Laure Polin answers personally.',
  etiquetteAtelier: 'L’atelier',
  etiquetteAtelierEn: 'The studio',
  adresseLigne1: '51 rue Lénine',
  adresseLigne2: '93170 Bagnolet',
  telephone: '+33 6 77 80 59 60',
  telephoneLien: 'tel:+33677805960',
  email: 'contact@sculptures-fr.com',
  visitesTexte: 'Visites de l’atelier sur rendez-vous. Pour convenir d’une visite :',
  visitesTexteEn: 'Studio visits by appointment. To arrange a visit:',
  visitesTelephone: '06 77 80 59 60',
  visitesTelephoneEn: '+33 6 77 80 59 60',
  itineraireTexte: 'Itinéraire vers l’atelier',
  itineraireTexteEn: 'Directions to the studio',
  itineraireLien: 'https://www.google.com/maps/dir/?api=1&destination=51%20rue%20L%C3%A9nine%2C%2093170%20Bagnolet%2C%20France',
  descriptionPlan: 'Plan : Bagnolet, à l’est de Paris, entre Montreuil, Romainville et Les Lilas',
  descriptionPlanEn: 'Map: Bagnolet, east of Paris, between Montreuil, Romainville and Les Lilas',
  instagramTexte: 'Instagram',
  instagramLien: 'https://www.instagram.com/laurepolin/',
  facebookTexte: 'Facebook',
  facebookLien: 'https://www.facebook.com/sculptureslaure/',
  legendeDemande: 'Votre demande',
  legendeDemandeEn: 'Your request',
  demandes: [
    { libelle: 'Acquérir une œuvre', libelleEn: 'Buy a work', valeur: 'acquerir' },
    { libelle: 'Plus de photos ou un tarif', libelleEn: 'More photos or a price', valeur: 'photos' },
    { libelle: 'Visiter l’atelier', libelleEn: 'Visit the studio', valeur: 'visite' },
    { libelle: 'Une commande', libelleEn: 'A commission', valeur: 'commande' },
    { libelle: 'Exposition, salon', libelleEn: 'Exhibition, fair', valeur: 'exposition' },
  ],
  libelleOeuvre: 'Œuvre concernée',
  libelleOeuvreEn: 'Work concerned',
  optionAucune: 'Aucune en particulier',
  optionAucuneEn: 'None in particular',
  categoriesOeuvres: 'Ardoise, Bronze, Pneu recyclé, Petits formats',
  libelleNom: 'Nom',
  libelleNomEn: 'Name',
  libelleEmail: 'E-mail',
  libelleEmailEn: 'Email',
  libelleTelephone: 'Téléphone (facultatif)',
  libelleTelephoneEn: 'Phone (optional)',
  libelleMessage: 'Message',
  boutonEnvoyer: 'Envoyer la demande',
  boutonEnvoyerEn: 'Send the request',
  noteEnvoi: 'Maquette : le message n’est pas envoyé. Sur le site final, il arrivera à contact@sculptures-fr.com.',
  noteEnvoiEn: 'Mock-up: the message is not sent. On the final site it will go to contact@sculptures-fr.com.',
  erreurDebut: 'Il manque',
  erreurDebutEn: 'Missing:',
  erreurNom: 'votre nom',
  erreurNomEn: 'your name',
  erreurEmail: 'une adresse e-mail valide',
  erreurEmailEn: 'a valid email address',
  erreurMessage: 'un message',
  erreurMessageEn: 'a message',
  merciTitre: 'Merci {nom}.',
  merciTitreEn: 'Thank you, {nom}.',
  merciTexte: 'Votre demande{oeuvre} est prête. Dans cette maquette, rien n’est envoyé : sur le site final, elle arrivera directement à Laure Polin, qui vous répondra à l’adresse {email}.',
  merciTexteEn: 'Your request{oeuvre} is ready. In this mock-up nothing is sent: on the final site it will go straight to Laure Polin, who will reply to {email}.',
  merciOeuvre: ' au sujet de « {titre} »',
  merciOeuvreEn: ' about “{titre}”',
  a11y: {},
} as const satisfies Omit<LpContactProps, 'id' | 'className'>;
