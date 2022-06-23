import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => res.json(err);

export default errorMiddleware;
