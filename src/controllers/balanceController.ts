import { Request, Response, NextFunction } from "express";
import calcBalance from "./../utils/calcBalance";

const BalanceController = {
  async getBalanceAmount(req: Request, res: Response, next: NextFunction) {
    let balance;
    try {
      balance = await calcBalance();
    } catch (error) {
      return res.status(500).json({ error });
    }
    return balance
      ? res.status(200).json(balance)
      : res.status(200).json(balance);
  },
};

export default BalanceController;
