import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as SignInIcon } from '../../../assets/icons/login.svg';
import { ReactComponent as SignUpIcon } from '../../../assets/icons/person.svg';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import {
  selectGetCurrentUserQueryStatus,
  selectSignUpAndSignInMutationStatus,
} from '../../../rtk/api';
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

  const isSigningUpOrSigningIn =
    useAppSelector(selectSignUpAndSignInMutationStatus) === 'pending';
  const isGettingCurrentUser =
    useAppSelector(selectGetCurrentUserQueryStatus) === 'pending';
  const isAuthenticating = isSigningUpOrSigningIn || isGettingCurrentUser;

  const dispatch = useAppDispatch();

  if (isAuthenticating) return null;

  return (
    <nav className={styles.navbar}>
      <Link
        className={classNames({
          [styles['navbar__link']]: true,
          [styles['navbar__link--dark']]: isDarkThemeUsed,
        })}
        to={currentUser.username ? '/profile' : '#'}
        onClick={() => setIsSignUpModalVisible(true)}
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
          if (currentUser.username) {
            localStorage.removeItem('token');
            dispatch(unsetCurrentUser());
            toast.info('Signed out');
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
