import classNames from 'classnames';
import useAppSelector from '../../../../hooks/useAppSelector';
import useTheme from '../../../../hooks/useTheme';
import { selectPoints } from '../../../../rtk/memoSlice';
import styles from './Points.module.scss';

const Points = () => {
  const points = useAppSelector(selectPoints);

  const { isDarkThemeUsed } = useTheme();

  const className = classNames({
    [styles.points]: true,
    [styles['points--dark']]: isDarkThemeUsed,
  });

  return <span className={className}>{points}</span>;
};

export default Points;
