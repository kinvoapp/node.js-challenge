import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class DeleteTransactionController {
  constructor(private repository: TransactionRepository) {}

  handle(req: Request, res: Response) {
    this.repository
      .deleteRecord(req.params.id)
      .then((result) => {
        return res.status(200).json({
          record: result,
        });
      })
      .catch((err) => {
        return err;
      });
  }
}
