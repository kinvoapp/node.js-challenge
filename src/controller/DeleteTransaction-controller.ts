import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class DeleteTransactionController {
  constructor(private repository: TransactionRepository) {}

  handle(req: Request, res: Response) {
    if (!req.params || !req.params.id)
      return res.status(400).json({ error: "your body params are wrong" });

    if (this.repository.findById(req.params.id))
      return res.status(400).json({ error: "this record doesn't exist" });

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
