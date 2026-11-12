export type LpTestCodeProps = {
  id: string;
  className?: string;
  image?: string;
  title?: string;
  description?: string;
  direction?: string;
};

export const defaultProps = {
  title: 'Title',
  description: 'Description goes here',
} as const satisfies Omit<LpTestCodeProps, 'id' | 'className'>;
