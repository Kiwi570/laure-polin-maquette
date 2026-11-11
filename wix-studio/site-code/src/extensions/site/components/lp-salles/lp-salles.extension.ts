import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-salles.generated';
import { defaultProps } from './lp-salles.props';
import { libelles } from './lp-salles.libelles';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: 'e2f10342-50b0-4b36-8ccb-a729ff965a20',
  type: 'companionApp.LpSalles',
  displayName: 'lp-salles',
  description: 'Les quatre salles de l’accueil en panneaux plein écran, avec titres animés et trois œuvres par salle.',
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
