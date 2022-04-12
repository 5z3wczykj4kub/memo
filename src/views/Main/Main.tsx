import Memo from '../../components/Memo/Memo';

const Main = () => (
  <>
    <Memo.Game />
    <p onClick={() => document.body.classList.toggle('dark-mode')}>
      Toggle mode
    </p>
    <p>Block cards while flipping</p>
  </>
);

export default Main;
