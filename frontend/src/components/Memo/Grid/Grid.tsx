import React from 'react';
import styles from './Grid.module.scss';

interface IGrid {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Grid = ({ children, style }: IGrid) => (
  <main className={styles.grid} style={style}>
    {children}
  </main>
);
export default Grid;
