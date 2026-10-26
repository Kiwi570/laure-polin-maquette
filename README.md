# Laure Polin — maquette v2

Site statique (HTML, CSS, JavaScript), sans étape de construction, prêt pour Vercel.

## Pages

- `index.html` : accueil (diaporama d'œuvres, démarche, trois matières, œuvres disponibles, petits formats, collection privée, livre, expositions, contact)
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

Le monogramme de la v1 n'était pas le bon : l'en-tête affiche le nom « Laure Polin » en attendant le fichier du vrai logo. Le favicon provisoire reprend les initiales LP.

## Bibliothèques

GSAP 3.15 (ScrollTrigger, CustomEase), Lenis 1.3.27, OGL 1.0.11, polices Cormorant Garamond et Inter Tight (licence OFL), toutes hébergées dans `assets/`.

## À compléter

Logo, année des œuvres, horaires de l'atelier, prochains salons, moyens de paiement, livraison, mentions légales et CGV.

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
