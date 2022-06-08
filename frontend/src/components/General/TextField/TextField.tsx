import classNames from 'classnames';
import { ErrorMessage, Field } from 'formik';
import useTheme from '../../../hooks/useTheme';
import styles from './TextField.module.scss';

type TTextField = React.LabelHTMLAttributes<HTMLLabelElement> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
  };

const TextField = ({ id, label, type, className }: TTextField) => {
  const { isDarkThemeUsed } = useTheme();

  return (
    <div
      className={classNames({
        [styles.textfield]: true,
        [styles['textfield--dark']]: isDarkThemeUsed,
        [className!]: true,
      })}
    >
      <label className={styles['textfield__label']} htmlFor={id}>
        {label}
      </label>
      <Field
        id={id}
        className={classNames({
          [styles['textfield__input']]: true,
          [styles['textfield__input--dark']]: isDarkThemeUsed,
        })}
        name={id}
        type={type}
      />
      <ErrorMessage
        className={styles['textfield__error-message']}
        name={id!}
        component='div'
      />
    </div>
  );
};

export default TextField;
