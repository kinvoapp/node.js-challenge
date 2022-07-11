import { Request, Response } from "express";

const { getBalanceService } = require("../services/balance.service");

exports.getBalance = async (_req: Request, res: Response): Promise<any> => {
  let balance;
  try {
    balance = await getBalanceService();
  } catch (error) {
    return res.status(500);
  }

  return balance.code
    ? res.status(balance.code).json(balance.message)
    : res.status(200).json(balance);
};
