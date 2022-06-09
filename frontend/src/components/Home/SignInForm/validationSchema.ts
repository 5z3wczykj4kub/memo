import * as Yup from 'yup';
import {
  passwordValidation,
  usernameValidation,
} from '../SignUpForm/validationSchema';

export const SIGN_IN_TOAST_MESSAGE = {
  PENDING: 'Fetching user profile...',
  SUCCESS: (username: string) => `Welcome ${username}!`,
  ERROR: 'Signing in failed',
};

const validationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
});

export default validationSchema;
