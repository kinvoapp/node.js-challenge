import { Request, Response } from "express";

const { loginService } = require("../services/login.service");

exports.login = async (req: Request, res: Response) => {
  let login;
  try {
    login = await loginService(req.body);
  } catch (error) {
    return res.status(500);
  }

  return res.status(login.code).json({ message: login.message });
};
