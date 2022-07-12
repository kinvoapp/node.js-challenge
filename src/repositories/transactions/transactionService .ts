import { AccountModel } from '../../infra/implementations/mysql/models/Account';
import { TransactionModel } from '../../infra/implementations/mysql/models/Transaction';
import { ITransactionDTO } from '../../infra/ITransactionRepository';
import {
  transactionCreateSchema,
  transactionUpdateSchema,
} from './transactionRules';

require('dotenv').config();

export class TransactionService {
  private transactionModel = new TransactionModel();
  private accountModel = new AccountModel();

  async create({ accountId, description, type, value }: ITransactionDTO) {
    await transactionCreateSchema
      .validate({ description, type, value })
      .catch(function (err) {
        throw new Error(err.errors);
      });

    const account = await this.accountModel.findAccountById(accountId);
    const { cpf } = account!;

    const currentBalance = await this.accountModel.getBalance(cpf);
    let newBalance = 0;

    if (type === 'credit') {
      newBalance = currentBalance + value;
    } else {
      newBalance = currentBalance - value;
    }

    await this.accountModel.updateBalance(newBalance, accountId);

    await this.transactionModel.create({
      description,
      type,
      value,
      accountId,
    });
  }

  async update(id: number, description: string) {
    await transactionUpdateSchema
      .validate({ description })
      .catch(function (err) {
        throw new Error(err.errors);
      });

    await this.transactionModel.update(description, id);
  }

  async list(accountId: number) {
    const transactions = await this.transactionModel.list(accountId);

    return transactions;
  }

  async remove(id: number) {
    await this.transactionModel.delete(id);
  }
}
