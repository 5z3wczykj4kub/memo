import * as Yup from 'yup';

const USERNAME_MIN_LENGTH_VALIDATION_MESSAGE = 'Must be 5 characters or more';

const USERNAME_MAX_LENGTH_VALIDATION_MESSAGE = 'Must be 15 characters or less';

const REQUIRED_VALIDATION_MESSAGE = 'Required';

const PASSWORD_LENGTH_VALIDATION_MESSAGE =
  'Must be between 12 and 72 characters long';

const PASSWORD_DO_NOT_MATCH_VALIDATION_MESSAGE = "Passwords don't match";

const PASSWORD_VALIDATION_REG_EXP =
  /^([a-zA-Z~`!@#$%^&*()_\-+={[}\]:;"'|\\<,>.?/\d]){12,72}$/;

export const usernameValidation = Yup.string()
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
