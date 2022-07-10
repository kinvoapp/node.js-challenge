import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class UpdateTransactionController {
  constructor(private repository: TransactionRepository) {}
  handle(req: Request, res: Response) {
    const id = req.params.id;
    const data = req.body;
    if (!id) return res.status(400).json({ error: "the id is required" });
    if (!data)
      return res.status(400).json({ error: "your body params are wrong" });
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
