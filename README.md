# Laure Polin — maquette v2

Site statique (HTML, CSS, JavaScript), sans étape de construction, prêt pour Vercel.

## Pages

- `index.html` : accueil (diaporama d'œuvres, démarche, les quatre salles Bronze, Ardoise, Pneu et Petits formats, œuvres disponibles, collection privée, livre, où voir les œuvres et expositions passées, contact)
- `salle.html?s=ardoise` : salle d'exposition (aussi `bronze`, `pneu`, `petits-formats`, `collection`)
- `oeuvre.html?o=harmonie` : fiche d'œuvre (toutes les œuvres ont leur fiche, par leur identifiant)
- `mentions.html` : mentions légales et CGV, à compléter

## Langues

Français et anglais. Le sélecteur FR / EN est dans l'en-tête (et dans le menu sur téléphone).
Ordre de choix : `?lang=fr` ou `?lang=en` dans l'adresse, puis le dernier choix du visiteur, puis la langue de son navigateur.

- Textes fixes des pages : attribut `data-en` (contenu anglais) et `data-en-aria-label`, `data-en-alt`, `data-en-content` sur la même balise que le texte français.
- Textes produits en JavaScript : `LP.tr('texte français', 'English text')`.
- Fiches des œuvres : `description_en`, `technique_en` et `dimensions.note_en` dans `data/oeuvres.js`. Les titres des œuvres restent en français.

## Données

`data/oeuvres.js` : 117 fiches relevées sur sculptures-fr.com (titres, prix, disponibilité, technique, dimensions, photos), avec leur traduction anglaise.

## Images

- `assets/img/oeuvres/` : photos du site actuel en WebP. Les œuvres sont toujours montrées sur leurs vraies photos, jamais détourées. Les versions `-detoure-` ne servent plus qu'à la vue « Voir à l'échelle ».
- Loupe : elle agrandit la photo jusqu'à sa résolution réelle (1 600 px au plus aujourd'hui). Avec les photos originales en plus grand (2 400 à 3 200 px), elle sera encore plus nette : il suffit d'ajouter une taille dans `tailles` pour chaque photo.
- `assets/img/ambiance/` : visuels provisoires générés en code, à remplacer par les images Grok du même nom, converties en WebP.

## Logo

Logo officiel fourni par Laure Polin (`logo-2.png`), fond texturé retiré sans toucher au dessin, aux couleurs ni aux proportions :
`assets/img/logo/laure-polin-logo-<hauteur>.webp` (120, 180, 240 et 360 px de haut, PNG de secours à côté).
Il signe l'en-tête (84 px de haut sur ordinateur, 72 px sur téléphone, un peu moins une fois la page défilée), le menu, l'ouverture et le pied de page.
Les icônes du site (`favicon-32.png`, `apple-touch-icon.png`) reprennent le monogramme sur fond d'ardoise.
Un fichier vectoriel (SVG ou PDF) du logo permettrait une netteté parfaite à toutes les tailles.

## Vidéos

`data/medias.js` déclare les vidéos des œuvres ; la fiche les présente avec les photos de la même sculpture
(vignette « Vidéo », lecture uniquement à l'action du visiteur, pause quand on change de vue).
Tant que le fichier n'est pas déposé, la fiche affiche « Vidéo de l'œuvre à venir ».
Fiche de démonstration : `oeuvre.html?o=premices-d-ouragan`, fichier attendu `assets/video/premices-d-ouragan/premices-d-ouragan-01.mp4`.
La liste complète des photos et vidéos à obtenir est dans `MEDIAS-A-OBTENIR.md`.

## Bibliothèques

GSAP 3.15 (ScrollTrigger, CustomEase), Lenis 1.3.27, OGL 1.0.11, polices Cormorant Garamond et Inter Tight (licence OFL), toutes hébergées dans `assets/`.

## À compléter

Photos et vidéos manquantes (`MEDIAS-A-OBTENIR.md`), prochaines expositions (tableau `EXPOSITIONS` dans `assets/js/accueil.js`, classées automatiquement selon leurs dates), moyens de paiement, livraison, mentions légales et CGV.
L'année des œuvres n'est volontairement plus affichée ; les visites de l'atelier se font sur rendez-vous.

## Modifications de la v2 (premières remarques de la cliente)

- L'Ardoisier retiré de l'accueil et du menu (l'œuvre reste dans la salle Ardoise).
- Son d'atelier, bouton « Mode calme » et curseur rond retirés. Les animations suivent toujours le réglage « réduire les animations » de l'appareil.
- Photos non détourées partout (accueil, salles, fiches, menu, panier).
- Photo de l'accueil dynamique : sept œuvres se succèdent toutes les 6 secondes (pause au survol, bouton pause, points pour choisir).
- Fiche d'œuvre : photos affichées en entier (plus de recadrage), loupe nette.
- « Voir à l'échelle » : vue « Dans un salon » retirée (restent console, sol, mur).
- « Défiler » sous l'accueil : devenu un lien qui descend à la section suivante.
- « Contact » ajouté au menu.
- Version anglaise complète.

## Modifications de la v3 (retours de la cliente, novembre 2026)

- Logo officiel dans l'en-tête, le menu, l'ouverture et le pied de page ; nom « Laure Polin » entier à toutes les largeurs.
- Accueil : diaporama à environ 4 s par œuvre (au lieu de 6 s plus 1,3 s de transition), balayage au doigt et flèches du clavier ;
  ouverture : le logo reste lisible environ 1,6 s (au lieu d'un nom visible moins d'une demi-seconde).
- « Petits formats » devient la quatrième salle du parcours, après Pneu et avant « Disponibles » ; plus de section séparée ;
  présente dans tous les menus, les autres salles et la fin des œuvres disponibles. Nouveau texte : « Découvrez ici une sélection de sculptures à petit prix. »
- Année de création retirée des fiches ; plus aucun nombre d'œuvres pour la collection privée.
- 17 photos et 5 détourages couchés à 90° remis droits (socle en bas), dimensions mises à jour dans `data/oeuvres.js`.
- Fiche : vue agrandie réelle (pincer, toucher deux fois, glisser, photo suivante, fermer d'un balayage vers le bas), support des vidéos.
- Où voir les œuvres : l'atelier sur rendez-vous et les lieux permanents d'abord, lien d'itinéraire Google Maps vers l'atelier,
  état sobre sans exposition annoncée, rubrique « Expositions passées » ; le tracé décoratif vers Les Sables-d'Olonne est retiré.
- Visites : « Visites de l'atelier sur rendez-vous. Pour convenir d'une visite : 06 77 80 59 60. » (lien `tel:+33677805960`).
- Téléphone : menu aligné, fil d'Ariane aligné sur ses séparateurs, entrée des salles compacte, titres à taille adaptée,
  fin des œuvres disponibles atteignable (point d'arrêt du défilement horizontal).
