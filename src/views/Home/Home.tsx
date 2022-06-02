import { useEffect, useState } from 'react';
import HomeCard from '../../components/Home/HomeCard/HomeCard';
import GameModal from './../../components/Home/GameModal/GameModal';

const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    document.body.classList.add('home');
    return () => document.body.classList.remove('home');
  }, []);

  return (
    <>
      <HomeCard setIsModalVisible={setIsModalVisible} />
      <GameModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
};

export default Home;
