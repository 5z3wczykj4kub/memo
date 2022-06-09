import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useTheme from '../../../hooks/useTheme';
import styles from './ToastContainer.module.scss';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import classNames from 'classnames';

const CustomToastContainer = () => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <ToastContainer
      className={styles['toast-container']}
      position='bottom-right'
      theme={isDarkThemeUsed ? 'dark' : 'light'}
      closeButton={
        <button className={styles['toast-container__close-button']}>
          <CloseIcon
            className={classNames({
              [styles['toast-container__close-button__icon']]: true,
              [styles['toast-container__close-button__icon--dark']]:
                isDarkThemeUsed,
            })}
          />
        </button>
      }
      hideProgressBar
    />
  );
};

export default CustomToastContainer;
