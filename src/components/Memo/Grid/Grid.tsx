import React from 'react';
import styles from './Grid.module.scss';

type GridProps = { children: React.ReactNode };

const Grid = ({ children }: GridProps) => (
  <section className={styles.grid}>{children}</section>
);
export default Grid;
