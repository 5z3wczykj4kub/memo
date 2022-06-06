import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validatorResponseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  return !errors.isEmpty()
    ? res.status(400).json({
        errors: errors.array().map((error) => ({
          message: error.msg,
          param: error.param,
        })),
      })
    : next();
};

export default validatorResponseMiddleware;
