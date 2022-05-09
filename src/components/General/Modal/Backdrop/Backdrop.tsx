import classNames from 'classnames';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import useTheme from '../../../../hooks/useTheme';
import styles from './Backdrop.module.scss';

interface IBackdrop {
  isVisible: boolean;
  opacity?: number;
  onClick?: () => void;
}

const Backdrop = ({
  isVisible,
  opacity = 0,
  onClick = () => {},
}: IBackdrop) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <Transition in={isVisible} timeout={150} appear mountOnEnter unmountOnExit>
      {(state) => (
        <div
          className={classNames({
            [styles.backdrop]: true,
            /**
             * TODO:
             * Add variant prop.
             */
            [styles['backdrop--light']]: isDarkThemeUsed,
          })}
          style={{
            opacity:
              state === 'entered' ? opacity : state === 'exiting' ? 0 : 0,
          }}
          onClick={onClick}
        ></div>
      )}
    </Transition>
  );
};

const BackdropWithPortal = (props: IBackdrop) =>
  createPortal(<Backdrop {...props} />, document.getElementById('backdrop')!);

export { Backdrop };

export default BackdropWithPortal;
