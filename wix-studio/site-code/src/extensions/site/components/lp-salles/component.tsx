// This file wires your component with its default props and exports it for use by the extension.
// Please do not modify the structure or logic of this file

import { withDefaults } from '@wix/react-component-utils';
import Component from './lp-salles';
import { defaultProps } from './lp-salles.props';

const LpSalles = withDefaults(
  Component,
  defaultProps
);

export default LpSalles;
