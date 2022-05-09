import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import BackdropWithPortal, { Backdrop } from './Backdrop/Backdrop';
import styles from './Modal.module.scss';

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
  isWithPortal,
}: IModal & { className: string[]; isWithPortal?: boolean }) => {
  const jsx = (
    <>
      {isWithPortal ? (
        <BackdropWithPortal
          isVisible={isVisible}
          opacity={0.75}
          onClick={() => setIsVisible(false)}
        />
      ) : (
        <Backdrop
          isVisible={isVisible}
          opacity={0.75}
          onClick={() => setIsVisible(false)}
        />
      )}
      <CSSTransition
        in={isVisible}
        timeout={150}
        classNames={{ ...styles }}
        appear
        mountOnEnter
        unmountOnExit
      >
        <div className={className[0]} style={style}>
          <header className={className[1]}>
            <h2 className={className[2]}>{heading}</h2>
            <button
              className={className[3]}
              tabIndex={1 /* TODO: Best use of tabindex. */}
              onClick={() => setIsVisible(false)}
            >
              <CloseIcon className={className[4]} />
            </button>
          </header>
          <main className={className[5]}>{children}</main>
        </div>
      </CSSTransition>
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
  variant?: 'light' | 'dark';
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  heading?: ReactNode;
}

const useModal = (isVisible = false) => useState(isVisible);

/**
 * TODO:
 * Improve animation.
 * Add unit and integration tests.
 */
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
    isWithPortal: true,
  });

export { Modal, useModal };

export default ModalWithPortal;
