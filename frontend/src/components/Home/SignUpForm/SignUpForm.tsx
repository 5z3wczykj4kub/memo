import classNames from 'classnames';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import initialValues from './initialValues';
import styles from './SignUpForm.module.scss';
import validationSchema from './validationSchema';

interface ISignUpFormValues {
  username: string;
  password: string;
  confirmedPassword: string;
}

const SignUpForm = () => {
  const { isDarkThemeUsed } = useTheme();

  const onSubmitHandler = (
    values: ISignUpFormValues,
    { setSubmitting }: FormikHelpers<ISignUpFormValues>
  ) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div
            className={classNames({
              [styles['form__field']]: true,
              [styles['form__field--dark']]: isDarkThemeUsed,
            })}
          >
            <label className={styles['form__field__label']} htmlFor='username'>
              Username
            </label>
            <Field
              id='username'
              className={classNames({
                [styles['form__field__input']]: true,
                [styles['form__field__input--dark']]: isDarkThemeUsed,
              })}
              type='username'
              name='username'
            />
            <ErrorMessage
              className={styles['form__field__error-message']}
              name='username'
              component='div'
            />
          </div>
          <div className={styles['form__field']}>
            <label className={styles['form__field__label']} htmlFor='password'>
              Password
            </label>
            <Field
              id='password'
              className={classNames({
                [styles['form__field__input']]: true,
                [styles['form__field__input--dark']]: isDarkThemeUsed,
              })}
              type='password'
              name='password'
            />
            <ErrorMessage
              className={styles['form__field__error-message']}
              name='password'
              component='div'
            />
          </div>
          <div className={styles['form__field']}>
            <label
              className={styles['form__field__label']}
              htmlFor='confirmedPassword'
            >
              Confirm password
            </label>
            <Field
              id='confirmedPassword'
              className={classNames({
                [styles['form__field__input']]: true,
                [styles['form__field__input--dark']]: isDarkThemeUsed,
              })}
              type='password'
              name='confirmedPassword'
            />
            <ErrorMessage
              className={styles['form__field__error-message']}
              name='confirmedPassword'
              component='div'
            />
          </div>
          <Button
            className={styles['form__submit-button']}
            type='submit'
            disabled={isSubmitting}
            variant={isDarkThemeUsed ? 'dark' : 'light'}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
