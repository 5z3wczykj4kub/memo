import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SignInIcon } from '../../../assets/icons/login.svg';
import { ReactComponent as SignUpIcon } from '../../../assets/icons/person.svg';
import useTheme from '../../../hooks/useTheme';
import styles from './Navbar.module.scss';

interface INavbar {
  setIsSignUpModalVisible: Dispatch<SetStateAction<boolean>>;
  setIsSignInModalVisible: Dispatch<SetStateAction<boolean>>;
}

const Navbar = ({
  setIsSignUpModalVisible,
  setIsSignInModalVisible,
}: INavbar) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <nav className={styles.navbar}>
      <Link
        className={classNames({
          [styles['navbar__link']]: true,
          [styles['navbar__link--dark']]: isDarkThemeUsed,
        })}
        to='#'
        onClick={() => setIsSignInModalVisible(true)}
      >
        <SignInIcon
          className={classNames({
            [styles['navbar__link__icon']]: true,
            [styles['navbar__link__icon--dark']]: isDarkThemeUsed,
            [styles['navbar__link__icon--sign-in']]: true,
          })}
        />
        Sign in
      </Link>
      <Link
        className={classNames({
          [styles['navbar__link']]: true,
          [styles['navbar__link--dark']]: isDarkThemeUsed,
        })}
        to='#'
        onClick={() => setIsSignUpModalVisible(true)}
      >
        <SignUpIcon
          className={classNames({
            [styles['navbar__link__icon']]: true,
            [styles['navbar__link__icon--dark']]: isDarkThemeUsed,
          })}
        />
        Sign up
      </Link>
    </nav>
  );
};

export default Navbar;
