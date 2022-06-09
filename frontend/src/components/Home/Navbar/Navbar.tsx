import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as SignInIcon } from '../../../assets/icons/login.svg';
import { ReactComponent as SignUpIcon } from '../../../assets/icons/person.svg';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { selectCurrentUser, unsetCurrentUser } from '../../../rtk/authSlice';
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

  const currentUser = useAppSelector(selectCurrentUser);

  const dispatch = useAppDispatch();

  return (
    <nav className={styles.navbar}>
      <Link
        className={classNames({
          [styles['navbar__link']]: true,
          [styles['navbar__link--dark']]: isDarkThemeUsed,
        })}
        to='#'
        onClick={() => {
          if (currentUser.username) return;
          setIsSignUpModalVisible(true);
        }}
      >
        <SignUpIcon
          className={classNames({
            [styles['navbar__link__icon']]: true,
            [styles['navbar__link__icon--dark']]: isDarkThemeUsed,
          })}
        />
        {currentUser.username || 'Sign up'}
      </Link>
      <Link
        className={classNames({
          [styles['navbar__link']]: true,
          [styles['navbar__link--dark']]: isDarkThemeUsed,
        })}
        to='#'
        onClick={() => {
          /**
           * TODO:
           * 1. Display sign out message.
           * 2. Hide "Sign up" and "Sign in" links
           * when the verifying token request is pending.
           */
          if (currentUser.username) {
            localStorage.removeItem('token');
            dispatch(unsetCurrentUser());
            return;
          }
          setIsSignInModalVisible(true);
        }}
      >
        <SignInIcon
          className={classNames({
            [styles['navbar__link__icon']]: true,
            [styles['navbar__link__icon--dark']]: isDarkThemeUsed,
            [styles['navbar__link__icon--sign-in']]: !!!currentUser.username,
          })}
        />
        {currentUser.username ? 'Sign out' : 'Sign in'}
      </Link>
    </nav>
  );
};

export default Navbar;
