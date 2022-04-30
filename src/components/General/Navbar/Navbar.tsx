import Hearts from '../../Memo/Hearts/Hearts';
import styles from './Navbar.module.scss';
import Points from './Points/Points';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Hearts />
      <Points />
    </nav>
  );
};

export default Navbar;
