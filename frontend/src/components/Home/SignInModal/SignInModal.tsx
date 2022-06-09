import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Modal from '../../General/Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';

interface ISignInModal {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SignInModal = ({ isModalVisible, setIsModalVisible }: ISignInModal) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      heading={<b>Sign in</b>}
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      <SignInForm setIsModalVisible={setIsModalVisible} />
    </Modal>
  );
};

export default SignInModal;
