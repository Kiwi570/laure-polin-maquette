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
import Component from './lp-demarche';
import { defaultProps } from './lp-demarche.props';
import { EditionContext } from '../../../../lp-commun/react';

// En mode conception : pas d'ouverture animée, de défilement doux, d'épinglage ni de lecture automatique.
const LpDemarchePreview: FC<ComponentProps<typeof Component>> = (props) => {
  const isEditMode = useIsEditMode();
  return (
    <EditionContext.Provider value={isEditMode}>
      <Component
        {...props}
      />
    </EditionContext.Provider>
  );
};

const LpDemarchePreviewWithFallback = withFallbackPlaceholder(LpDemarchePreview, {
  requiredDataFields: ['paragraphe1'],
  rootClassName: 'lp-demarche',
});

export default withDefaults(
  LpDemarchePreviewWithFallback,
  defaultProps
);
