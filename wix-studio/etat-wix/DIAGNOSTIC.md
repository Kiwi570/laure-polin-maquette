# Diagnostic du refus d'import du code (Wix Studio Two) — 12 novembre 2026

Site `ca0a24d3-3cf9-41b8-84f0-74cc11208b23` · application compagnon `34aae9b7-ecbb-4c09-9832-6a04eb42271d`
Éditeur : https://manage.wix.com/editor/ca0a24d3-3cf9-41b8-84f0-74cc11208b23 · rien n'a été publié.

## 1. Chronologie (11 → 12 novembre, heures UTC)

| Heure | Import | Résultat |
|---|---|---|
| 11/11 19:26 | `36a236d9-17e7-4d70-a68c-0a965b8a6d6c` (bloc d'exemple `lp-test-code` seul) | **SUCCEEDED** — révision `4b48c9d9-…`, override `1d876551-…` |
| 11/11 20:46 | `9d559767-6397-4280-ad6b-b6c272dbcafc` (10 blocs, sans `lp-test-code`) | refus explicite `components_to_delete must be empty` ; retour arrière propre |
| 11/11 20:52 | `8564d429-276f-4997-afa6-a21813e41eba` (10 blocs + `lp-test-code`) | prêt (révision `7806bc2e-…`, override `cfa1209c-…`, 11 composants), puis **CompleteImport HTTP 500** ×3 « IMPORT_FAILED: the imported components could not be merged into the app draft » (req. `1794430237.548847394821491`, `…245.813980751411491`, `…258.234859607711492`) ; retour arrière |
| 11/11 21:17 → 22:10 | 12 essais de bisection (dont `5003e4de-…`, `ee7e5656-…`, `f9431e8d-…`, `ab32d3f6-…`) | tous : même 500 à la fusion, ou `components_to_delete` |
| 11/11 22:11 | `241b42af-84ed-4a56-ae2c-2b0f8d0dcd35` (version complète) | resté `IMPORT_AWAITING_DOCUMENT` (machine disparue) : verrou ; site pointé sur l'override `1f967598-…` |
| 11/11 23:13, 23:23 | `--force-code` (complète 241b42af) | même 500 (req. `1794438783.9626065266021495`, `1794439383.0406387396831498`) |
| 12/11 11:59 | retour arrière de `241b42af` (orchestrateur `revert-import`, override inchangé) | `IMPORT_REVERTED` |
| 12/11 11:59 | **T1** `5a732ba6-7de3-4f09-9453-0a892c934d87` | **SUCCEEDED** — révision `59ef58d7-…`, override `63200ad3-…` |
| 12/11 12:06 | **T2** `ea9d7ab5-70c3-43fe-8b47-4d5e0b636398` | **SUCCEEDED** — révision `d1f93424-…`, override `3ae20e63-…` |
| 12/11 12:09 | **T3** `50eca834-83ae-4d7f-a7bd-ec7d625b8bdf` | **SUCCEEDED** — révision `3bc5373b-…`, override `4f6c3f70-…` |
| 12/11 12:52 | **Pilote d'édition directe** `febd61d7-26ac-46d7-a914-f03ba7edb7ea` (premier paragraphe et portrait de « La démarche ») | **SUCCEEDED** — révision `50580192-…`, override `273d62ba-…` ; 0 écart de type |
| 12/11 13:00 | **Lien panier** `0007a2c5-0d8f-4fd8-bf9f-7eddfaeec665` (en-tête : `/cart-page` → `/page-panier`) | **SUCCEEDED** — révision `af72e23c-…`, override `44a14861-…` ; 0 écart de type ; manifeste : seul le libellé du champ change ; 24 pages inchangées |

## 2. Cause prouvée

Documentation « About the Manifest », *Immutable type properties* : `dataType`, `elementType`, `cssPropertyType`
ne peuvent plus changer une fois enregistrés (« validation error and blocks deployment »).

Comparaison type par type du manifeste envoyé (`dist/_wix/app-manifest.json`) avec le brouillon de l'application
(`apps-runtime-reader`, version `latest`) : tous les envois depuis le 11/11 20:52 changeaient des types enregistrés :

- `lp-test-code` : `data.image` `text → image`, `data.direction` `text → direction` (régénération du manifeste par
  les outils actuels ; schéma versionné v1 sans référence d'image, v85 avec `Builder.Image`) ;
- `lp-pied` : `lienAccueil`, `instagramLien`, `facebookLien`, `liens[].lien` `webUrl → link`.

**T1** = code stocké de `241b42af` à l'identique, plus ces seuls types réalignés (aucune autre modification,
11 composants, identifiants inchangés) → **SUCCEEDED du premier coup**. L'erreur 500 générique masquait donc la
validation d'immuabilité. Un lot T2 a ensuite été bloqué *avant* envoi par la même vérification
(`LpOuverture … --h-cadre` `length → string`), puis corrigé.

Règle de travail : avant chaque import, comparer les types du manifeste construit à ceux du brouillon
(`wix-studio/outils/comparer-types.cjs`), et n'envoyer qu'avec zéro écart.

## 3. Les quatre états (12/11, 12:16 UTC)

1. **Code de travail** : branche `claude/loving-volta-3fu38d` (= code envoyé en T3) ; `/user-code` de la machine
   réaligné sur l'export de contrôle (pages identiques, 7 pages membres restaurées).
2. **Code stocké chez Wix** : export de contrôle **identique au lot T3** (mode conception, cartels, note vide).
3. **Composants intégrés** : brouillon de l'application mis à jour sans erreur par T1-T3 ; le site pointe sur
   l'override `4f6c3f70-…` (11 composants).
4. **Pages fonctionnelles dans l'aperçu de l'éditeur** : non vérifiable par mes outils (pas d'accès à l'éditeur
   connecté) — procédure ci-dessous.

## 4. Vérification dans le véritable éditeur (procédure courte)

1. Ouvrir l'éditeur, recharger deux fois. Dans la console de l'iframe `preview-frame` :
   `['hero','manifeste','matieres','livre'].map(i => [i, Math.round(document.getElementById(i)?.getBoundingClientRect().height)])`
   → attendu, à 1 280 px de large : environ 760-960 / 1 490 / 2 880 / 835 px, identiques d'un rechargement à l'autre.
2. Les 8 sections, l'en-tête et le pied s'affichent ; le pied suit la section Contact.
3. « Nos œuvres du moment » : sous chaque titre, la ligne « Bronze, H 21 × L 15 × P 15 cm » ; cartes de hauteurs différentes.
4. Pied : plus de « Maquette de démonstration… ».
5. Sélectionner le pied → réglages : coordonnées, téléphone, e-mail, liens sociaux (champs adresse web), note FR/EN.
   Modifier « Coordonnées, première ligne », vérifier le rendu, recharger, puis remettre le texte d'origine.
6. Réglages de l'ouverture : « Fond d'ardoise » → bouton de remplacement d'image accessible (ne pas valider).
7. Aperçu de l'éditeur : défilement, animations, menu « Les œuvres », ajout au panier (sans commander).

## 5. Restes connus

- Environnement : `@wix/members` 1.0.541 et `@wix/payments` 1.0.324 (dernières versions publiques) n'exportent pas
  `./context/*`, que les modules Wix `wixMembersArea` / `wixPayments` importent : l'aperçu de développement ne
  démarre pas avec les pages membres. Aucune page n'est retirée pour contourner ce défaut.
- Liens du pied : désormais des champs « adresse web » (type `webUrl` enregistré) et non le sélecteur de liens Wix.
- Édition directe : pilote importé sur deux éléments de « La démarche » (procédure : `VERIFICATION-EDITEUR.md`) ;
  généralisation en attente de la validation dans l'éditeur.
- Pied : « Mentions légales et CGV » n'a pas de destination (aucune page de mentions ni de conditions de vente).
- Formulaire de contact : n'envoie rien (il l'indique) ; à brancher sur Wix Forms.
- Site **publié** (révision 3, ancien prototype) : publication antérieure, pas de mon fait ; rien n'a été republié.
- Archive du code stocké : médiathèque, `archives/2d5176_e798d122b4814eb7ad39b4fad2626f6d.zip` (à supprimer en fin de travaux).

