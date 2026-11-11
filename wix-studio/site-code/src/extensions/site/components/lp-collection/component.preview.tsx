// This file is the Editor preview entry point for your component.
// Override or extend it when you need Editor-specific behavior or rendering
// (e.g. mock data, Editor-only interactions, or a different visual state).

import React from 'react';
import type { ComponentProps, FC } from 'react';
import {
  useIsEditMode,
  withDefaults,
  withFallbackPlaceholder,
} from '@wix/react-component-utils';
import Component from './lp-collection';
import { defaultProps } from './lp-collection.props';
import { EditionContext } from '../../../../lp-commun/react';

// En mode conception : pas d'ouverture animée, de défilement doux, d'épinglage ni de lecture automatique.
const LpCollectionPreview: FC<ComponentProps<typeof Component>> = (props) => {
  const isEditMode = useIsEditMode();
  return (
    <EditionContext.Provider value={isEditMode}>
      <Component
        {...props}
        autoPlay={isEditMode ? false : props.autoPlay}
        pauseButtonVisibility={isEditMode ? 'showAlways' : props.pauseButtonVisibility}
      />
    </EditionContext.Provider>
  );
};

const LpCollectionPreviewWithFallback = withFallbackPlaceholder(LpCollectionPreview, {
  requiredDataFields: ['oeuvres'],
  rootClassName: 'lp-collection',
});

export default withDefaults(
  LpCollectionPreviewWithFallback,
  defaultProps
);
