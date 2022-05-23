import classNames from 'classnames';
import styles from './Divider.module.scss';

interface IDivider {
  variant?: 'light' | 'dark';
}

const Divider = ({ variant = 'light' }: IDivider) => {
  const className = classNames({
    [styles.divider]: true,
    [styles['divider--dark']]: variant === 'dark',
  });

  return <div className={className} data-testid='divider'></div>;
};

export default Divider;
