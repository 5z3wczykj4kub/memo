import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import {
  INVALID_TOKEN_MESSAGE,
  MISSING_TOKEN_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
} from '../validators/auth';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return res.status(401).json({
      errors: [{ message: MISSING_TOKEN_MESSAGE, param: 'authorization' }],
    });
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    var { id } = jwt.verify(token, process.env.JWT_SECRET!) as IUser;
  } catch (error) {
    return res.status(401).json({
      errors: [{ message: INVALID_TOKEN_MESSAGE, param: 'authorization' }],
    });
  }

  const user = await User.findById(id);

  if (!user)
    return res.status(404).json({
      errors: [{ message: USER_NOT_FOUND_MESSAGE }],
    });

  req.currentUser = user;

  return next();
};

export default authMiddleware;
