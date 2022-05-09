import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useAppSelector from '../../../hooks/useAppSelector';
import useTheme from '../../../hooks/useTheme';
import { selectHearts } from '../../../rtk/memoSlice';
import Modal, { useModal } from '../../General/Modal/Modal';
import Heart from './Heart/Heart';
import styles from './Hearts.module.scss';

const Hearts = () => {
  const hearts = useAppSelector(selectHearts);

  const [isModalVisible, setIsModalVisible] = useModal();

  const onHeartTransitionExitedHandler = () => {
    if (hearts === 1) setIsModalVisible(true);
  };

  const { isDarkThemeUsed } = useTheme();

  return (
    <>
      <div className={styles.hearts}>
        <TransitionGroup component={null}>
          {Array.from(Array(hearts)).map((_, index) => (
            <CSSTransition
              key={index}
              timeout={800}
              classNames={{ ...styles }}
              onExited={onHeartTransitionExitedHandler}
            >
              <Heart />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <Modal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        heading={<b>What a bummer 😥</b>}
        variant={isDarkThemeUsed ? 'dark' : 'light'}
      >
        <p>
          You've lost the game. Try again, maybe you'll have better luck next
          time!
        </p>
      </Modal>
    </>
  );
};

export default Hearts;
