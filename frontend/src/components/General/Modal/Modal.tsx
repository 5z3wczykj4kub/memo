import classNames from 'classnames';
import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import Divider from '../Divider/Divider';
import BackdropWithPortal, { Backdrop } from '../Backdrop/Backdrop';
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
      <CSSTransition
        in={isVisible}
        timeout={150}
        classNames={{ ...styles }}
        appear
        mountOnEnter
        unmountOnExit
      >
        <div className={styles.modal} style={style}>
          <div className={className[0]}>
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
            <Divider variant={variant} />
            <main className={className[5]}>{children}</main>
          </div>
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
