import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";
import { calculate } from "../utils/calcBalance";
export class GetBalanceController {
  constructor(private repository: TransactionRepository) {}
  handle(req: Request, res: Response) {
    this.repository
      .getBalance()
      .then((result) => {
        return res.status(200).json({
          balance: calculate(result),
        });
      })
      .catch((err) => {
        return err;
      });
  }
}
