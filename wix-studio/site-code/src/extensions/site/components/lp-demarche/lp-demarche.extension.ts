import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-demarche.generated';
import { defaultProps } from './lp-demarche.props';
import { libelles } from './lp-demarche.libelles';
import { parties } from './lp-demarche.parties';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: '1c14db53-508b-43ce-a1a4-0b9259718514',
  type: 'companionApp.LpDemarche',
  displayName: 'lp-demarche',
  description: 'Texte de la démarche de l’artiste avec portrait collant et mots révélés au défilement.',
  editorElement: deepmerge(
    editorElementWithDefaults,
    libelles,
    parties,
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
