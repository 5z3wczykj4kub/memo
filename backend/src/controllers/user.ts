import { Request, Response } from 'express';

const getCurrentUserController = (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  return res.json({ ...req.currentUser.format(), token });
};

export { getCurrentUserController };
