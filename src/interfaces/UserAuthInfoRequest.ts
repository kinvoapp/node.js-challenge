import { Request } from 'express';

export interface UserAuthInfoRequest extends Request {
  userId: string // or any other type
}