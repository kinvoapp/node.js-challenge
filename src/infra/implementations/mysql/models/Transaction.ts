import { Transaction } from 'sequelize/types';
import { db } from '..';
import {
  ITransactionDTO,
  ITransactionRepository,
} from '../../../ITransactionRepository';

export class TransactionModel implements ITransactionRepository {
  async findTransactionById(id: number): Promise<Transaction | null> {
    const response = await db.execute(
      `SELECT * FROM transactions WHERE id = ${id};`
    );

    return response[0][0];
  }

  async create(transaction: ITransactionDTO): Promise<void> {
    const response = await db.execute(
      `INSERT INTO transactions (description, type, value, accountId) VALUES ('${transaction.description}', '${transaction.type}', '${transaction.value}', '${transaction.accountId}');`
    );

    return response;
  }

  async update(description: string, id: number): Promise<void> {
    const response = await db.execute(
      `UPDATE transactions SET description = '${description}' WHERE id = '${id}';`
    );

    return response;
  }
  async list(accountId: number): Promise<Transaction[]> {
    const response = await db.execute(
      `SELECT * FROM transactions WHERE accountId = ${accountId};`
    );

    return response;
  }
  async delete(id: number): Promise<void> {
    const response = await db.execute(
      `DELETE FROM transactions WHERE id = '${id}';`
    );

    return response;
  }
}
