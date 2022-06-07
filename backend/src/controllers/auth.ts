import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import {
  PASSWORDS_DON_NOT_MATCH_MESSAGE,
  USERNAME_NOT_FOUND_MESSAGE,
} from '../validators/auth';

const signUpController = async (
  req: Request<{}, IUser, IUser>,
  res: Response
) => {
  const { username, password } = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    username,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign({ ...user.format() }, process.env.JWT_SECRET!);

  return res.status(201).json({ ...user.format(), token });
};

const signInController = async (
  req: Request<{}, IUser, IUser>,
  res: Response
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user)
    return res.status(404).json({
      errors: [{ message: USERNAME_NOT_FOUND_MESSAGE, param: 'username' }],
    });

  const arePasswordsMatching = await bcrypt.compare(password, user.password);

  if (!arePasswordsMatching)
    return res.status(401).json({
      errors: [{ message: PASSWORDS_DON_NOT_MATCH_MESSAGE, param: 'password' }],
    });

  return res.json({
    ...user.format(),
    token: jwt.sign({ ...user.format() }, process.env.JWT_SECRET!),
  });
};

const getCurrentUserController = (req: Request, res: Response) =>
  res.json(req.currentUser.format());

export { signUpController, signInController, getCurrentUserController };
