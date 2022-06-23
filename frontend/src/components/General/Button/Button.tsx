import classNames from 'classnames';
import React, { forwardRef, PropsWithChildren, ReactNode } from 'react';
import styles from './Button.module.scss';
import { Icons } from 'react-toastify';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  variant?: 'light' | 'dark';
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const { spinner: Spinner } = Icons;

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButton>>(
  (props: IButton, ref) => {
    const { className, children, isLoading, variant = 'light' } = props;

    return (
      <button
        ref={ref}
        {...props}
        className={classNames({
          [styles.button]: true,
          [styles['button--dark']]: variant === 'dark',
          [styles['button--loading']]: isLoading,
          [className!]: true,
        })}
      >
        <>
          {children}
          {isLoading && <Spinner />}
        </>
      </button>
    );
  }
);

export default Button;
