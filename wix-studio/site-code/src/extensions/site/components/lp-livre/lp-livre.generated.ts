/**
 * THIS FILE IS AUTO-GENERATED — DO NOT EDIT.
 * It contains the `editorElement` portion of the manifest, automatically derived from your component's
 * source code, prop types, and CSS rules.
 * Update your source code and run `npx wix build && npx wix generate manifest` to regenerate it.
 * If you need to override specific manifest values (sizing, layout, etc.),
 * you can do so in lp-livre.extension.ts.
 */

import type { EditorElement } from '@wix/react-component-schema';

export const editorElement = {
  "selector": ".lp-livre",
  "displayName": "Lp Livre",
  "data": {
    "direction": {
      "displayName": "Direction",
      "dataType": "direction"
    },
    "titre": {
      "displayName": "Titre",
      "dataType": "text",
      "text": {}
    },
    "chapo": {
      "displayName": "Chapo",
      "dataType": "text",
      "text": {}
    },
    "chapoEn": {
      "displayName": "Chapo En",
      "dataType": "text",
      "text": {}
    },
    "credit1Intitule": {
      "displayName": "Credit 1 Intitule",
      "dataType": "text",
      "text": {}
    },
    "credit1Valeur": {
      "displayName": "Credit 1 Valeur",
      "dataType": "text",
      "text": {}
    },
    "credit1ValeurEn": {
      "displayName": "Credit 1 Valeur En",
      "dataType": "text",
      "text": {}
    },
    "credit2Intitule": {
      "displayName": "Credit 2 Intitule",
      "dataType": "text",
      "text": {}
    },
    "credit2IntituleEn": {
      "displayName": "Credit 2 Intitule En",
      "dataType": "text",
      "text": {}
    },
    "credit2Valeur": {
      "displayName": "Credit 2 Valeur",
      "dataType": "text",
      "text": {}
    },
    "credit3Intitule": {
      "displayName": "Credit 3 Intitule",
      "dataType": "text",
      "text": {}
    },
    "credit3IntituleEn": {
      "displayName": "Credit 3 Intitule En",
      "dataType": "text",
      "text": {}
    },
    "credit3Valeur": {
      "displayName": "Credit 3 Valeur",
      "dataType": "text",
      "text": {}
    },
    "credit4Intitule": {
      "displayName": "Credit 4 Intitule",
      "dataType": "text",
      "text": {}
    },
    "credit4IntituleEn": {
      "displayName": "Credit 4 Intitule En",
      "dataType": "text",
      "text": {}
    },
    "credit4Valeur": {
      "displayName": "Credit 4 Valeur",
      "dataType": "text",
      "text": {}
    },
    "couverture": {
      "displayName": "Couverture",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "couvertureAltEn": {
      "displayName": "Couverture Alt En",
      "dataType": "text",
      "text": {}
    },
    "dosCouverture": {
      "displayName": "Dos Couverture",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "dosCouvertureAltEn": {
      "displayName": "Dos Couverture Alt En",
      "dataType": "text",
      "text": {}
    },
    "doublePage": {
      "displayName": "Double Page",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "doublePageAltEn": {
      "displayName": "Double Page Alt En",
      "dataType": "text",
      "text": {}
    },
    "categorie": {
      "displayName": "Categorie",
      "dataType": "text",
      "text": {}
    },
    "boutonTexte": {
      "displayName": "Bouton Texte",
      "dataType": "text",
      "text": {}
    },
    "boutonTexteEn": {
      "displayName": "Bouton Texte En",
      "dataType": "text",
      "text": {}
    }
  },
  "elements": {
    "lpLivreLivre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-livre",
        "displayName": "Livre",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
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
          "borderStartStartRadius": {},
          "borderStartEndRadius": {},
          "borderEndStartRadius": {},
          "borderEndEndRadius": {},
          "boxShadow": {},
          "width": {
            "defaultValue": "min(380px,70vw)"
          },
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
    },
    "lpLivreTitre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-titre",
        "displayName": "Titre",
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
          "color": {},
          "display": {
            "display": {
              "displayValues": [
                "none",
                "inlineBlock"
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
          }
        }
      }
    },
    "lpLivreChapo": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-chapo",
        "displayName": "Chapo",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {
            "defaultValue": "400 clamp(1.45rem,2.4vw,2.1rem)/1.3 var(--f-display)"
          },
          "lineHeight": {
            "defaultValue": "1.3"
          },
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {},
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
    "lpLivreCredits": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-credits",
        "displayName": "Credits",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
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
          "marginTop": {
            "defaultValue": "0"
          },
          "marginBottom": {
            "defaultValue": "0"
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
    "lpLivrePrix": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-prix",
        "displayName": "Prix",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {
            "defaultValue": "2.4rem var(--f-display)"
          },
          "lineHeight": {},
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {},
          "marginTop": {
            "defaultValue": "0"
          },
          "marginBottom": {
            "defaultValue": "0"
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
    "lpLivreBouton": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-livre-bouton",
        "displayName": "Bouton",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "var(--craie)"
          },
          "borderTop": {
            "defaultValue": "1px solid color-mix(in srgb,var(--c) 45%,transparent)"
          },
          "borderBottom": {
            "defaultValue": "1px solid color-mix(in srgb,var(--c) 45%,transparent)"
          },
          "borderInlineStart": {
            "defaultValue": "1px solid color-mix(in srgb,var(--c) 45%,transparent)"
          },
          "borderInlineEnd": {
            "defaultValue": "1px solid color-mix(in srgb,var(--c) 45%,transparent)"
          },
          "paddingTop": {
            "defaultValue": ".95em"
          },
          "paddingBottom": {
            "defaultValue": ".95em"
          },
          "paddingInlineStart": {
            "defaultValue": "1.5em"
          },
          "paddingInlineEnd": {
            "defaultValue": "1.5em"
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
          "overflow": {
            "defaultValue": "hidden"
          },
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
          "letterSpacing": {
            "defaultValue": ".01em"
          },
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--ardoise-0)"
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {}
        },
        "cssCustomProperties": {
          "c": {
            "displayName": "C",
            "defaultValue": "var(--craie)",
            "cssPropertyType": "string"
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-livre-bouton--hover",
            "pseudoClass": "hover"
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
    "overflow": {},
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
      "cssPropertyType": "color"
    },
    "ardoise-3": {
      "displayName": "Ardoise 3",
      "defaultValue": "#2c333b",
      "cssPropertyType": "color"
    },
    "ardoise-4": {
      "displayName": "Ardoise 4",
      "defaultValue": "#3c444e",
      "cssPropertyType": "color"
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
      "cssPropertyType": "color"
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
      "cssPropertyType": "fontFamily"
    },
    "t-xs": {
      "displayName": "T Xs",
      "defaultValue": "0.8125rem",
      "cssPropertyType": "length"
    },
    "t-s": {
      "displayName": "T S",
      "defaultValue": "0.9375rem",
      "cssPropertyType": "fontSize"
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
      "cssPropertyType": "width"
    },
    "rayon": {
      "displayName": "Rayon",
      "defaultValue": "2px",
      "cssPropertyType": "length"
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
      "cssPropertyType": "length"
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
  }
} as EditorElement;
