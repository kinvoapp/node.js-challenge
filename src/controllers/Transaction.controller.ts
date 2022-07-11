import { Request, Response } from "express";
import {
  CreateTransactionDto,
  UpdateTransactionDto,
} from "../dto/Transaction.dto";
import { TransactionHistoryRepository } from "../repositories/transactionHistory.repository";

export class TransactionsControllers {
  async createTransaction(req: Request, res: Response) {
    const { entry } = req.body as CreateTransactionDto;

    const transaction = TransactionHistoryRepository.create({
      entry,
    });

    const transactionCreated = await TransactionHistoryRepository.save(
      transaction
    );

    return res.json(transactionCreated);
  }

  async updateTransaction(req: Request, res: Response) {
    const { entry, created_at } = req.body as UpdateTransactionDto;

    const transactionToUpdate = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToUpdate) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    transactionToUpdate.entry = entry;

    transactionToUpdate.created_at =
      created_at || transactionToUpdate?.created_at;

    const updateTransaction = await TransactionHistoryRepository.save(
      transactionToUpdate
    );

    return res.status(201).send(updateTransaction);
  }

  async deleteTransaction(req: Request, res: Response) {
    const transactionToDelete = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });

    if (!transactionToDelete) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    await TransactionHistoryRepository.delete({
      id: Number(req.params.id),
    });

    return res.status(204).json({
      ok: true,
    });
  }

  async getAllTransaction(req: Request, res: Response) {
    const transactions = await TransactionHistoryRepository.find();

    return res.status(200).json(transactions);
  }

  async getOneTransaction(req: Request, res: Response) {
    const transaction = await TransactionHistoryRepository.findOneBy({
      id: Number(req.params.id),
    });
    if (!transaction) {
      return res.status(404).json({ message: "Transaction was not found" });
    }

    return res.status(200).json(transaction);
  }

  async getBalance(req: Request, res: Response) {
    const transaction = await TransactionHistoryRepository.find();

    const totalBalance = transaction.reduce(
      (before, after) => before + after.entry,
      0
    );

    return res.status(200).json({ totalBalance });
  }
}
