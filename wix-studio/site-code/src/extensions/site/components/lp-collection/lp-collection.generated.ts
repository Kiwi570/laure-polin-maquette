/**
 * THIS FILE IS AUTO-GENERATED — DO NOT EDIT.
 * It contains the `editorElement` portion of the manifest, automatically derived from your component's
 * source code, prop types, and CSS rules.
 * Update your source code and run `npx wix build && npx wix generate manifest` to regenerate it.
 * If you need to override specific manifest values (sizing, layout, etc.),
 * you can do so in lp-collection.extension.ts.
 */

import type { EditorElement } from '@wix/react-component-schema';

export const editorElement = {
  "selector": ".lp-collection",
  "displayName": "Lp Collection",
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
    "titreEn": {
      "displayName": "Titre En",
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
    "oeuvres": {
      "displayName": "Oeuvres",
      "dataType": "arrayItems",
      "arrayItems": {
        "data": {
          "items": {
            "titre": {
              "displayName": "Titre",
              "dataType": "text",
              "text": {}
            },
            "photo": {
              "displayName": "Photo",
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
    "legendeStatut": {
      "displayName": "Legende Statut",
      "dataType": "text",
      "text": {}
    },
    "legendeStatutEn": {
      "displayName": "Legende Statut En",
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
            "value": "showOnHover",
            "displayName": "Show On Hover"
          },
          {
            "value": "showAlways",
            "displayName": "Show Always"
          }
        ]
      }
    }
  },
  "elements": {
    "lpCollectionTitre": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-collection-titre",
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
    "lpCollectionTexte": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-collection-texte",
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
    "lpCollectionVignette": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-collection-vignette",
        "displayName": "Vignette",
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
                "block"
              ]
            }
          },
          "marginTop": {},
          "marginBottom": {},
          "marginInlineStart": {},
          "marginInlineEnd": {},
          "background": {
            "defaultValue": "var(--ardoise-2)"
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
          "width": {},
          "height": {
            "defaultValue": "clamp(200px,26vw,340px)"
          },
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
            "className": "lp-collection-vignette--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpCollectionPause": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-collection-pause",
        "displayName": "Pause",
        "behaviors": {
          "removable": true,
          "selectable": false
        },
        "cssProperties": {
          "background": {
            "defaultValue": "color-mix(in srgb,var(--ardoise-0) 60%,transparent)"
          },
          "borderTop": {
            "defaultValue": "1px solid var(--ardoise-4)"
          },
          "borderBottom": {
            "defaultValue": "1px solid var(--ardoise-4)"
          },
          "borderInlineStart": {
            "defaultValue": "1px solid var(--ardoise-4)"
          },
          "borderInlineEnd": {
            "defaultValue": "1px solid var(--ardoise-4)"
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
            "defaultValue": "38px"
          },
          "height": {
            "defaultValue": "38px"
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
            "className": "lp-collection-pause--hover",
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
      "cssPropertyType": "border"
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
