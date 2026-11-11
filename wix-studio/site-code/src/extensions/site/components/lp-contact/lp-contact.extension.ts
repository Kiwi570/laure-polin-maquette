import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-contact.generated';
import { defaultProps } from './lp-contact.props';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: 'e9f1cc10-3b07-4b1a-90e3-eac3e6c8ab1e',
  type: 'companionApp.LpContact',
  displayName: 'lp-contact',
  description: 'Coordonnées de l’atelier, plan de Bagnolet, réseaux sociaux et formulaire de demande.',
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
