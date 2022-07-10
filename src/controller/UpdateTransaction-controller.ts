import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class UpdateTransactionController {
  constructor(private repository: TransactionRepository) {}
  handle(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;

    this.repository
      .updateRecord(id, data)
      .then((result) => {
        return res.status(201).json({
          record: result,
        });
      })
      .catch((err) => {
        return err;
      });
  }
}
