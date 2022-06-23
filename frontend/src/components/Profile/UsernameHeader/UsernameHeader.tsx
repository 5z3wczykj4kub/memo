import useAppSelector from '../../../hooks/useAppSelector';
import { selectCurrentUser } from '../../../rtk/authSlice';
import styles from '../../../views/Profile/Profile.module.scss';

const UsernameHeader = () => {
  const { username } = useAppSelector(selectCurrentUser);

  return (
    <header className={styles['profile__header']}>
      <h1 className={styles['profile__header__username']}>User {username}</h1>
    </header>
  );
};

export default UsernameHeader;
