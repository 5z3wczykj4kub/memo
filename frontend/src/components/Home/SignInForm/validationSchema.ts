import * as Yup from 'yup';
import {
  passwordValidation,
  usernameValidation,
} from '../SignUpForm/validationSchema';

const validationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
});

export default validationSchema;
