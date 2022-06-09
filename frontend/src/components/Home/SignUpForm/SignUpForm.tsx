import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useTheme from '../../../hooks/useTheme';
import { useSignUpMutation } from '../../../rtk/authApi';
import { setCurrentUser } from '../../../rtk/authSlice';
import { IResponseCatchError, ISignUpFormValues } from '../../../rtk/types';
import Button from '../../General/Button/Button';
import TextField from '../../General/TextField/TextField';
import initialValues from './initialValues';
import styles from './SignUpForm.module.scss';
import validationSchema, { SIGN_UP_TOAST_MESSAGE } from './validationSchema';

interface ISignUpForm {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm = ({ setIsModalVisible }: ISignUpForm) => {
  const { isDarkThemeUsed } = useTheme();

  const [signUp, { isLoading }] = useSignUpMutation();

  const dispatch = useAppDispatch();

  const onSubmitHandler = async (values: ISignUpFormValues) => {
    try {
      const currentUserData = await toast.promise(signUp(values).unwrap(), {
        pending: SIGN_UP_TOAST_MESSAGE.PENDING,
        success: SIGN_UP_TOAST_MESSAGE.SUCCESS,
        error: SIGN_UP_TOAST_MESSAGE.ERROR,
      });
      localStorage.setItem('token', currentUserData.token!);
      dispatch(setCurrentUser(currentUserData));
      setIsModalVisible(false);
    } catch (error) {
      (error as IResponseCatchError).data.errors.forEach(({ message }) =>
        toast.error(message, { toastId: message })
      );
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
    >
      {({ isValid }) => (
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
            isLoading={isLoading}
            disabled={!isValid || isLoading}
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
