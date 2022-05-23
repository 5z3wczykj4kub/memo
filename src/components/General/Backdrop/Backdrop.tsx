import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import styles from './Backdrop.module.scss';

interface IBackdrop {
  isVisible: boolean;
  opacity?: number;
  variant?: 'light' | 'dark';
  onClick?: () => void;
}

const Backdrop = ({ isVisible, opacity = 0, variant, onClick }: IBackdrop) => (
  <Transition in={isVisible} timeout={100} appear mountOnEnter unmountOnExit>
    {(state) => (
      <div
        className={classNames({
          [styles.backdrop]: true,
          [styles['backdrop--light']]: variant === 'light',
        })}
        style={{
          opacity: state === 'entered' ? opacity : state === 'exiting' ? 0 : 0,
        }}
        onClick={onClick}
        data-testid='backdrop'
      ></div>
    )}
  </Transition>
);

const BackdropWithPortal = (props: IBackdrop) =>
  createPortal(<Backdrop {...props} />, document.getElementById('backdrop')!);

export { Backdrop };

export default BackdropWithPortal;
