import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ReactComponent as BackArrowIcon } from '../../../assets/icons/back-arrow.svg';
import useTheme from '../../../hooks/useTheme';
import styles from '../../../views/Profile/Profile.module.scss';

const BackToHomeLink = () => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Link className={styles['profile__back-to-home-link']} to='/'>
      <BackArrowIcon
        className={classNames({
          [styles['profile__back-to-home-link__back-arrow-icon']]: true,
          [styles['profile__back-to-home-link__back-arrow-icon--dark']]:
            isDarkThemeUsed,
        })}
      />{' '}
      Back to home
    </Link>
  );
};

export default BackToHomeLink;
