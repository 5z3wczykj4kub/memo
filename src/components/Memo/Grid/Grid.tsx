import React from 'react';
import styles from './Grid.module.scss';

interface IGridProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Grid = ({ children, style }: IGridProps) => (
  <main className={styles.grid} style={style}>
    {children}
  </main>
);
export default Grid;
