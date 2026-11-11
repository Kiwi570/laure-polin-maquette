import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-disponibles.generated';
import { defaultProps } from './lp-disponibles.props';
import { libelles } from './lp-disponibles.libelles';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: '6a07e8dd-b702-4ef0-8d10-c44166bba110',
  type: 'companionApp.LpDisponibles',
  displayName: 'lp-disponibles',
  description: 'Œuvres disponibles du moment en défilement horizontal, avec cartels, prix et ajout au panier.',
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
