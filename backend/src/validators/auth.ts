import { body } from 'express-validator';
import validatorResponseMiddleware from '../middleware/validatorResponse';
import User from '../models/User';

const USERNAME_LENGTH_VALIDATION_MESSAGE =
  'Username must be between 5 and 20 alphanumeric characters long';

const USERNAME_ALREADY_USED_MESSAGE = 'Username already used';

const PASSWORD_VALIDATION_MESSAGE =
  'Password must be between 12 and 72 characters long and not contain any whitespaces';

const PASSWORDS_DON_NOT_MATCH_MESSAGE = "Passwords don't match";

const MISSING_TOKEN_MESSAGE = 'Missing authorization token';

const INVALID_TOKEN_MESSAGE = 'Invalid token';

const USER_NOT_FOUND_MESSAGE = "User doesn't exist";

const INVALID_USERNAME_OR_PASSWORD_MESSAGE = 'Invalid username or password';

const PASSWORD_VALIDATION_REG_EXP =
  /^([a-zA-Z~`!@#$%^&*()_\-+={[}\]:;"'|\\<,>.?/\d]){12,72}$/;

const signUpValidator = [
  body('username', USERNAME_LENGTH_VALIDATION_MESSAGE)
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 })
    .custom(async (username) => {
      const isUsernameAlreadyUsed = !!(await User.count({
        username,
      }));
      if (isUsernameAlreadyUsed)
        return Promise.reject(USERNAME_ALREADY_USED_MESSAGE);
      return true;
    }),
  body('password', PASSWORD_VALIDATION_MESSAGE)
    .trim()
    .matches(PASSWORD_VALIDATION_REG_EXP),
  body('confirmedPassword', PASSWORDS_DON_NOT_MATCH_MESSAGE)
    .trim()
    .custom((confirmedPassword, { req }) => {
      if (confirmedPassword !== req.body.password) throw new Error();
      return true;
    }),
  validatorResponseMiddleware,
];

const signInValidator = [
  body('username', USERNAME_LENGTH_VALIDATION_MESSAGE)
    .trim()
    .isAlphanumeric()
    .isLength({ min: 5, max: 20 }),
  body('password', PASSWORD_VALIDATION_MESSAGE)
    .trim()
    .matches(PASSWORD_VALIDATION_REG_EXP),
  validatorResponseMiddleware,
];

export {
  signUpValidator,
  signInValidator,
  PASSWORD_VALIDATION_REG_EXP,
  PASSWORDS_DON_NOT_MATCH_MESSAGE,
  MISSING_TOKEN_MESSAGE,
  INVALID_TOKEN_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  INVALID_USERNAME_OR_PASSWORD_MESSAGE,
};
