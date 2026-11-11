# Accueil Laure Polin dans Wix Studio Two — composants sur mesure

Dix « Editor React Components » (code du site, `packages/site-code` de l’export Wix) qui reproduisent
l’accueil de la maquette (`index.html`, `assets/css/site.css`, `assets/js/*.js`) : même CSS, mêmes
animations GSAP / ScrollTrigger / Lenis / OGL, mêmes polices. Les œuvres en vente viennent de Wix Stores.

```
wix-studio/
  site-code/                 à copier dans packages/site-code du site (mêmes chemins)
    package.json             dépendances (gsap 3.15.0, lenis 1.3.27, ogl 1.0.11, @wix/stores, @wix/categories, @wix/ecom)
    src/extensions.ts        enregistre les 10 composants
    src/lp-commun/           socle partagé (moteur GSAP/Lenis unique, données Wix, langue, polices woff2,
                             copies de ardoise-gl.js, poussiere.js, formes.js)
    src/extensions/site/components/lp-*/   un dossier par section
  harness/                   banc d’essai Vite + React 18 (SDK Wix simulés avec data/oeuvres.js)
  outils/socle.mjs           recopie le socle CSS commun dans chaque <composant>.module.css
  outils/echafaudage.mjs     réécrit component.tsx / *.extension.ts (id et type donnés par `wix generate`)
```

## Les composants

| Composant (type) | Section de la maquette | Données Wix | Réglages principaux (libellés) |
|---|---|---|---|
| `lp-entete` (`companionApp.LpEntete`) | en-tête, menu « Les œuvres », menu plein écran ; et pour tout le site : ouverture (1ʳᵉ visite de la session), Lenis, rideau de transition, barre de progression, grain, notification et vol vers le panier | catégories des salles (nombre d’œuvres, adresse), panier Wix (pastille) | Logo, Salles (titre, catégorie, vignette, lien), libellés et adresses du livre / expositions / contact, adresse du panier, texte et image de l’ouverture, messages du panier, Ouverture animée, Défilement doux, Transitions de pages, Sélecteur de langue |
| `lp-ouverture` | hero `#hero` | catégorie « Diaporama d’accueil » | Titre (2 lignes), texte, 2 boutons, « Défiler », fonds d’ardoise (horizontal / vertical), Catégorie du diaporama, Lecture automatique, bouton pause |
| `lp-demarche` | manifeste `#manifeste` | — | Portrait, légende, 4 paragraphes, 3 gestes, signature |
| `lp-salles` | les 4 salles `#matieres` | catégories Bronze / Ardoise / Pneu recyclé / Petits formats (nombre, adresse) et « Trio accueil – … » | par salle : mot, image d’ambiance, catégorie, texte, bouton, catégorie du trio |
| `lp-disponibles` | « Nos œuvres du moment » `#disponibles` | catégorie « Nos œuvres du moment », panier | titre, texte, catégorie, mention « Vendue », bloc final (phrase + 4 boutons avec leur catégorie) |
| `lp-collection` | « Collection privée » `#collection` | — (ce ne sont pas des produits) | titre, texte, liste des 60 œuvres (titre, photo, lien facultatif), mention, lecture automatique |
| `lp-livre` | livre `#livre` | catégorie « Livre » (prix, ajout au panier) | titre, chapô, 4 crédits, couverture / revers / double page, bouton |
| `lp-ou-voir` | `#ou-voir` | — | titre, texte, étiquette de la carte, atelier, galerie, plateforme, expositions, exposition passée (+ affiche) |
| `lp-contact` | `#contact` | œuvres des catégories des salles (liste du formulaire) | coordonnées, plan, réseaux, tous les libellés du formulaire, messages d’erreur et de confirmation |
| `lp-pied` | pied de page | catégories des salles (adresses) | logo, coordonnées, réseaux, liens (texte, catégorie ou adresse), note |

Chaque texte visible a sa version anglaise « … (anglais) » (`…En`), préremplie avec l’anglais de la maquette.
Les images éditoriales (logo, ardoises, portrait, ambiances, pages du livre, affiche, vignettes du menu,
60 photos de la collection) sont dans le Gestionnaire de médias du site et sont les valeurs par défaut.

## Données Wix

- Lecture côté visiteur avec le SDK (authentification automatique dans un composant de site, identité visiteur) :
  `categories.queryCategories(…, { treeReference: { appNamespace: '@wix/stores' }, returnNonVisibleCategories: true })`
  → nom → id, `slug`, `itemCounter` ; `categories.listItemsInCategory(id, …, { useCategoryArrangement: true })`
  → ordre de la catégorie ; `productsV3.queryProducts({ filter: { _id: { $in } } }, { fields: ['INFO_SECTION', 'INFO_SECTION_PLAIN_DESCRIPTION', 'MEDIA_ITEMS_INFO', 'CURRENCY'] })`.
- Cartel : section d’information « Caractéristiques », lignes `<p><strong>Matière</strong> : …</p>`, `Dimensions` (la hauteur
  « H 70 » donne la hauteur proportionnelle des cartes), `Technique`, `Édition`.
- Stock épuisé (`inventory.availabilityStatus = OUT_OF_STOCK`) : « Vendue », pas de prix, pas d’ajout au panier.
- Panier : `currentCartV2.addLineItemsToCurrentCart` (appId Wix Stores `215238eb-…`, `options.variantId` lu par `productsV3.getProduct`),
  `currentCartV2.getCurrentCart` pour la pastille. Le bouton panier mène à la page panier Wix (`/cart-page`).
- Liens : fiche `/product-page/<slug>`, salle `/category/<slug de la catégorie>`.
- Couleur de fond des cadres et teinte de « Nos œuvres du moment » : mesurées sur la photo Wix (la maquette les avait dans ses données).

## Langues (Wix Multilingual, pages anglaises sous `/en/`)

La langue est lue dans l’adresse de la page (`useCurrentUrl`, même résultat au rendu serveur et dans le navigateur) ;
le sélecteur FR / EN de l’en-tête mène à la même page dans l’autre langue ; les liens internes reçoivent `/en`.
La Site SDK « Locale » ne donne que la langue principale du site et la documentation ne dit pas que Wix Multilingual
traduit les réglages d’un composant sur mesure : d’où les réglages anglais séparés.

## Placer les composants

1. Fond de page `#171b20`. Chaque composant dans sa propre section pleine largeur (étirée), sans marge intérieure,
   hauteur « au contenu » ; pas d’animation d’entrée ni d’effet Wix sur ces sections (ils déplacent les éléments épinglés).
2. `lp-entete` une seule fois, dans l’en-tête du site (en-tête Wix transparent, sans comportement « figé » : la barre est fixe d’elle-même) ;
   `lp-pied` dans le pied de page du site. Ils valent alors pour toutes les pages (Lenis, rideau, progression, grain).
3. Ordre de l’accueil : ouverture, démarche, salles, disponibles, collection, livre, où voir, contact.
4. Régler l’adresse du lien « Mentions légales et CGV » (pied) quand la page existera.

## Banc d’essai

```
cd wix-studio/harness && npm install && npx vite --port 5190      # http://127.0.0.1:5190/  (?edition=1 : mode conception ; /en/ : anglais)
```
Les sources de `site-code` résolvent leurs paquets par un lien à créer une fois :
`ln -s ../harness/node_modules site-code/node_modules`. Les SDK Wix sont remplacés par `harness/src/mocks/` (mêmes formes de réponse).
