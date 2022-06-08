import { Dispatch, SetStateAction } from 'react';
import useTheme from '../../../hooks/useTheme';
import Modal from '../../General/Modal/Modal';
import SignUpForm from '../SignUpForm/SignUpForm';

interface ISignUpModal {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SignUpModal = ({ isModalVisible, setIsModalVisible }: ISignUpModal) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Modal
      isVisible={isModalVisible}
      setIsVisible={setIsModalVisible}
      heading={<b>Sign up</b>}
      variant={isDarkThemeUsed ? 'dark' : 'light'}
    >
      <SignUpForm />
    </Modal>
  );
};

export default SignUpModal;
