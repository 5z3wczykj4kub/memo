import { body } from 'express-validator';
import validatorResponseMiddleware from '../middleware/validatorResponse';
import User from '../models/User';

const USERNAME_LENGTH_VALIDATION_MESSAGE =
  'Username must be between 5 and 20 characters long';

const USERNAME_UNIQUENESS_VALIDATION_MESSAGE = 'Username already used';

const USERNAME_NOT_FOUND_MESSAGE = "Username doesn't exist";

const PASSWORD_VALIDATION_MESSAGE =
  'Password must be between 12 and 72 characters long and not contain any whitespaces';

const PASSWORDS_DON_NOT_MATCH_MESSAGE = "Passwords don't match";

const CONFIRMED_PASSWORD_VALIDATION_MESSAGE = "Passwords don't match";

const MISSING_TOKEN_MESSAGE = 'Missing authorization token';

const INVALID_TOKEN_MESSAGE = 'Invalid token';

const USER_NOT_FOUND_MESSAGE = "User doesn't exist";

const PASSWORD_VALIDATION_REG_EXP =
  /^([a-zA-Z~`!@#$%^&*()_\-+={[}\]:;"'|\\<,>.?/\d]){12,72}$/;

const signUpValidator = [
  body('username')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage(USERNAME_LENGTH_VALIDATION_MESSAGE)
    .custom(async (username) => {
      const isUsernameAlreadyUsed = !!(await User.count({
        username,
      }));
      if (isUsernameAlreadyUsed)
        return Promise.reject(USERNAME_UNIQUENESS_VALIDATION_MESSAGE);
      return true;
    }),
  body('password', PASSWORD_VALIDATION_MESSAGE)
    .trim()
    .matches(PASSWORD_VALIDATION_REG_EXP),
  body('confirmedPassword', CONFIRMED_PASSWORD_VALIDATION_MESSAGE)
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
  USERNAME_NOT_FOUND_MESSAGE,
  PASSWORDS_DON_NOT_MATCH_MESSAGE,
  MISSING_TOKEN_MESSAGE,
  INVALID_TOKEN_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
};
