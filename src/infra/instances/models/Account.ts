// import { DataTypes, Sequelize } from 'sequelize';
import * as Sequelize from 'sequelize';
import { sequelize } from '..';
import { IAccount } from '../../../entities/IAccount';
import { ITransaction } from '../../../entities/ITransaction';

export interface AccountModel extends Sequelize.Model<IAccount> {
  id: number;
  name: string;
  cpf: string;
  password: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AccountViewModel {
  id: number;
  cpf: string;
}

export const Account = sequelize.define<AccountModel, IAccount>('account', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  cpf: Sequelize.STRING,
  name: Sequelize.STRING,
  password: Sequelize.STRING,
  amount: Sequelize.DECIMAL(14, 2),
});
