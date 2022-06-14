import * as Yup from 'yup';

const USERNAME_ALPHANUMERIC_VALIDATION_MESSAGE =
  'Must contain letters and digits only';

const USERNAME_MIN_LENGTH_VALIDATION_MESSAGE = 'Must be 5 characters or more';

const USERNAME_MAX_LENGTH_VALIDATION_MESSAGE = 'Must be 15 characters or less';

const REQUIRED_VALIDATION_MESSAGE = 'Required';

const PASSWORD_LENGTH_VALIDATION_MESSAGE =
  'Password must be between 12 and 72 characters long and not contain any whitespaces';

const PASSWORD_DO_NOT_MATCH_VALIDATION_MESSAGE = "Passwords don't match";

export const SIGN_UP_TOAST_MESSAGE = {
  PENDING: 'Signing up...',
  SUCCESS: 'Signed up successfully',
  ERROR: 'Signing up failed',
};

const PASSWORD_VALIDATION_REG_EXP =
  /^([a-zA-Z~`!@#$%^&*()_\-+={[}\]:;"'|\\<,>.?/\d]){12,72}$/;

const ALPHANUMERIC_VALIDATION_REG_EXP = /^[a-z0-9]+$/i;

export const usernameValidation = Yup.string()
  .matches(ALPHANUMERIC_VALIDATION_REG_EXP, {
    message: USERNAME_ALPHANUMERIC_VALIDATION_MESSAGE,
  })
  .min(5, USERNAME_MIN_LENGTH_VALIDATION_MESSAGE)
  .max(15, USERNAME_MAX_LENGTH_VALIDATION_MESSAGE)
  .required(REQUIRED_VALIDATION_MESSAGE);

export const passwordValidation = Yup.string()
  .matches(PASSWORD_VALIDATION_REG_EXP, PASSWORD_LENGTH_VALIDATION_MESSAGE)
  .required(REQUIRED_VALIDATION_MESSAGE);

const validationSchema = Yup.object({
  username: usernameValidation,
  password: passwordValidation,
  confirmedPassword: Yup.string()
    .oneOf([Yup.ref('password')], PASSWORD_DO_NOT_MATCH_VALIDATION_MESSAGE)
    .required(REQUIRED_VALIDATION_MESSAGE),
});

export default validationSchema;
