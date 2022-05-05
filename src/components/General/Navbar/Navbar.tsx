import Hearts from '../../Memo/Hearts/Hearts';
import ThemeToggler from '../ThemeToggler/ThemeToggler';
import styles from './Navbar.module.scss';
import Points from './Points/Points';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Points />
      <Hearts />
      <ThemeToggler
        className={styles['navbar__theme-toggler']}
        variant='inverse'
      />
    </nav>
  );
};

export default Navbar;
