import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import httpStatus from 'http-status';

export const validation = (schema: any) => {
  return [
    schema,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(httpStatus.BAD_REQUEST).json({ message: errors.array()[0].msg });
      }

      return next();
    }
  ];
}