import { Form, Formik, FormikHelpers } from 'formik';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useTheme from '../../../hooks/useTheme';
import { ISignUpFormValues, useSignUpMutation } from '../../../rtk/authApi';
import { setCurrentUser } from '../../../rtk/authSlice';
import Button from '../../General/Button/Button';
import TextField from '../../General/TextField/TextField';
import initialValues from './initialValues';
import styles from './SignUpForm.module.scss';
import validationSchema from './validationSchema';

const SignUpForm = () => {
  const { isDarkThemeUsed } = useTheme();

  /**
   * TODO:
   * What's the difference between
   * `isLoading` and `isFetching`?
   */
  const [signUp, { isLoading }] = useSignUpMutation();

  const dispatch = useAppDispatch();

  const onSubmitHandler = async (
    values: ISignUpFormValues,
    { setSubmitting }: FormikHelpers<ISignUpFormValues>
  ) => {
    try {
      const currentUserData = await signUp(values).unwrap();
      dispatch(setCurrentUser(currentUserData));
      /**
       * TODO:
       * What's `setSubmitting` function doing?
       */
      setSubmitting(false);
    } catch (error) {
      /**
       * TODO:
       * Handle error.
       */
      console.log('error', error);
    }
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
          <TextField
            id='confirmedPassword'
            label='Confirm password'
            type='password'
          />
          <Button
            className={styles['form__submit-button']}
            type='submit'
            disabled={isSubmitting || isLoading}
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
