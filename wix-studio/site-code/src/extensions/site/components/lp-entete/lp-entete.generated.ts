/**
 * THIS FILE IS AUTO-GENERATED — DO NOT EDIT.
 * It contains the `editorElement` portion of the manifest, automatically derived from your component's
 * source code, prop types, and CSS rules.
 * Update your source code and run `npx wix build && npx wix generate manifest` to regenerate it.
 * If you need to override specific manifest values (sizing, layout, etc.),
 * you can do so in lp-entete.extension.ts.
 */

import type { EditorElement } from '@wix/react-component-schema';

export const editorElement = {
  "selector": ".lp-entete",
  "displayName": "Lp Entete",
  "data": {
    "direction": {
      "displayName": "Direction",
      "dataType": "direction"
    },
    "logo": {
      "displayName": "Logo",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "logoTexteAccessible": {
      "displayName": "Logo Texte Accessible",
      "dataType": "text",
      "text": {}
    },
    "logoTexteAccessibleEn": {
      "displayName": "Logo Texte Accessible En",
      "dataType": "text",
      "text": {}
    },
    "lienAccueil": {
      "displayName": "Lien Accueil",
      "dataType": "webUrl"
    },
    "libelleOeuvres": {
      "displayName": "Libelle Oeuvres",
      "dataType": "text",
      "text": {}
    },
    "libelleOeuvresEn": {
      "displayName": "Libelle Oeuvres En",
      "dataType": "text",
      "text": {}
    },
    "salles": {
      "displayName": "Salles",
      "dataType": "arrayItems",
      "arrayItems": {
        "data": {
          "items": {
            "titre": {
              "displayName": "Titre",
              "dataType": "text",
              "text": {}
            },
            "titreEn": {
              "displayName": "Titre En",
              "dataType": "text",
              "text": {}
            },
            "categorie": {
              "displayName": "Categorie",
              "dataType": "text",
              "text": {}
            },
            "image": {
              "displayName": "Image",
              "dataType": "image",
              "image": {
                "category": "IMAGE"
              }
            },
            "lien": {
              "displayName": "Lien",
              "dataType": "webUrl"
            }
          }
        }
      }
    },
    "motOeuvre": {
      "displayName": "Mot Oeuvre",
      "dataType": "text",
      "text": {}
    },
    "motOeuvreEn": {
      "displayName": "Mot Oeuvre En",
      "dataType": "text",
      "text": {}
    },
    "motOeuvres": {
      "displayName": "Mot Oeuvres",
      "dataType": "text",
      "text": {}
    },
    "motOeuvresEn": {
      "displayName": "Mot Oeuvres En",
      "dataType": "text",
      "text": {}
    },
    "libelleLivre": {
      "displayName": "Libelle Livre",
      "dataType": "text",
      "text": {}
    },
    "libelleLivreEn": {
      "displayName": "Libelle Livre En",
      "dataType": "text",
      "text": {}
    },
    "lienLivre": {
      "displayName": "Lien Livre",
      "dataType": "webUrl"
    },
    "libelleExpositions": {
      "displayName": "Libelle Expositions",
      "dataType": "text",
      "text": {}
    },
    "libelleExpositionsEn": {
      "displayName": "Libelle Expositions En",
      "dataType": "text",
      "text": {}
    },
    "lienExpositions": {
      "displayName": "Lien Expositions",
      "dataType": "webUrl"
    },
    "libelleContact": {
      "displayName": "Libelle Contact",
      "dataType": "text",
      "text": {}
    },
    "libelleContactEn": {
      "displayName": "Libelle Contact En",
      "dataType": "text",
      "text": {}
    },
    "lienContact": {
      "displayName": "Lien Contact",
      "dataType": "webUrl"
    },
    "titreMenuSalles": {
      "displayName": "Titre Menu Salles",
      "dataType": "text",
      "text": {}
    },
    "titreMenuSallesEn": {
      "displayName": "Titre Menu Salles En",
      "dataType": "text",
      "text": {}
    },
    "lienPanier": {
      "displayName": "Lien Panier",
      "dataType": "text",
      "text": {}
    },
    "texteOuverture": {
      "displayName": "Texte Ouverture",
      "dataType": "text",
      "text": {}
    },
    "texteOuvertureEn": {
      "displayName": "Texte Ouverture En",
      "dataType": "text",
      "text": {}
    },
    "fondOuverture": {
      "displayName": "Fond Ouverture",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "messageAjout": {
      "displayName": "Message Ajout",
      "dataType": "text",
      "text": {}
    },
    "messageAjoutEn": {
      "displayName": "Message Ajout En",
      "dataType": "text",
      "text": {}
    },
    "messageDeja": {
      "displayName": "Message Deja",
      "dataType": "text",
      "text": {}
    },
    "messageDejaEn": {
      "displayName": "Message Deja En",
      "dataType": "text",
      "text": {}
    },
    "messageErreur": {
      "displayName": "Message Erreur",
      "dataType": "text",
      "text": {}
    },
    "messageErreurEn": {
      "displayName": "Message Erreur En",
      "dataType": "text",
      "text": {}
    },
    "ouvertureAnimee": {
      "displayName": "Ouverture Animee",
      "dataType": "booleanValue"
    },
    "defilementDoux": {
      "displayName": "Defilement Doux",
      "dataType": "booleanValue"
    },
    "transitionsPages": {
      "displayName": "Transitions Pages",
      "dataType": "booleanValue"
    },
    "selecteurLangue": {
      "displayName": "Selecteur Langue",
      "dataType": "booleanValue"
    },
    "boutonFrancais": {
      "displayName": "Bouton Francais",
      "dataType": "text",
      "text": {}
    },
    "boutonAnglais": {
      "displayName": "Bouton Anglais",
      "dataType": "text",
      "text": {}
    },
    "isOpen": {
      "displayName": "Is Open",
      "dataType": "booleanValue"
    }
  },
  "elements": {
    "lpEnteteLogo": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-logo",
        "displayName": "Logo",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "flex"
              ]
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "background": {},
          "borderTop": {},
          "borderBottom": {},
          "borderInlineStart": {},
          "borderInlineEnd": {},
          "paddingTop": {
            "defaultValue": "0"
          },
          "paddingBottom": {
            "defaultValue": "0"
          },
          "paddingInlineStart": {
            "defaultValue": "0"
          },
          "paddingInlineEnd": {
            "defaultValue": "0"
          },
          "borderStartStartRadius": {
            "defaultValue": "4px"
          },
          "borderStartEndRadius": {
            "defaultValue": "4px"
          },
          "borderEndStartRadius": {
            "defaultValue": "4px"
          },
          "borderEndEndRadius": {
            "defaultValue": "4px"
          },
          "boxShadow": {},
          "width": {},
          "height": {},
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-logo--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteMenuOeuvres": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-menu-oeuvres",
        "displayName": "Menu Oeuvres",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "none"
          },
          "borderTop": {
            "defaultValue": "0"
          },
          "borderBottom": {
            "defaultValue": "0"
          },
          "borderInlineStart": {
            "defaultValue": "0"
          },
          "borderInlineEnd": {
            "defaultValue": "0"
          },
          "paddingTop": {
            "defaultValue": "10px"
          },
          "paddingBottom": {
            "defaultValue": "10px"
          },
          "paddingInlineStart": {
            "defaultValue": "0"
          },
          "paddingInlineEnd": {
            "defaultValue": "0"
          },
          "borderStartStartRadius": {},
          "borderStartEndRadius": {},
          "borderEndStartRadius": {},
          "borderEndEndRadius": {},
          "boxShadow": {},
          "width": {},
          "height": {},
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inlineFlex"
              ]
            }
          },
          "font": {
            "defaultValue": "inherit"
          },
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--craie-2)",
            "statesDefaultValues": {
              "hover": "var(--craie)"
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {}
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-menu-oeuvres--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteSalle": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-salle",
        "displayName": "Salle",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "grid"
              ]
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "background": {
            "statesDefaultValues": {
              "hover": "var(--ardoise-2)"
            }
          },
          "borderTop": {},
          "borderBottom": {},
          "borderInlineStart": {},
          "borderInlineEnd": {},
          "paddingTop": {
            "defaultValue": "10px"
          },
          "paddingBottom": {
            "defaultValue": "10px"
          },
          "paddingInlineStart": {
            "defaultValue": "10px"
          },
          "paddingInlineEnd": {
            "defaultValue": "10px"
          },
          "borderStartStartRadius": {
            "defaultValue": "var(--rayon)"
          },
          "borderStartEndRadius": {
            "defaultValue": "var(--rayon)"
          },
          "borderEndStartRadius": {
            "defaultValue": "var(--rayon)"
          },
          "borderEndEndRadius": {
            "defaultValue": "var(--rayon)"
          },
          "boxShadow": {},
          "width": {},
          "height": {},
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-salle--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteLien": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-lien",
        "displayName": "Lien",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inline"
              ]
            }
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-lien--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteContact": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-contact",
        "displayName": "Contact",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inline"
              ]
            }
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-contact--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEntetePanier": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-panier",
        "displayName": "Panier",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "none"
          },
          "borderTop": {
            "defaultValue": "1px solid transparent"
          },
          "borderBottom": {
            "defaultValue": "1px solid transparent"
          },
          "borderInlineStart": {
            "defaultValue": "1px solid transparent"
          },
          "borderInlineEnd": {
            "defaultValue": "1px solid transparent"
          },
          "paddingTop": {
            "defaultValue": "0"
          },
          "paddingBottom": {
            "defaultValue": "0"
          },
          "paddingInlineStart": {
            "defaultValue": "12px"
          },
          "paddingInlineEnd": {
            "defaultValue": "12px"
          },
          "borderStartStartRadius": {
            "defaultValue": "999px"
          },
          "borderStartEndRadius": {
            "defaultValue": "999px"
          },
          "borderEndStartRadius": {
            "defaultValue": "999px"
          },
          "borderEndEndRadius": {
            "defaultValue": "999px"
          },
          "boxShadow": {},
          "width": {},
          "height": {
            "defaultValue": "42px"
          },
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inlineFlex"
              ]
            }
          },
          "font": {
            "defaultValue": "inherit"
          },
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--craie-2)",
            "statesDefaultValues": {
              "hover": "var(--craie)"
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {}
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-panier--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteMenuBouton": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-menu-bouton",
        "displayName": "Menu Bouton",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "none"
          },
          "borderTop": {
            "defaultValue": "1px solid transparent"
          },
          "borderBottom": {
            "defaultValue": "1px solid transparent"
          },
          "borderInlineStart": {
            "defaultValue": "1px solid transparent"
          },
          "borderInlineEnd": {
            "defaultValue": "1px solid transparent"
          },
          "paddingTop": {
            "defaultValue": "0"
          },
          "paddingBottom": {
            "defaultValue": "0"
          },
          "paddingInlineStart": {
            "defaultValue": "12px"
          },
          "paddingInlineEnd": {
            "defaultValue": "12px"
          },
          "borderStartStartRadius": {
            "defaultValue": "999px"
          },
          "borderStartEndRadius": {
            "defaultValue": "999px"
          },
          "borderEndStartRadius": {
            "defaultValue": "999px"
          },
          "borderEndEndRadius": {
            "defaultValue": "999px"
          },
          "boxShadow": {},
          "width": {},
          "height": {
            "defaultValue": "42px"
          },
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inlineFlex"
              ]
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {}
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-menu-bouton--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteMenuTitre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-menu-titre",
        "displayName": "Menu Titre",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--graphite)"
          },
          "marginTop": {
            "defaultValue": "0"
          },
          "marginBottom": {
            "defaultValue": "1em"
          },
          "marginInlineStart": {
            "defaultValue": "0"
          },
          "marginInlineEnd": {
            "defaultValue": "0"
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "block"
              ]
            }
          }
        }
      }
    },
    "lpEnteteMenuSalle": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-menu-salle",
        "displayName": "Menu Salle",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inline"
              ]
            }
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-menu-salle--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteMenuLien": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-menu-lien",
        "displayName": "Menu Lien",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "inherit"
          },
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inline"
              ]
            }
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-entete-menu-lien--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpEnteteNotification": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-entete-notification",
        "displayName": "Notification",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "var(--craie)"
          },
          "borderTop": {},
          "borderBottom": {},
          "borderInlineStart": {},
          "borderInlineEnd": {},
          "paddingTop": {
            "defaultValue": "12px"
          },
          "paddingBottom": {
            "defaultValue": "12px"
          },
          "paddingInlineStart": {
            "defaultValue": "18px"
          },
          "paddingInlineEnd": {
            "defaultValue": "18px"
          },
          "borderStartStartRadius": {
            "defaultValue": "999px"
          },
          "borderStartEndRadius": {
            "defaultValue": "999px"
          },
          "borderEndStartRadius": {
            "defaultValue": "999px"
          },
          "borderEndEndRadius": {
            "defaultValue": "999px"
          },
          "boxShadow": {},
          "width": {},
          "height": {},
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "block"
              ]
            }
          }
        }
      }
    }
  },
  "cssProperties": {
    "background": {
      "defaultValue": "transparent"
    },
    "borderTop": {},
    "borderBottom": {},
    "borderInlineStart": {},
    "borderInlineEnd": {},
    "paddingTop": {
      "defaultValue": "0"
    },
    "paddingBottom": {
      "defaultValue": "0"
    },
    "paddingInlineStart": {
      "defaultValue": "0"
    },
    "paddingInlineEnd": {
      "defaultValue": "0"
    },
    "borderStartStartRadius": {},
    "borderStartEndRadius": {},
    "borderEndStartRadius": {},
    "borderEndEndRadius": {},
    "boxShadow": {},
    "overflow": {
      "defaultValue": "visible"
    },
    "mixBlendMode": {
      "defaultValue": "normal"
    }
  },
  "cssCustomProperties": {
    "ardoise-0": {
      "displayName": "Ardoise 0",
      "defaultValue": "#101317",
      "cssPropertyType": "color"
    },
    "ardoise-1": {
      "displayName": "Ardoise 1",
      "defaultValue": "#171b20",
      "cssPropertyType": "color"
    },
    "ardoise-2": {
      "displayName": "Ardoise 2",
      "defaultValue": "#20262d",
      "cssPropertyType": "background"
    },
    "ardoise-3": {
      "displayName": "Ardoise 3",
      "defaultValue": "#2c333b",
      "cssPropertyType": "color"
    },
    "ardoise-4": {
      "displayName": "Ardoise 4",
      "defaultValue": "#3c444e",
      "cssPropertyType": "borderColor"
    },
    "graphite": {
      "displayName": "Graphite",
      "defaultValue": "#8a929b",
      "cssPropertyType": "color"
    },
    "craie": {
      "displayName": "Craie",
      "defaultValue": "#ece8e0",
      "cssPropertyType": "color"
    },
    "craie-2": {
      "displayName": "Craie 2",
      "defaultValue": "#c8c3b9",
      "cssPropertyType": "color"
    },
    "cuivre": {
      "displayName": "Cuivre",
      "defaultValue": "#c98048",
      "cssPropertyType": "background"
    },
    "cuivre-clair": {
      "displayName": "Cuivre Clair",
      "defaultValue": "#e3a676",
      "cssPropertyType": "color"
    },
    "mica": {
      "displayName": "Mica",
      "defaultValue": "#a7b8c7",
      "cssPropertyType": "color"
    },
    "teinte": {
      "displayName": "Teinte",
      "defaultValue": "#171b20",
      "cssPropertyType": "color"
    },
    "f-display": {
      "displayName": "F Display",
      "defaultValue": "\"Cormorant Garamond\",\"Cormorant\",Georgia,serif",
      "cssPropertyType": "fontFamily"
    },
    "f-texte": {
      "displayName": "F Texte",
      "defaultValue": "\"Inter Tight\",\"Helvetica Neue\",Arial,sans-serif",
      "cssPropertyType": "string"
    },
    "t-xs": {
      "displayName": "T Xs",
      "defaultValue": "0.8125rem",
      "cssPropertyType": "fontSize"
    },
    "t-s": {
      "displayName": "T S",
      "defaultValue": "0.9375rem",
      "cssPropertyType": "length"
    },
    "t-m": {
      "displayName": "T M",
      "defaultValue": "1.0625rem",
      "cssPropertyType": "fontSize"
    },
    "t-l": {
      "displayName": "T L",
      "defaultValue": "1.375rem",
      "cssPropertyType": "length"
    },
    "t-xl": {
      "displayName": "T Xl",
      "defaultValue": "1.875rem",
      "cssPropertyType": "fontSize"
    },
    "t-2xl": {
      "displayName": "T 2 Xl",
      "defaultValue": "clamp(2.25rem,4.2vw,3.5rem)",
      "cssPropertyType": "length"
    },
    "t-3xl": {
      "displayName": "T 3 Xl",
      "defaultValue": "clamp(3rem,7vw,6rem)",
      "cssPropertyType": "fontSize"
    },
    "t-geant": {
      "displayName": "T Geant",
      "defaultValue": "clamp(4.2rem,15vw,15rem)",
      "cssPropertyType": "length"
    },
    "marge": {
      "displayName": "Marge",
      "defaultValue": "clamp(16px,4.5vw,72px)",
      "cssPropertyType": "length"
    },
    "col": {
      "displayName": "Col",
      "defaultValue": "min(1440px,100% - 2*var(--marge))",
      "cssPropertyType": "string"
    },
    "rayon": {
      "displayName": "Rayon",
      "defaultValue": "2px",
      "cssPropertyType": "borderRadius"
    },
    "ease": {
      "displayName": "Ease",
      "defaultValue": "cubic-bezier(.2,.7,.1,1)",
      "cssPropertyType": "string"
    },
    "logo-h": {
      "displayName": "Logo H",
      "defaultValue": "84px",
      "cssPropertyType": "length"
    },
    "logo-h-compact": {
      "displayName": "Logo H Compact",
      "defaultValue": "64px",
      "cssPropertyType": "height"
    },
    "header-h": {
      "displayName": "Header H",
      "defaultValue": "104px",
      "cssPropertyType": "length"
    },
    "header-h-compact": {
      "displayName": "Header H Compact",
      "defaultValue": "80px",
      "cssPropertyType": "length"
    }
  },
  "states": {
    "is-open": {
      "displayName": "Is Open",
      "props": {
        "isOpen": true
      }
    }
  }
} as EditorElement;
