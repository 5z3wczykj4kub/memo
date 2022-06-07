import { useState } from 'react';
import Hearts from '../Hearts/Hearts';
import Points from '../Points/Points';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Points setIsGameOver={setIsGameOver} />
      <Hearts isGameOver={isGameOver} setIsGameOver={setIsGameOver} />
    </nav>
  );
};

export default Navbar;
