import { extensions } from '@wix/custom-extensions'
import { LAYOUT } from '@wix/react-component-schema';
import { withEditorElementDefaults } from '@wix/react-component-utils';
import { deepmerge } from 'deepmerge-ts';
import { editorElement } from './lp-test-code.generated';
import { defaultProps } from './lp-test-code.props';
import componentUrl from './component.tsx?url';
import componentPreviewUrl from './component.preview.tsx?url';

const editorElementWithDefaults = withEditorElementDefaults(
  editorElement,
  defaultProps
);

export default extensions.editorReactComponent({
  id: '28ed4cd9-e686-4f78-a128-91290a177f53',
  type: 'companionApp.LpTestCode',
  displayName: "lp-test-code",
  description: "Test technique a supprimer.",
  editorElement: deepmerge(
    editorElementWithDefaults,
    {
      // Type identique à la version fusionnée le 11/11 (19:26) : les types déjà enregistrés sont immuables.
      data: { direction: { dataType: 'text' } },
      layout: {
        resizeDirection: LAYOUT.RESIZE_DIRECTION.horizontalAndVertical,
        contentResizeDirection: LAYOUT.CONTENT_RESIZE_DIRECTION.vertical,
      },
    }
  ),
  installation: {
    initialSize: {
      width: {
        sizingType: LAYOUT.SIZING_TYPE.pixels,
        pixels: 250,
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
