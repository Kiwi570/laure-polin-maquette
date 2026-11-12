# Vérification dans le véritable éditeur — pilote d'édition directe et parcours boutique (12/11/2026)

Éditeur : https://manage.wix.com/editor/ca0a24d3-3cf9-41b8-84f0-74cc11208b23

État à vérifier : import du code `0007a2c5-0d8f-4fd8-bf9f-7eddfaeec665` **SUCCEEDED** (révision `af72e23c-…`,
override `44a14861-…`, 11 composants). Il contient le pilote (import `febd61d7-…`) et la correction du bouton panier.
Les 24 pages sont inchangées, aucune n'a été supprimée. Rien n'a été publié.

Interdits pendant ces essais : publier, importer ou supprimer un média, toucher aux 57 œuvres (titres, textes, images,
prix, stocks, catégories), saisir des coordonnées ou des données bancaires, valider une commande.

## A. Pilote d'édition directe (section « La démarche » de l'accueil)

Deux éléments seulement sont éditables directement :

| Élément | Nom dans l'éditeur | Réglages |
|---|---|---|
| Premier paragraphe (« D’une multitude de mystères… ») | **Premier paragraphe** | « Texte », « Texte (anglais) » |
| Photo de Laure Polin, à gauche du texte | **Portrait de l’artiste** | « Photo » (médiathèque), « Description de la photo (anglais) » |

Valeurs d'origine (à remettre à l'identique) :

- Texte : `D’une multitude de mystères, au milieu de la poussière de l’atelier, je tente sans cesse de révéler LA forme. Celle que je portais à mon insu ? Celle qui était enfouie dans la matière ? Peu importe, ce sera celle qui émergera de toutes mes sensations de l’instant présent.`
- Texte (anglais) : `From a multitude of mysteries, amid the dust of the studio, I keep trying to reveal THE form. The one I was carrying without knowing it? The one buried in the material? It doesn’t matter: it will be the one that emerges from everything I feel in the present moment.`
- Photo : `lp-portrait.webp` (`2d5176_3d6a4f5eeb0b4d4d991b173176be4391~mv2.webp`, 1 600 × 1 066), texte alternatif
  `Laure Polin parmi ses sculptures en ardoise et en bronze, lors d’une exposition.`
- Description de la photo (anglais) : `Laure Polin among her slate and bronze sculptures at an exhibition.`

Avant de commencer, faire une capture de la section (ordinateur 1 280 px), qui servira de référence pour le cadrage.

1. **Ouverture.** Cliquer (puis double-cliquer) sur le premier paragraphe. Attendu : la sélection entoure ce
   paragraphe seul, porte le nom « Premier paragraphe » et n'ouvre que « Texte » et « Texte (anglais) ». L'élément ne
   peut pas être supprimé. Même essai sur la photo : « Portrait de l’artiste », et seulement
   « Photo » et « Description de la photo (anglais) ».
   Dans les réglages du bloc entier (clic sur le fond de la section), « Premier paragraphe », « Portrait » et
   « Portrait, description (anglais) » ne figurent plus.
2. **Texte temporaire.** Dans « Texte », remplacer le contenu par `ESSAI PILOTE — paragraphe`. Attendu : le rendu
   change aussitôt dans la page, avec la même police, la même taille et les mêmes marges que les paragraphes 2 à 4.
   Les paragraphes 2 à 4 restent intacts.
3. **Persistance.** Enregistrer (Ctrl+S), recharger l'éditeur. Attendu : `ESSAI PILOTE — paragraphe` est toujours
   affiché et toujours dans le champ.
4. **Restauration du texte.** Recoller le texte d'origine ci-dessus (copier-coller, apostrophes typographiques
   comprises), enregistrer, recharger, puis vérifier qu'il est identique au mot près.
   Facultatif : passer l'éditeur en anglais (Multilingual) et vérifier que « Texte (anglais) » s'affiche, sans le
   modifier.
5. **Image temporaire.** Dans « Photo », cliquer sur le bouton de remplacement, puis choisir dans la médiathèque une
   image **déjà présente**, par exemple `logo.webp`. Ne rien téléverser, ne rien supprimer. Attendu : la nouvelle image
   s'affiche dans le même cadre, à la même taille et avec le même rognage (`object-fit` du cadre).
6. **Persistance de l'image, puis restauration.** Enregistrer, recharger : la nouvelle image doit toujours être là.
   Remettre ensuite `lp-portrait.webp` depuis la médiathèque. Si l'éditeur propose un recadrage, ne pas recadrer et
   garder l'image entière. Enregistrer, recharger, puis comparer à la capture de référence : même photo, même cadrage,
   même hauteur de section.
   Contrôle dans la console de l'iframe `preview-frame` :
   `document.querySelector('.lp-demarche-portrait img').currentSrc` doit contenir
   `2d5176_3d6a4f5eeb0b4d4d991b173176be4391`, et `.alt` doit valoir le texte alternatif d'origine.

