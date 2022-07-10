import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const secret = fs.readFileSync(
  path.resolve(__dirname, "../../jwt.evaluation.key"),
  "utf8"
);

exports.generateToken = (user: object) => {
  const jwtConfig = {
    expiresIn: "7d",
    algorithm: "HS256",
  };

  const token = jwt.sign({ user }, secret, jwtConfig);

  return token;
};

exports.validationToken = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;

    const { user } = jwt.verify(authorization, secret);

    next(user);
  } catch ({ message }) {
    console.error(message);
    next(message);
  }
};
