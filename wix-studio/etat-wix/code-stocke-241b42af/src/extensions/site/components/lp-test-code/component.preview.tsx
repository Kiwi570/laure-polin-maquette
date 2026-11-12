// This file is the Editor preview entry point for your component.
// Override or extend it when you need Editor-specific behavior or rendering
// (e.g. mock data, Editor-only interactions, or a different visual state).

import React from 'react';
import type { ComponentProps, FC } from 'react';
import {
  withDefaults,
  withFallbackPlaceholder,
} from '@wix/react-component-utils';
import Component from './lp-test-code';
import { defaultProps } from './lp-test-code.props';

const LpTestCodePreview: FC<ComponentProps<typeof Component>> = (props) => {
  return <Component {...props} />;
};

const LpTestCodePreviewWithFallback = withFallbackPlaceholder(LpTestCodePreview, {
  requiredDataFields: ['title', 'description'],
  rootClassName: 'lp-test-code',
});

export default withDefaults(
  LpTestCodePreviewWithFallback,
  defaultProps
);
