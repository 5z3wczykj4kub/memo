import { body, param } from 'express-validator';
import validatorResponseMiddleware from '../middleware/validatorResponse';

type TDifficultyLevel = 'easy' | 'medium' | 'hard' | 'extreme';

interface IGameResults {
  time: number;
  points: number;
  gameStatus: 'lost' | 'won';
  difficultyLevel: TDifficultyLevel;
}

const EXPERIENCE_VALIDATION_MESSAGE =
  '`Experience` must be an integer in the range of [0, 60000]';

const INTEGER_VALIDATION_MESSAGE = 'must be a positive integer';

const GAME_STATUS_VALIDATION_MESSAGE = 'Must be either lost or won';

const DIFFICULTY_LEVEL_VALIDATION_MESSAGE =
  'Must be either easy, medium, hard or extreme';

const USER_ID_VALIDATION_MESSAGE = 'Invalid user id';

const updateCurrentUserValidator = [
  body('time', `\`Time\` ${INTEGER_VALIDATION_MESSAGE}`).isInt({ min: 0 }),
  body('points', `\`Points\` ${INTEGER_VALIDATION_MESSAGE}`).isInt({ min: 0 }),
  body('gameStatus', GAME_STATUS_VALIDATION_MESSAGE).isIn(['lost', 'won']),
  body('difficultyLevel', DIFFICULTY_LEVEL_VALIDATION_MESSAGE).isIn([
    'easy',
    'medium',
    'hard',
    'extreme',
  ]),
  validatorResponseMiddleware,
];

const getUserProfileValidator = [
  param('userId', USER_ID_VALIDATION_MESSAGE).isMongoId(),
  validatorResponseMiddleware,
];

export {
  updateCurrentUserValidator,
  getUserProfileValidator,
  EXPERIENCE_VALIDATION_MESSAGE,
  TDifficultyLevel,
  IGameResults,
};
