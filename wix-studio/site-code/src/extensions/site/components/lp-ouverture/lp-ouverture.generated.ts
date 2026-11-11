/**
 * THIS FILE IS AUTO-GENERATED — DO NOT EDIT.
 * It contains the `editorElement` portion of the manifest, automatically derived from your component's
 * source code, prop types, and CSS rules.
 * Update your source code and run `npx wix build && npx wix generate manifest` to regenerate it.
 * If you need to override specific manifest values (sizing, layout, etc.),
 * you can do so in lp-ouverture.extension.ts.
 */

import type { EditorElement } from '@wix/react-component-schema';

export const editorElement = {
  "selector": ".lp-ouverture",
  "displayName": "Lp Ouverture",
  "data": {
    "direction": {
      "displayName": "Direction",
      "dataType": "direction"
    },
    "titreLigne1": {
      "displayName": "Titre Ligne 1",
      "dataType": "text",
      "text": {}
    },
    "titreLigne2": {
      "displayName": "Titre Ligne 2",
      "dataType": "text",
      "text": {}
    },
    "texte": {
      "displayName": "Texte",
      "dataType": "text",
      "text": {}
    },
    "texteEn": {
      "displayName": "Texte En",
      "dataType": "text",
      "text": {}
    },
    "boutonPrincipalTexte": {
      "displayName": "Bouton Principal Texte",
      "dataType": "text",
      "text": {}
    },
    "boutonPrincipalTexteEn": {
      "displayName": "Bouton Principal Texte En",
      "dataType": "text",
      "text": {}
    },
    "boutonPrincipalLien": {
      "displayName": "Bouton Principal Lien",
      "dataType": "webUrl"
    },
    "boutonSecondaireTexte": {
      "displayName": "Bouton Secondaire Texte",
      "dataType": "text",
      "text": {}
    },
    "boutonSecondaireTexteEn": {
      "displayName": "Bouton Secondaire Texte En",
      "dataType": "text",
      "text": {}
    },
    "boutonSecondaireLien": {
      "displayName": "Bouton Secondaire Lien",
      "dataType": "webUrl"
    },
    "texteDefiler": {
      "displayName": "Texte Defiler",
      "dataType": "text",
      "text": {}
    },
    "texteDefilerEn": {
      "displayName": "Texte Defiler En",
      "dataType": "text",
      "text": {}
    },
    "lienDefiler": {
      "displayName": "Lien Defiler",
      "dataType": "webUrl"
    },
    "fondArdoise": {
      "displayName": "Fond Ardoise",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "fondArdoisePortrait": {
      "displayName": "Fond Ardoise Portrait",
      "dataType": "image",
      "image": {
        "category": "IMAGE"
      }
    },
    "categorieDiaporama": {
      "displayName": "Categorie Diaporama",
      "dataType": "text",
      "text": {}
    },
    "autoPlay": {
      "displayName": "Auto Play",
      "dataType": "booleanValue"
    },
    "pauseButtonVisibility": {
      "displayName": "Pause Button Visibility",
      "dataType": "textEnum",
      "textEnum": {
        "options": [
          {
            "value": "showAlways",
            "displayName": "Show Always"
          },
          {
            "value": "showOnHover",
            "displayName": "Show On Hover"
          }
        ]
      }
    }
  },
  "elements": {
    "lpOuvertureTitre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-titre",
        "displayName": "Titre",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {
            "defaultValue": "300 var(--t-geant)/.86 var(--f-display)"
          },
          "lineHeight": {
            "defaultValue": ".86"
          },
          "letterSpacing": {
            "defaultValue": "-.02em"
          },
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--craie)"
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
    "lpOuvertureTexte": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-texte",
        "displayName": "Texte",
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
    "lpOuvertureBoutonPrincipal": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-bouton-principal",
        "displayName": "Bouton Principal",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {
            "defaultValue": ".01em"
          },
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--ardoise-0)"
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
          "marginInlineEnd": {},
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
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-ouverture-bouton-principal--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpOuvertureBoutonSecondaire": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-bouton-secondaire",
        "displayName": "Bouton Secondaire",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {},
          "letterSpacing": {
            "defaultValue": ".01em"
          },
          "textDecorationLine": {
            "defaultValue": "none"
          },
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--c)",
            "statesDefaultValues": {
              "hover": "var(--ardoise-0)"
            }
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
          "marginInlineEnd": {},
          "background": {},
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
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-ouverture-bouton-secondaire--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpOuvertureCadre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-cadre",
        "displayName": "Cadre",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "var(--fond-cadre)"
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
          "boxShadow": {
            "defaultValue": "0 50px 70px -30px rgba(0,0,0,.75),0 0 0 1px rgba(236,232,224,.08)"
          },
          "width": {},
          "height": {
            "defaultValue": "var(--h-cadre)"
          },
          "overflow": {
            "defaultValue": "hidden"
          },
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
        },
        "cssCustomProperties": {
          "ratio": {
            "displayName": "Ratio",
            "defaultValue": ".7",
            "cssPropertyType": "number"
          },
          "fond-cadre": {
            "displayName": "Fond Cadre",
            "defaultValue": "#e6e6e4",
            "cssPropertyType": "background"
          },
          "h-cadre": {
            "displayName": "H Cadre",
            "defaultValue": "min(64svh,700px)",
            "cssPropertyType": "length"
          }
        }
      }
    },
    "lpOuvertureCartel": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-cartel",
        "displayName": "Cartel",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "font": {},
          "lineHeight": {
            "defaultValue": "1.5"
          },
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {
            "defaultValue": "var(--craie-2)"
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
    "lpOuverturePause": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-pause",
        "displayName": "Pause",
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
            "defaultValue": "50%"
          },
          "borderStartEndRadius": {
            "defaultValue": "50%"
          },
          "borderEndStartRadius": {
            "defaultValue": "50%"
          },
          "borderEndEndRadius": {
            "defaultValue": "50%"
          },
          "boxShadow": {},
          "width": {
            "defaultValue": "30px"
          },
          "height": {
            "defaultValue": "30px"
          },
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
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
          "marginInlineEnd": {
            "defaultValue": "4px"
          }
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-ouverture-pause--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpOuverturePoint": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-point",
        "displayName": "Point",
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
            "defaultValue": "24px"
          },
          "height": {
            "defaultValue": "28px"
          },
          "overflow": {},
          "mixBlendMode": {
            "defaultValue": "normal"
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
          "marginInlineEnd": {}
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-ouverture-point--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpOuvertureDefiler": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-ouverture-defiler",
        "displayName": "Defiler",
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
            "defaultValue": "var(--craie-2)",
            "statesDefaultValues": {
              "hover": "var(--craie)"
            }
          },
          "display": {
            "display": {
              "displayValues": [
                "none",
                "none"
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
            "className": "lp-ouverture-defiler--hover",
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
      "cssPropertyType": "background"
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
      "cssPropertyType": "background"
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
      "cssPropertyType": "fontSize"
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
      "cssPropertyType": "fontSize"
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
      "cssPropertyType": "padding"
    },
    "header-h-compact": {
      "displayName": "Header H Compact",
      "defaultValue": "80px",
      "cssPropertyType": "length"
    },
    "c": {
      "displayName": "C",
      "defaultValue": "var(--craie)",
      "cssPropertyType": "string"
    }
  }
} as EditorElement;
