import Memo from '../../components/Memo/Memo';

const Main = () => (
  <>
    <Memo.Game />
    <span onClick={() => document.body.classList.toggle('dark-mode')}>
      Toggle mode
    </span>
  </>
);

export default Main;
