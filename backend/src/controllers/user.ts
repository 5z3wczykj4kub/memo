import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/User';
import { USER_NOT_FOUND_MESSAGE } from '../validators/auth';
import { IGameResults } from '../validators/user';

const getCurrentUserController = (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  return res.json({ ...req.currentUser.format(), token });
};

const updateCurrentUserController = async (
  req: Request<{}, IUser, IGameResults>,
  res: Response,
  next: NextFunction
) => {
  const currentUser = await User.findById(req.currentUser.id);

  if (!currentUser)
    return res.status(404).json({
      errors: [{ message: USER_NOT_FOUND_MESSAGE }],
    });

  const { time, points, gameStatus, difficultyLevel } = req.body;

  currentUser.timePlayed += time;

  let earnedExperience = 0;

  if (gameStatus === 'won') {
    switch (difficultyLevel) {
      case 'easy':
        earnedExperience = points;
        currentUser.experience += earnedExperience;
        break;
      case 'medium':
        earnedExperience = points * 2;
        currentUser.experience += earnedExperience;
        break;
      case 'hard':
        earnedExperience = points * 3;
        currentUser.experience += earnedExperience;
        break;
      case 'extreme':
        earnedExperience = points * 4;
        currentUser.experience += earnedExperience;
        break;
    }
  }

  if (currentUser.experience >= 60000) currentUser.experience = 60000;

  try {
    await currentUser.save();
  } catch (error: any) {
    const [param, message] = error.message
      .split(':')
      .splice(1)
      .map((message: string) => message.trim());
    const errors = { errors: [{ message, param }] };
    res.status(400);
    return next(errors);
  }

  const { experience, timePlayed } = currentUser;

  return res.json({
    userId: currentUser.id,
    experience,
    earnedExperience,
    timePlayed,
  });
};

const getUserProfileController = async (
  req: Request<{ userId: 'string' }, IUser>,
  res: Response
) => {
  const { userId } = req.params;

  const user = await User.findById(userId);

  if (!user)
    return res.status(404).json({
      errors: [{ message: USER_NOT_FOUND_MESSAGE }],
    });

  return res.json(user.format());
};

export {
  getCurrentUserController,
  updateCurrentUserController,
  getUserProfileController,
};
