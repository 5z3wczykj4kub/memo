import { useDispatch } from 'react-redux';
import Memo from '../../components/Memo/Memo';
import Navbar from '../../components/Memo/Navbar/Navbar';
import useEffectOnce from '../../hooks/useEffectOnce';
import { start, shuffle } from '../../rtk/memoSlice';

const Main = () => {
  const dispatch = useDispatch();

  useEffectOnce(() => {
    dispatch(start());
    /**
     * FIXME:
     * Without `shuffle`, after coming back
     * to the game page, there is a noticeable
     * cards flipping back animation, which allows
     * the user to know the position of correct cards.
     * On the other hand, `shuffle` seems redundant, as
     * `start` already randomizes cards. This behavior is
     * acceptable, though might be improved in the future.
     */
    setTimeout(() => dispatch(shuffle()), 400);
  });

  return (
    <>
      <Navbar />
      <Memo.Game />
    </>
  );
};

export default Main;
