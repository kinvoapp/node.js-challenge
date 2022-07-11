import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default async function isAuthenticated(
  request: Request,
  __: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw Error()

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_Id } = verify(
      token,
      process.env.JWT_ACCESS_SECRET,
    ) as TokenPayload;

    request.user = {
      id: user_Id,
    };

    return next();
  } catch(err) {
    throw Error()
  }
}
