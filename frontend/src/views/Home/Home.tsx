import { useEffect } from 'react';
import { useModal } from '../../components/General/Modal/Modal';
import HomeCard from '../../components/Home/HomeCard/HomeCard';
import Navbar from '../../components/Home/Navbar/Navbar';
import SettingsModal from '../../components/Home/SettingsModal/SettingsModal';
import SignUpModal from '../../components/Home/SignUpModal/SignUpModal';
import GameModal from './../../components/Home/GameModal/GameModal';

const Home = () => {
  const [isGameModalVisible, setIsGameModalVisible] = useModal();
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useModal();
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useModal();

  useEffect(() => {
    document.body.classList.add('home');
    return () => document.body.classList.remove('home');
  }, []);

  return (
    <>
      <Navbar setIsSignUpModalVisible={setIsSignUpModalVisible} />
      <HomeCard
        setIsGameModalVisible={setIsGameModalVisible}
        setIsSettingsModalVisible={setIsSettingsModalVisible}
      />
      <GameModal
        isModalVisible={isGameModalVisible}
        setIsModalVisible={setIsGameModalVisible}
      />
      <SettingsModal
        isModalVisible={isSettingsModalVisible}
        setIsModalVisible={setIsSettingsModalVisible}
      />
      <SignUpModal
        isModalVisible={isSignUpModalVisible}
        setIsModalVisible={setIsSignUpModalVisible}
      />
    </>
  );
};

export default Home;
