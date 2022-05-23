import { useState } from 'react';
import Hearts from '../Hearts/Hearts';
import ThemeToggler from '../../General/ThemeToggler/ThemeToggler';
import styles from './Navbar.module.scss';
import Points from '../Points/Points';

const Navbar = () => {
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <nav className={styles.navbar}>
      <Points setIsGameOver={setIsGameOver} />
      <Hearts isGameOver={isGameOver} setIsGameOver={setIsGameOver} />
      <ThemeToggler
        className={styles['navbar__theme-toggler']}
        variant='inverse'
      />
    </nav>
  );
};

export default Navbar;
