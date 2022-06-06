import { body } from 'express-validator';
import validatorResponseMiddleware from '../middleware/validatorResponse';
import User from '../models/User';

const USERNAME_LENGTH_VALIDATION_MESSAGE =
  'Username must be between 5 and 20 characters long';

const USERNAME_UNIQUENESS_VALIDATION_MESSAGE = 'Username already used';

const PASSWORD_VALIDATION_MESSAGE =
  'Password must be between 12 and 72 characters long and not contain any whitespaces';

const CONFIRMED_PASSWORD_VALIDATION_MESSAGE = "Passwords don't match";

const PASSWORD_VALIDATION_REG_EXP =
  /^([a-zA-Z~`!@#$%^&*()_\-+={[}\]:;"'\|\\<,>.?\/\d]){12,72}$/;

const addUserValidator = [
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

export { PASSWORD_VALIDATION_REG_EXP };

export default addUserValidator;
