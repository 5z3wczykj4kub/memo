import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { USER_NOT_FOUND_MESSAGE } from '../validators/auth';
import { IGameResults } from '../validators/user';

const getCurrentUserController = (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  return res.json({ ...req.currentUser.format(), token });
};

const updateCurrentUserController = async (
  req: Request<{}, IUser, IGameResults>,
  res: Response
) => {
  const currentUser = await User.findById(req.currentUser.id);

  if (!currentUser)
    return res.status(404).json({
      errors: [{ message: USER_NOT_FOUND_MESSAGE }],
    });

  const { time, points, difficultyLevel } = req.body;

  switch (difficultyLevel) {
    case 'easy':
      currentUser.experience += points;
      break;
    case 'medium':
      currentUser.experience += points * 2;
      break;
    case 'hard':
      currentUser.experience += points * 3;
      break;
    case 'extreme':
      currentUser.experience += points * 4;
      break;
  }

  await currentUser.save();

  return res.json(currentUser.format());
};

export { getCurrentUserController, updateCurrentUserController };
