import { db } from '..';
import { Account } from '../../../../entities/Account';
import {
  IAccountRepository,
  ICreateAccountDTO,
} from '../../../IAccountRepository';

export class AccountModel implements IAccountRepository {
  async updateBalance(amount: number, id: number): Promise<void> {
    const response = await db.execute(
      `UPDATE accounts SET amount = '${amount}' WHERE id = '${id}';`
    );

    return response;
  }

  async getBalance(cpf: string): Promise<number> {
    const response = await db.execute(
      `SELECT amount FROM accounts WHERE cpf = ${cpf};`
    );

    return response;
  }

  async findByCpf(cpf: string): Promise<Account | null> {
    const response = await db.execute(
      `SELECT * FROM accounts WHERE cpf = ${cpf};`
    );

    return response[0][0];
  }

  async create(account: ICreateAccountDTO): Promise<void> {
    const response = await db.execute(
      `INSERT INTO accounts (cpf, name, password) VALUES ('${account.cpf}', '${account.name}', '${account.password}');`
    );

    return response;
  }

  async findAccountById(id: number): Promise<Account | null> {
    const response = await db.execute(
      `SELECT * FROM accounts WHERE id = ${id};`
    );

    return response[0][0];
  }
}
