import Navbar from '../../components/General/Navbar/Navbar';
import ThemeToggler from '../../components/General/ThemeToggler/ThemeToggler';
import Memo from '../../components/Memo/Memo';
import styles from './Main.module.scss';

const Main = () => {
  return (
    <>
      <Navbar />
      <Memo.Game />
      <ThemeToggler className={styles['theme-toggler']} variant='inverse' />
    </>
  );
};

export default Main;
