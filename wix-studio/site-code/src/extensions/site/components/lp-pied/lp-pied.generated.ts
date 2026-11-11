/**
 * THIS FILE IS AUTO-GENERATED — DO NOT EDIT.
 * It contains the `editorElement` portion of the manifest, automatically derived from your component's
 * source code, prop types, and CSS rules.
 * Update your source code and run `npx wix build && npx wix generate manifest` to regenerate it.
 * If you need to override specific manifest values (sizing, layout, etc.),
 * you can do so in lp-pied.extension.ts.
 */

import type { EditorElement } from '@wix/react-component-schema';

export const editorElement = {
  "selector": ".lp-pied",
  "displayName": "Lp Pied",
  "data": {
    "direction": {
      "displayName": "Direction",
      "dataType": "direction"
    },
    "nomAccessible": {
      "displayName": "Nom Accessible",
      "dataType": "text",
      "text": {}
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
    "coordLigne1": {
      "displayName": "Coord Ligne 1",
      "dataType": "text",
      "text": {}
    },
    "coordLigne2": {
      "displayName": "Coord Ligne 2",
      "dataType": "text",
      "text": {}
    },
    "telephone": {
      "displayName": "Telephone",
      "dataType": "text",
      "text": {}
    },
    "telephoneLien": {
      "displayName": "Telephone Lien",
      "dataType": "webUrl"
    },
    "email": {
      "displayName": "Email",
      "dataType": "text",
      "text": {}
    },
    "instagramTexte": {
      "displayName": "Instagram Texte",
      "dataType": "text",
      "text": {}
    },
    "instagramLien": {
      "displayName": "Instagram Lien",
      "dataType": "webUrl"
    },
    "facebookTexte": {
      "displayName": "Facebook Texte",
      "dataType": "text",
      "text": {}
    },
    "facebookLien": {
      "displayName": "Facebook Lien",
      "dataType": "webUrl"
    },
    "liens": {
      "displayName": "Liens",
      "dataType": "arrayItems",
      "arrayItems": {
        "data": {
          "items": {
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
            "categorie": {
              "displayName": "Categorie",
              "dataType": "text",
              "text": {}
            },
            "lien": {
              "displayName": "Lien",
              "dataType": "webUrl"
            }
          }
        }
      }
    },
    "note": {
      "displayName": "Note",
      "dataType": "text",
      "text": {}
    },
    "noteEn": {
      "displayName": "Note En",
      "dataType": "text",
      "text": {}
    }
  },
  "elements": {
    "lpPiedNom": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-pied-nom",
        "displayName": "Nom",
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
    "lpPiedLogo": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-pied-logo",
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
            "className": "lp-pied-logo--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpPiedCoordonnees": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-pied-coordonnees",
        "displayName": "Coordonnees",
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
          },
          "font": {},
          "lineHeight": {
            "defaultValue": "1.7"
          },
          "letterSpacing": {},
          "textDecorationLine": {},
          "textTransform": {},
          "textAlign": {},
          "textShadow": {},
          "color": {}
        }
      }
    },
    "lpPiedLien": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-pied-lien",
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
          "borderTop": {},
          "borderBottom": {},
          "borderInlineStart": {},
          "borderInlineEnd": {},
          "paddingTop": {
            "defaultValue": "0"
          },
          "paddingBottom": {
            "defaultValue": "2px"
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
        },
        "states": {
          "hover": {
            "displayName": "Hover",
            "className": "lp-pied-lien--hover",
            "pseudoClass": "hover"
          }
        }
      }
    },
    "lpPiedNote": {
      "elementType": "inlineElement",
      "inlineElement": {
        "selector": ".lp-pied-note",
        "displayName": "Note",
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
      "cssPropertyType": "string"
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
