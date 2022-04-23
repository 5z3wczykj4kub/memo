import Memo from '../../components/Memo/Memo';
import ThemeToggler from '../../components/General/ThemeToggler/ThemeToggler';
import styles from './Main.module.scss';

const Main = () => (
  <>
    <Memo.Game />
    <ThemeToggler className={styles['theme-toggler']} variant='inverse' />
  </>
);

export default Main;
