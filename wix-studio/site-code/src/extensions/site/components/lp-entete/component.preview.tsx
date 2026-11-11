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
import Component from './lp-entete';
import { defaultProps } from './lp-entete.props';
import { EditionContext } from '../../../../lp-commun/react';

// En mode conception : pas d'ouverture animée, de défilement doux, d'épinglage ni de lecture automatique.
const LpEntetePreview: FC<ComponentProps<typeof Component>> = (props) => {
  const isEditMode = useIsEditMode();
  return (
    <EditionContext.Provider value={isEditMode}>
      <Component
        {...props}
      />
    </EditionContext.Provider>
  );
};

const LpEntetePreviewWithFallback = withFallbackPlaceholder(LpEntetePreview, {
  requiredDataFields: ['salles'],
  rootClassName: 'lp-entete',
});

export default withDefaults(
  LpEntetePreviewWithFallback,
  defaultProps
);
