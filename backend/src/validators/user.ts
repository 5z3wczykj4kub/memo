import { body } from 'express-validator';
import validatorResponseMiddleware from '../middleware/validatorResponse';

type TDifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

interface IGameResults {
  time: number;
  points: number;
  difficultyLevel: TDifficultyLevel;
}

const EXPERIENCE_VALIDATION_MESSAGE =
  'Must be an integer in the range of [0, 6000000]';

const INTEGER_VALIDATION_MESSAGE = 'Must be a positive integer';

const DIFFICULTY_LEVEL_VALIDATION_MESSAGE =
  'Must be either easy, medium, hard or extreme';

const updateCurrentUserValidator = [
  body('time', INTEGER_VALIDATION_MESSAGE).isInt({ min: 0 }),
  body('points', INTEGER_VALIDATION_MESSAGE).isInt({ min: 0 }),
  body('difficultyLevel', DIFFICULTY_LEVEL_VALIDATION_MESSAGE).isIn([
    'easy',
    'medium',
    'hard',
    'extreme',
  ]),
  validatorResponseMiddleware,
];

export {
  updateCurrentUserValidator,
  EXPERIENCE_VALIDATION_MESSAGE,
  TDifficultyLevel,
  IGameResults,
};
