import { Request } from 'express';
import { IUser } from './IUser';

export interface ICustomRequest extends Request {
  user?: IUser,
}