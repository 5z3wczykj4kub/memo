import classNames from 'classnames';
import styles from '../../../views/Profile/Profile.module.scss';

interface IUsernameHeader {
  username: string | null | undefined;
  isUserProfileLoading: boolean;
  isUserProfileFetchedWithSuccess: boolean;
  isUserProfileFetchedWithError: boolean;
}

const UsernameHeader = ({
  username,
  isUserProfileLoading,
  isUserProfileFetchedWithSuccess,
  isUserProfileFetchedWithError,
}: IUsernameHeader) => (
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

export default UsernameHeader;
