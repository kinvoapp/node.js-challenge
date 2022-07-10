import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { IPayload, RequestWithStudentInfo } from "../domain/requestDto";

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    const { sub, accountId } = verify(
      token,
      `${process.env.STUDENT_SECRET}`
    ) as IPayload;
    (request as RequestWithStudentInfo).studentId = sub;
    (request as RequestWithStudentInfo).accountId = accountId;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}
