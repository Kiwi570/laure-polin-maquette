// Écrit component.tsx et <nom>.extension.ts tels que `wix generate` les a créés sur la Dev Machine
// (mêmes id et type), avec la taille d'installation adaptée : sections pleine largeur, hauteur au contenu.
// Usage : node wix-studio/outils/echafaudage.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ici = dirname(fileURLToPath(import.meta.url));
const dossier = join(ici, '../site-code/src/extensions/site/components');

const C = [
  ['lp-entete', '72b0adc9-a65e-4f91-9f5d-8252e5ab8d8b', 'LpEntete', 'Barre d’en-tête fixe du site : logo, menu des salles, panier, menu plein écran sur mobile, ouverture animée et défilement doux.'],
  ['lp-ouverture', 'f1b01f96-33a5-4b53-930f-2ea9d19fc307', 'LpOuverture', 'Ouverture de l’accueil : fond d’ardoise éclairé, grand titre, texte, boutons et diaporama des œuvres avec cartel.'],
  ['lp-demarche', '1c14db53-508b-43ce-a1a4-0b9259718514', 'LpDemarche', 'Texte de la démarche de l’artiste avec portrait collant et mots révélés au défilement.'],
  ['lp-salles', 'e2f10342-50b0-4b36-8ccb-a729ff965a20', 'LpSalles', 'Les quatre salles de l’accueil en panneaux plein écran, avec titres animés et trois œuvres par salle.'],
  ['lp-disponibles', '6a07e8dd-b702-4ef0-8d10-c44166bba110', 'LpDisponibles', 'Œuvres disponibles du moment en défilement horizontal, avec cartels, prix et ajout au panier.'],
  ['lp-collection', 'c603fde5-3fea-409f-ba48-e7fb2ded9244', 'LpCollection', 'Deux bandeaux défilants des œuvres en collection privée.'],
  ['lp-livre', '24e6ff04-e800-4b00-b5c5-23d39e2517f7', 'LpLivre', 'Présentation du livre avec ouverture en 3D au défilement, prix et ajout au panier.'],
  ['lp-ou-voir', 'c60493cd-4a85-4b4a-b275-8885752e88fa', 'LpOuVoir', 'Carte de France, lieux où voir les œuvres et expositions passées.'],
  ['lp-contact', 'e9f1cc10-3b07-4b1a-90e3-eac3e6c8ab1e', 'LpContact', 'Coordonnées de l’atelier, plan de Bagnolet, réseaux sociaux et formulaire de demande.'],
  ['lp-pied', '73dacb00-7bac-487b-8da4-32f2f98723e1', 'LpPied', 'Pied de page avec le grand nom dessiné, coordonnées, liens et note.'],
];

for (const [nom, id, Pascal, description] of C) {
  const d = join(dossier, nom);
  mkdirSync(d, { recursive: true });
  writeFileSync(join(d, 'component.tsx'), `// This file wires your component with its default props and exports it for use by the extension.
// Please do not modify the structure or logic of this file

import { withDefaults } from '@wix/react-component-utils';
import Component from './${nom}';
import { defaultProps } from './${nom}.props';

const ${Pascal} = withDefaults(
  Component,
  defaultProps
);

export default ${Pascal};
`);
  writeFileSync(join(d, `${nom}.extension.ts`), `import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './${nom}.generated';
import { defaultProps } from './${nom}.props';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: '${id}',
  type: 'companionApp.${Pascal}',
  displayName: '${nom}',
  description: '${description}',
  editorElement: deepmerge(
    editorElementWithDefaults,
    {
      layout: {
        resizeDirection: LAYOUT.RESIZE_DIRECTION.horizontal,
        contentResizeDirection: LAYOUT.CONTENT_RESIZE_DIRECTION.vertical,
      },
    }
  ),
  installation: {
    initialSize: {
      width: {
        sizingType: LAYOUT.SIZING_TYPE.stretched,
      },
      height: {
        sizingType: LAYOUT.SIZING_TYPE.content,
      },
    },
  },
  resources: {
    client: {
      componentUrl,
    },
    editor: {
      componentUrl: componentPreviewUrl,
    },
  },
});
`);
}
const imports = C.map(([nom, , Pascal]) => `import ${Pascal[0].toLowerCase() + Pascal.slice(1)} from './extensions/site/components/${nom}/${nom}.extension.ts';`).join('\n\n');
const use = C.map(([, , Pascal]) => `.use(${Pascal[0].toLowerCase() + Pascal.slice(1)})`).join('');
writeFileSync(join(ici, '../site-code/src/extensions.ts'), `import { app } from '@wix/custom-extensions';\n\n${imports}\n\nexport default app()${use};\n`);
console.log('ok');
