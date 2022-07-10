import { TransactionRepository } from "../repository/transaction.repository";
import { Request, Response } from "express";

export class CreateTransactionController {
  constructor(private repository: TransactionRepository) {}

  handle(req: Request, res: Response) {
    const { desc, type, value } = req.body;
    try {
      if (!req.body)
        return res.status(400).json({ error: "your body params are wrong" });
      if (!desc)
        return res.status(400).json({ error: "the description is required" });
      if (!type) return res.status(400).json({ error: "the type is required" });
      if (!value)
        return res.status(400).json({ error: "the value is required" });

      const data = req.body;
      this.repository
        .saveRecord(data)
        .then((result) => {
          return res.status(201).json({
            record: result,
          });
        })
        .catch((err) => {
          return err;
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "something went wrong." });
    }
  }
}
