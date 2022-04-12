import Memo from '../../components/Memo/Memo';

const Main = () => (
  <>
    <Memo.Game />
    <p onClick={() => document.body.classList.toggle('dark-mode')}>
      Toggle mode
    </p>
  </>
);

export default Main;
