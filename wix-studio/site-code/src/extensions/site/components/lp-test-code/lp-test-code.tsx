import React from 'react';
import type { FC } from 'react';
import clsx from 'clsx';
import styles from './lp-test-code.module.css';
import type { LpTestCodeProps } from './lp-test-code.props';

const LpTestCode: FC<LpTestCodeProps> = ({
  id,
  className,
  image,
  title,
  description,
  direction,
}) => {
  return (
    <div
      id={id}
      dir={direction}
      className={clsx('lp-test-code', styles.lpTestCode, styles.fallbackDirection, className)}
    >
      {image ? (
        <img className={clsx('image', styles.image)} src={image} alt="" />
      ) : (
        <div className={clsx('image', styles.imagePlaceholder)} aria-hidden="true" />
      )}
      <div className={styles.body}>
        <h2 className={clsx('title', styles.title)}>{title}</h2>
        <p className={clsx('description', styles.description)}>{description}</p>
      </div>
    </div>
  );
};

export default LpTestCode;