## 6. Signalement prêt pour Wix (non envoyé)

> Studio Two, `wix origami import-site` (CLI `@wix/origami-cli-commands` 2.48.0). Site `ca0a24d3-3cf9-41b8-84f0-74cc11208b23`,
> companion app `34aae9b7-ecbb-4c09-9832-6a04eb42271d`. CompleteImport (`/_api/code-project-orchestrator/v1/complete-import`)
> returned HTTP 500 « IMPORT_FAILED: the imported components could not be merged into the app draft; retry CompleteImport »
> (e.g. request IDs 1794430258.234859607711492, 1794438783.9626065266021495) for every import from 2026-11-11 20:52 UTC.
> Root cause, confirmed by a one-variable test: the imported Editor React Component manifests changed already-saved
> `dataType`s (text → image / direction; webUrl → link), which the docs say is forbidden. The same code with those types
> restored completed at once (import 5a732ba6-7de3-4f09-9453-0a892c934d87). Expected: a validation error naming the
> component and the property, not a retryable 500. Two related points: (1) the manifest generator derives
> `dataType: "direction"` from a prop *named* `direction` even when typed `string`, so a CLI regeneration silently changes
> a saved type; (2) a failed CompleteImport still writes the components into the app draft (draft `updatedDate` moves),
> and an interrupted run leaves the import `AWAITING_DOCUMENT` and the site code locked until `--force-code`/revert.
