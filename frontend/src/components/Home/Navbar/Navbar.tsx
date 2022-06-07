import classNames from 'classnames';
import { Link } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link
        className={classNames({
          [styles['navbar__sign-in-link']]: true,
          [styles['navbar__sign-in-link--dark']]: isDarkThemeUsed,
        })}
        to='#'
      >
        Sign in
      </Link>
    </nav>
  );
};

export default Navbar;
