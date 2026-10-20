# Laure Polin — maquette v1

Site statique (HTML, CSS, JavaScript), sans étape de construction, prêt pour Vercel.

## Pages

- `index.html` : accueil (ouverture, démarche, trois matières, œuvres disponibles, L'Ardoisier, petits formats, collection privée, livre, expositions, atelier et contact)
- `salle.html?s=ardoise` : salle d'exposition (aussi `bronze`, `pneu`, `petits-formats`, `collection`)
- `oeuvre.html?o=l-ardoisier` : fiche d'œuvre (toutes les œuvres ont leur fiche, par leur identifiant)
- `mentions.html` : mentions légales et CGV, à compléter

## Données

`data/oeuvres.js` : 117 fiches relevées sur sculptures-fr.com (titres, prix, disponibilité, technique, dimensions, photos). Les coquilles évidentes du site actuel ont été corrigées.

## Images

- `assets/img/oeuvres/` : photos du site actuel en WebP, et versions détourées (`-detoure-`) pour les salles.
- `assets/img/ambiance/` : visuels provisoires générés en code. Les remplacer par les images Grok du même nom, converties en WebP. Après remplacement de `g-salon-console-16x9.webp`, ajuster `SALON` dans `assets/js/oeuvre.js` (hauteur du sol et du plateau du meuble dans l'image).

## Bibliothèques

GSAP 3.15 (ScrollTrigger, CustomEase), Lenis 1.3.27, OGL 1.0.11, polices Cormorant Garamond et Inter Tight (licence OFL), toutes hébergées dans `assets/`.

## À compléter

Année des œuvres, horaires de l'atelier, prochains salons, moyens de paiement, livraison, mentions légales et CGV.
