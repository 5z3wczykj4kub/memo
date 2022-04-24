import ThemeToggler from '../../components/General/ThemeToggler/ThemeToggler';
import Memo from '../../components/Memo/Memo';
import Heart from '../../components/Memo/Hearts/Heart/Heart';
import styles from './Main.module.scss';
import Hearts from '../../components/Memo/Hearts/Hearts';

const Main = () => {
  return (
    <>
      <header>
        <Hearts />
      </header>
      <Memo.Game />
      <ThemeToggler className={styles['theme-toggler']} variant='inverse' />
    </>
  );
};

export default Main;
