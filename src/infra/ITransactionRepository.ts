import { Transaction } from 'sequelize/types';

export interface ITransactionDTO {
  id?: number;
  value: number;
  description: string;
  type: 'debit' | 'credit';
  accountId: number;
}

export interface ITransactionRepository {
  findTransactionById(id: number): Promise<Transaction | null>;
  create(transaction: ITransactionDTO): Promise<void>;
  update(transaction: string, id: number): Promise<void>;
  list(AccountId: number): Promise<Transaction[]>;
  delete(id: number): Promise<void>;
}
