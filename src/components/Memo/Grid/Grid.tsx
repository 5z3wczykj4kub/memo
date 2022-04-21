import React from 'react';
import styles from './Grid.module.scss';

type GridProps = { children: React.ReactNode; style?: React.CSSProperties };

const Grid = ({ children, style }: GridProps) => (
  <section className={styles.grid} style={style}>
    {children}
  </section>
);
export default Grid;
