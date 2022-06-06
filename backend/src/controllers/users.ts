import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

const addUserController = async (
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

export { addUserController };
