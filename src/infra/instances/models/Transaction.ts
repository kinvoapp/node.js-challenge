// import { DataTypes, Sequelize } from 'sequelize';
import * as Sequelize from 'sequelize';
import { ITransaction } from '../../../entities/ITransaction';

export interface TransactionModel extends Sequelize.Model<ITransaction> {
  id: number;
  value: number;
  description: string;
  type: 'debit' | 'credit';
  accountId: number;
  createdAt: string;
  updatedAt: string;
}
