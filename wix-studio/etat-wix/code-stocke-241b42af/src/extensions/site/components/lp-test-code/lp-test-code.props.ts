import type { Image, Direction } from '@wix/editor-react-types';

export type LpTestCodeProps = {
  id: string;
  className?: string;
  image?: Image;
  title?: string;
  description?: string;
  direction?: Direction;
};

export const defaultProps = {
  title: 'Title',
  description: 'Description goes here',
} as const satisfies Omit<LpTestCodeProps, 'id' | 'className'>;
