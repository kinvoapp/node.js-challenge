import { Request, Response } from "express";
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/Transaction.dto";
import { transactionHistoryRepository } from "../repositories/transactionHistory.repository";

export class TransactionsControllers {
  async createTransaction(req: Request, res: Response) {
    const { entry } = req.body as CreateTransactionDto;

    const transaction = transactionHistoryRepository.create({
      entry,
    });

    const transactionCreated = await transactionHistoryRepository.save(
      transaction
    );

    return res.json(transactionCreated);
  }

  async updateTransaction(req: Request, res: Response) {
    const { entry, created_at } = req.body as UpdateTransactionDto;

    const transactionToUpdate = await transactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToUpdate) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    transactionToUpdate.entry = entry;

    transactionToUpdate.created_at =
      created_at || transactionToUpdate?.created_at;

    const updateTransaction = await transactionHistoryRepository.save(
      transactionToUpdate
    );

    return res.status(201).send(updateTransaction);
  }

  async deleteTransaction(req: Request, res: Response) {
    const transactionToDelete = await transactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToDelete) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    await transactionHistoryRepository.delete({
      id: Number(req.params.id),
    });

    return res.status(204).json({
      ok: true,
    });
  }

  async getAllTransaction(req: Request, res: Response) {
    const transactions = await transactionHistoryRepository.find();

    return res.status(200).json(transactions);
  }
}
