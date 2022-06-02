import { useDispatch } from 'react-redux';
import Memo from '../../components/Memo/Memo';
import Navbar from '../../components/Memo/Navbar/Navbar';
import useEffectOnce from '../../hooks/useEffectOnce';
import { start } from '../../rtk/memoSlice';

const Main = () => {
  const dispatch = useDispatch();

  useEffectOnce(() => dispatch(start()));

  return (
    <>
      <Navbar />
      <Memo.Game />
    </>
  );
};

export default Main;
