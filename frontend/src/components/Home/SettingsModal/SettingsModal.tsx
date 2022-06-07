import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Modal from '../../General/Modal/Modal';
import ThemeToggler from '../../General/ThemeToggler/ThemeToggler';
import styles from './SettingsModal.module.scss';

interface ISettingsModal {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SettingsModal = ({
  isModalVisible,
  setIsModalVisible,
}: ISettingsModal) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      heading={<b>Settings</b>}
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      <div className={styles['settings-modal']}>
        <ul className={styles['settings-modal__list']}>
          <li className={styles['settings-modal__list__item']}>
            <span>Theme</span>
            {/**
             * TODO:
             * Add transition to all visible elements.
             */}
            <ThemeToggler variant='inverse' />
          </li>
        </ul>
      </div>
    </Modal>
  );
};

export default SettingsModal;
