import { Form, Formik, FormikHelpers } from 'formik';
import useTheme from '../../../hooks/useTheme';
import Button from '../../General/Button/Button';
import TextField from '../../General/TextField/TextField';
import initialValues from './initialValues';
import styles from './SignInForm.module.scss';
import validationSchema from './validationSchema';

interface ISignInFormValues {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { isDarkThemeUsed } = useTheme();

  const onSubmitHandler = (
    values: ISignInFormValues,
    { setSubmitting }: FormikHelpers<ISignInFormValues>
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
          <TextField
            id='username'
            label='Username'
            className={styles['form__field']}
          />
          <TextField id='password' label='Password' type='password' />
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

export default SignInForm;
