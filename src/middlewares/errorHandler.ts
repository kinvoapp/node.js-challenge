import { Response, Request, NextFunction } from "express";
import {
  InternalServerError,
  InvalidArgument,
  NotFound,
} from "../domain/error";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(err);

  if (err instanceof InvalidArgument) {
    return res.status(400).json({
      error: err.message,
    });
  }

  if (err instanceof NotFound) {
    return res.status(404).json({
      error: err.message,
    });
  }

  if (err instanceof InternalServerError) {
    return res.status(500).json({
      error: err.message,
    });
  }

  return res.status(503).json({
    status: "error",
    message: "Internal Server Error",
  });
}
