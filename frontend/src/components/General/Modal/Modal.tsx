import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import { Transition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import BackdropWithPortal, { Backdrop } from '../Backdrop/Backdrop';
import Divider from '../Divider/Divider';
import styles from './Modal.module.scss';

const transitionStyles = {
  entered: { transform: 'translate(-50%, -50%)', opacity: 1 },
  exited: {
    transform: 'translate(-50%, 0)',
    opacity: 0,
  },
};

/**
 * Returns JSX needed to render the modal component.
 * By using `isWithPortal` flag, the markup returned is adjusted in a way
 * that allows the render of the modal component inside the app and storybook.
 */
const getModalJSX = ({
  style,
  className,
  children,
  isVisible,
  setIsVisible,
  heading,
  variant,
  isWithPortal,
}: IModal & { className: string[]; isWithPortal?: boolean }) => {
  const jsx = (
    <>
      {isWithPortal ? (
        <BackdropWithPortal
          isVisible={isVisible}
          opacity={0.75}
          variant={variant}
          onClick={() => setIsVisible(false)}
        />
      ) : (
        <Backdrop
          isVisible={isVisible}
          opacity={0.75}
          variant={variant}
          onClick={() => setIsVisible(false)}
        />
      )}
      <Transition
        in={isVisible}
        timeout={150}
        appear
        mountOnEnter
        unmountOnExit
      >
        {(state) => (
          <div
            className={className[0]}
            // @ts-ignore
            style={{ ...transitionStyles[state], ...style }}
          >
            <header className={className[1]}>
              <h2 className={className[2]}>{heading}</h2>
              <button
                className={className[3]}
                onClick={() => setIsVisible(false)}
              >
                <CloseIcon className={className[4]} />
              </button>
            </header>
            <Divider variant={variant} />
            <main className={className[5]}>{children}</main>
          </div>
        )}
      </Transition>
    </>
  );

  return isWithPortal
    ? createPortal(jsx, document.getElementById('modal')!)
    : jsx;
};

const getClassName = (variant: IModal['variant']) => [
  classNames({
    [styles.modal]: true,
    [styles['modal--dark']]: variant === 'dark',
  }),
  classNames({
    [styles['modal__header']]: true,
  }),
  classNames({
    [styles['modal__header__heading']]: true,
  }),
  classNames({
    [styles['modal__header__icon-button']]: true,
  }),
  classNames({
    [styles['modal__header__icon-button__icon']]: true,
    [styles['modal__header__icon-button__icon--dark']]: variant === 'dark',
  }),
  classNames({
    [styles['modal__body']]: true,
  }),
];

interface IModal {
  style?: React.CSSProperties;
  children: ReactNode;
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  heading?: ReactNode;
  variant?: 'light' | 'dark';
}

const useModal = (isVisible = false) => useState(isVisible);

const Modal = ({
  style,
  children,
  isVisible,
  setIsVisible,
  heading,
  variant = 'light',
}: IModal) =>
  getModalJSX({
    style,
    className: getClassName(variant),
    children,
    isVisible,
    setIsVisible,
    heading,
    variant,
  });

const ModalWithPortal = ({
  style,
  children,
  isVisible,
  setIsVisible,
  heading,
  variant = 'light',
}: IModal) =>
  getModalJSX({
    style,
    className: getClassName(variant),
    children,
    isVisible,
    setIsVisible,
    heading,
    variant,
    isWithPortal: true,
  });

export { Modal, useModal };

export default ModalWithPortal;
