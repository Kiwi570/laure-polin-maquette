// This file wires your component with its default props and exports it for use by the extension.
// Please do not modify the structure or logic of this file

import { withDefaults } from '@wix/react-component-utils';
import Component from './lp-disponibles';
import { defaultProps } from './lp-disponibles.props';

const LpDisponibles = withDefaults(
  Component,
  defaultProps
);

export default LpDisponibles;
