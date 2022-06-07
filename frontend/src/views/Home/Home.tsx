import { useEffect } from 'react';
import { useModal } from '../../components/General/Modal/Modal';
import HomeCard from '../../components/Home/HomeCard/HomeCard';
import Navbar from '../../components/Home/Navbar/Navbar';
import SettingsModal from '../../components/Home/SettingsModal/SettingsModal';
import GameModal from './../../components/Home/GameModal/GameModal';

const Home = () => {
  const [isGameModalVisible, setIsGameModalVisible] = useModal();
  const [isSettingslVisible, setIsSettingslVisible] = useModal();

  useEffect(() => {
    document.body.classList.add('home');
    return () => document.body.classList.remove('home');
  }, []);

  return (
    <>
      <Navbar />
      <HomeCard
        setIsGameModalVisible={setIsGameModalVisible}
        setIsSettingslVisible={setIsSettingslVisible}
      />
      <GameModal
        isModalVisible={isGameModalVisible}
        setIsModalVisible={setIsGameModalVisible}
      />
      <SettingsModal
        isModalVisible={isSettingslVisible}
        setIsModalVisible={setIsSettingslVisible}
      />
    </>
  );
};

export default Home;
