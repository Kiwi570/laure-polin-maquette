import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-entete.generated';
import { defaultProps } from './lp-entete.props';
import { libelles } from './lp-entete.libelles';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: '72b0adc9-a65e-4f91-9f5d-8252e5ab8d8b',
  type: 'companionApp.LpEntete',
  displayName: 'lp-entete',
  description: 'Barre d’en-tête fixe du site : logo, menu des salles, panier, menu plein écran sur mobile, ouverture animée et défilement doux.',
  editorElement: deepmerge(
    editorElementWithDefaults,
    libelles,
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
