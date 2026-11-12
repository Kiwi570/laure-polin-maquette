import { app } from '@wix/custom-extensions';

import lpEntete from './extensions/site/components/lp-entete/lp-entete.extension.ts';

import lpOuverture from './extensions/site/components/lp-ouverture/lp-ouverture.extension.ts';

import lpDemarche from './extensions/site/components/lp-demarche/lp-demarche.extension.ts';

import lpSalles from './extensions/site/components/lp-salles/lp-salles.extension.ts';

import lpDisponibles from './extensions/site/components/lp-disponibles/lp-disponibles.extension.ts';

import lpCollection from './extensions/site/components/lp-collection/lp-collection.extension.ts';

import lpLivre from './extensions/site/components/lp-livre/lp-livre.extension.ts';

import lpOuVoir from './extensions/site/components/lp-ou-voir/lp-ou-voir.extension.ts';

import lpContact from './extensions/site/components/lp-contact/lp-contact.extension.ts';

import lpTestCode from './extensions/site/components/lp-test-code/lp-test-code.extension.ts';

import lpPied from './extensions/site/components/lp-pied/lp-pied.extension.ts';

export default app().use(lpEntete).use(lpOuverture).use(lpDemarche).use(lpSalles).use(lpDisponibles).use(lpCollection).use(lpLivre).use(lpOuVoir).use(lpContact).use(lpPied).use(lpTestCode);
