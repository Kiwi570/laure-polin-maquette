import React from 'react';
import { createRoot } from 'react-dom/client';
import { EditionContext } from '../../site-code/src/lp-commun/react';
import Entete from '../../site-code/src/extensions/site/components/lp-entete/component';
import Ouverture from '../../site-code/src/extensions/site/components/lp-ouverture/component';
import Demarche from '../../site-code/src/extensions/site/components/lp-demarche/component';
import Salles from '../../site-code/src/extensions/site/components/lp-salles/component';
import Disponibles from '../../site-code/src/extensions/site/components/lp-disponibles/component';
import Collection from '../../site-code/src/extensions/site/components/lp-collection/component';
import Livre from '../../site-code/src/extensions/site/components/lp-livre/component';
import OuVoir from '../../site-code/src/extensions/site/components/lp-ou-voir/component';
import Contact from '../../site-code/src/extensions/site/components/lp-contact/component';
import Pied from '../../site-code/src/extensions/site/components/lp-pied/component';

// ?edition=1 : simule le mode conception de l'éditeur Wix
const edition = new URLSearchParams(location.search).get('edition') === '1';
type C = React.ComponentType<{ id: string }>;
const ordre: Array<[string, C]> = [
  ['entete', Entete as unknown as C], ['ouverture', Ouverture as unknown as C], ['demarche', Demarche as unknown as C],
  ['salles', Salles as unknown as C], ['disponibles', Disponibles as unknown as C], ['collection', Collection as unknown as C],
  ['livre', Livre as unknown as C], ['ouvoir', OuVoir as unknown as C], ['contact', Contact as unknown as C], ['pied', Pied as unknown as C],
];
createRoot(document.getElementById('app') as HTMLElement).render(
  <EditionContext.Provider value={edition}>
    {ordre.map(([id, Comp]) => <Comp key={id} id={`comp-${id}`} />)}
  </EditionContext.Provider>,
);
