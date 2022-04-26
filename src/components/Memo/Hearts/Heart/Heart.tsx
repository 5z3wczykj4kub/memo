import classNames from 'classnames';
import { ReactComponent as HeartIcon } from '../../../../assets/icons/heart.svg';
import useTheme from '../../../../hooks/useTheme';
import styles from './Heart.module.scss';

const Heart = () => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <HeartIcon
      className={classNames({
        [styles['heart-icon']]: true,
        [styles['heart-icon--dark']]: isDarkThemeUsed,
      })}
    />
  );
};

export default Heart;
