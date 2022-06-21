import { Form, Formik } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-toastify';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useTheme from '../../../hooks/useTheme';
import { useSignInMutation } from '../../../rtk/api';
import { setCurrentUser } from '../../../rtk/authSlice';
import {
  IAuthenticateFormValues,
  IResponseCatchError,
} from '../../../rtk/types';
import Button from '../../General/Button/Button';
import TextField from '../../General/TextField/TextField';
import initialValues from './initialValues';
import styles from './SignInForm.module.scss';
import validationSchema, { SIGN_IN_TOAST_MESSAGE } from './validationSchema';

interface ISignInForm {
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const SignInForm = ({ setIsModalVisible }: ISignInForm) => {
  const { isDarkThemeUsed } = useTheme();

  const [signIn, { isLoading }] = useSignInMutation({
    fixedCacheKey: 'authentication',
  });

  const dispatch = useAppDispatch();

  const onSubmitHandler = async (values: IAuthenticateFormValues) => {
    try {
      const currentUserData = await toast.promise(signIn(values).unwrap(), {
        pending: SIGN_IN_TOAST_MESSAGE.PENDING,
        success: {
          render: ({ data }) => SIGN_IN_TOAST_MESSAGE.SUCCESS(data!.username!),
        },
        error: SIGN_IN_TOAST_MESSAGE.ERROR,
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

export default SignInForm;
