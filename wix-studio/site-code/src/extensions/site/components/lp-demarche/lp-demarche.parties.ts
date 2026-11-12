// Parties éditables directement dans l'éditeur Wix (clic sur l'élément = ses seuls réglages).
// Ajouts au manifeste uniquement : nouvelles données de parties, aucun type déjà enregistré n'est modifié.
// Compatibilité : la page lit d'abord la donnée de la partie, puis le champ du bloc (paragraphe1, portrait),
// puis la valeur par défaut ; les champs du bloc remplacés sont masqués du panneau du bloc mais conservés.
import { defaultProps } from './lp-demarche.props';

const portrait = {
  uri: defaultProps.portrait.uri,
  url: defaultProps.portrait.url,
  name: 'lp-portrait.webp',
  width: 1600,
  height: 1066,
  alt: defaultProps.portrait.alt,
};

export const parties = {
  displayFilters: {
    data: { hide: ['paragraphe1', 'paragraphe1En', 'portrait', 'portraitAltEn'] },
  },
  elements: {
    lpDemarcheParagraphe1: {
      elementType: 'inlineElement',
      inlineElement: {
        displayName: 'Premier paragraphe',
        behaviors: { selectable: true, removable: false, duplicatable: false },
        data: {
          texte: { dataType: 'text', displayName: 'Texte', defaultValue: defaultProps.paragraphe1 },
          texteEn: { dataType: 'text', displayName: 'Texte (anglais)', defaultValue: defaultProps.paragraphe1En },
        },
      },
    },
    lpDemarchePortrait: {
      elementType: 'inlineElement',
      inlineElement: {
        displayName: 'Portrait de l’artiste',
        behaviors: { selectable: true, removable: false, duplicatable: false },
        data: {
          image: { dataType: 'image', displayName: 'Photo', defaultValue: portrait, image: { category: 'IMAGE' } },
          altEn: { dataType: 'text', displayName: 'Description de la photo (anglais)', defaultValue: defaultProps.portraitAltEn },
        },
      },
    },
  },
};
