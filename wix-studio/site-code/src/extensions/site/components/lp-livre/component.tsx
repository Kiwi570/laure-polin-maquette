// This file wires your component with its default props and exports it for use by the extension.
// Please do not modify the structure or logic of this file

import { withDefaults } from '@wix/react-component-utils';
import Component from './lp-livre';
import { defaultProps } from './lp-livre.props';

const LpLivre = withDefaults(
  Component,
  defaultProps
);

export default LpLivre;