À relever et me renvoyer pour chaque étape : réussite ou échec, captures, et toute anomalie (sélection d'un autre
élément, champ absent, rendu non mis à jour, valeur perdue au rechargement, rognage différent).

## B. Parcours boutique dans l'aperçu de l'éditeur (Aperçu, sans publier)

Références Stores (catégorie « Nos œuvres du moment », 11 œuvres, toutes en stock, quantité 1 chacune) :

- La faille bleue 900 € ;
- L'Ardoisier 1 200 € ;
- Expression 600 € ;
- La révérence 8 000 € ;
- Flamenco 1 200 € ;
- Désir n° 2 900 € ;
- Le cerceau 4 200 € ;
- Entre deux silences 900 € ;
- Introspection 500 € ;
- Prémices d'ouragan 900 € ;
- Le troisième œil 700 €.

1. **Carte vers fiche.** Dans l'accueil, section « Nos œuvres du moment », cliquer sur la carte « La faille bleue ».
   Attendu : la page `/product-page/la-faille-bleue` s'ouvre, avec ce titre, cette photo principale, le prix 900 € et
   l'œuvre disponible.
2. **Catégories et navigation.** Menu « Les œuvres » de l'en-tête : chaque salle ouvre sa catégorie, aux adresses
   suivantes, qui répondent 200 sur le site en français comme en anglais (`/en/…`) :
   - Bronze : `/category/bronze` ;
   - Ardoise : `/category/ardoise` ;
   - Pneu recyclé : `/category/pneu-recycle` ;
   - Petits formats : `/category/petits-formats`.

   En-tête : « Le livre », « Expositions » et « Contact » mènent aux ancres de l'accueil (`/#livre`, `/#ou-voir`,
   `/#contact`). Pied : « Ardoise », « Bronze », « Pneu recyclé » et « Petits formats » ouvrent les mêmes catégories ;
   « Collection privée » et « Contact » ouvrent les ancres de l'accueil. « Mentions légales et CGV » n'a pas encore de
   destination, faute de page : c'est un reste connu.
3. **Ajout au panier.** Sur la fiche, quantité 1, cliquer sur « Ajouter au panier ». Attendu : le panier contient
   « La faille bleue » × 1.
4. **Panier.** Cliquer sur le bouton panier de l'en-tête. Attendu : la page **`/page-panier`** s'ouvre (avant cette
   correction, `/cart-page`, qui répondait 404). Montants attendus (relevés par l'API) :
   - sous-total 900 € ;
   - livraison « Free shipping » 0 € (réglage existant de la boutique) ;
   - taxes 0 € ;
   - total 900 €.
5. **Quantité.** Passer la quantité à 2. Attendu : la boutique refuse ou plafonne à 1, car il n'y a qu'un exemplaire
   en stock (l'API répond `INSUFFICIENT_INVENTORY`, disponible 1). Ne modifier aucun stock.
6. **Accès au paiement.** Cliquer sur « Paiement » (ou « Commander »). Attendu : la page `/paiement` s'ouvre et
   affiche 900 €. **S'arrêter là** : ne rien saisir dans les champs de coordonnées ou de paiement, ne rien valider.
7. **Retrait.** Revenir au panier et retirer « La faille bleue ». Attendu : le panier est vide et le compteur de
   l'en-tête revient à 0.

## C. Régressions à confirmer

1. **Hauteurs stables.** Recharger l'éditeur deux fois. Dans la console de l'iframe `preview-frame` :
   `['hero','manifeste','matieres','livre'].map(i => [i, Math.round(document.getElementById(i)?.getBoundingClientRect().height)])`
   Attendu : les mêmes valeurs d'un rechargement à l'autre, et aucune valeur démesurée.
2. **Formats.** Vérifier l'affichage ordinateur et mobile dans l'éditeur, puis dans l'aperçu.
3. **Animations visiteurs (aperçu).** Vérifier :
   - l'ouverture ;
   - l'apparition des mots dans « La démarche », y compris le premier paragraphe ;
   - le défilement doux ;
   - le parallaxe du portrait.
4. **Cartels.** « Nos œuvres du moment » : sous chaque titre, la ligne matière et dimensions.
5. **Accès direct.** Charger directement, puis recharger :
   - l'accueil ;
   - une fiche produit ;
   - une catégorie ;
   - `/page-panier` ;
   - `/paiement`.
6. **Pages.** Le gestionnaire de pages contient toujours :
   - les pages membres ;
   - le panier ;
   - le paiement ;
   - la page de remerciement ;
   - la fiche produit ;
   - la catégorie.
7. **Contenus temporaires.** Le texte et l'image du pilote sont revenus à leurs valeurs d'origine.

Reste connu, à ne pas compter comme une régression : le formulaire de contact n'envoie rien (il l'indique). Il est à
brancher sur Wix Forms.
