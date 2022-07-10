import { Request, Response } from "express";

const { loginService } = require("../services/login.service");

exports.login = async (req: Request, res: Response) => {
  let login;
  const { email, password } = req.body;
  try {
    login = await loginService(email, password);
  } catch (error) {
    return res.status(500);
  }

  return login.code
    ? res.status(login.code).json({ message: login.message })
    : res.status(200).json({ token: login });
};
