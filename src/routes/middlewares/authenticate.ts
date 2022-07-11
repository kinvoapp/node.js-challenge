import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import { ICustomRequest } from '../../interfaces/ICustomRequest';
import { UserService } from '../../services/UserService';
import { constants } from '../../utils/constants';

export default async function authenticate(req: ICustomRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Não autenticado!' });
  }

  try {
    const validToken: any = jwt.verify(token, constants.jwt.key);
    req.user = await UserService.getById(validToken.userId);

    if (!req.user) {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Não autenticado!' });
    }

    return next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Não autenticado!' });
  }
}