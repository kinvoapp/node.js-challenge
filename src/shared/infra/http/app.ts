import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";

import "../../container";

import { AppError } from "../../errors/App.Error";
import createDbConnection from "../typeorm";
import "express-async-errors";
import { router } from "./routes";

createDbConnection();

const app = express();

app.use(express.json());
app.use("/api/v1", router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
