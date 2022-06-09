import classNames from 'classnames';
import React, { ReactNode } from 'react';
import styles from './Button.module.scss';
import { Icons } from 'react-toastify';

interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
  tabIndex?: number;
  variant?: 'light' | 'dark';
  isLoading?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const { spinner: Spinner } = Icons;

const Button = (props: IButton) => {
  const { className, children, isLoading, variant = 'light' } = props;

  return (
    <button
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
};

export default Button;
