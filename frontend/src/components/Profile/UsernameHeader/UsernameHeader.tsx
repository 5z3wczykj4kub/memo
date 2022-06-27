import classNames from 'classnames';
import useAppSelector from '../../../hooks/useAppSelector';
import { selectCurrentUser } from '../../../rtk/authSlice';
import styles from '../../../views/Profile/Profile.module.scss';

interface IUsernameHeader {
  isUserProfileLoading: boolean;
  isUserProfileFetchedWithSuccess: boolean;
  isUserProfileFetchedWithError: boolean;
}

const UsernameHeader = ({
  isUserProfileLoading,
  isUserProfileFetchedWithSuccess,
  isUserProfileFetchedWithError,
}: IUsernameHeader) => {
  const { username } = useAppSelector(selectCurrentUser);

  return (
    <header className={styles['profile__header']}>
      {isUserProfileLoading && (
        <h1 className={styles['profile__header__username']}>
          Loading profile...
        </h1>
      )}
      {isUserProfileFetchedWithSuccess && (
        <h1 className={styles['profile__header__username']}>User {username}</h1>
      )}
      {isUserProfileFetchedWithError && (
        <h1
          className={classNames({
            [styles['profile__header__username']]: true,
            [styles['profile__header__username--error']]: true,
          })}
        >
          Something went wrong
        </h1>
      )}
    </header>
  );
};

export default UsernameHeader;
