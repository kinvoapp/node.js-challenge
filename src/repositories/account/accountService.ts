import * as jwt from 'jsonwebtoken';
import { environment } from '../../environments/environmentVariable';
import { ICreateAccountDTO } from '../../infra/IAccountRepository';
import { AccountModel } from '../../infra/implementations/mysql/models/Account';
import { registerSchema } from './accountRules';

require('dotenv').config();

export class AccountService {
  private readonly _jwtSecret = environment.jwtSecret;
  private initialAmount = 0.0;

  private accountModel = new AccountModel();

  async register({ cpf, name, password }: ICreateAccountDTO) {
    await registerSchema
      .validate({ cpf, name, password })
      .catch(function (err) {
        throw new Error(err.errors);
      });

    const accountAlreadyExists = await this.accountModel.findByCpf(cpf!);

    if (accountAlreadyExists) {
      throw new Error('CPF está vinculado a uma conta já existente.');
    }
    await this.accountModel.create({
      cpf,
      name,
      password,
      amount: this.initialAmount,
    });

    const account = await this.accountModel.findByCpf(cpf!);
    const { password: pass, ...withoutPassword } = account!;

    return withoutPassword;
  }

  async login({ password, cpf }: Omit<ICreateAccountDTO, 'name'>) {
    const account = await this.accountModel.findByCpf(cpf!);

    if (!account) {
      throw new Error('Conta não encontrada.');
    } else if (account.password !== password) {
      throw new Error('CPF ou Password inválido.');
    } else {
      const { cpf, name, amount } = account!;

      return this.genToken({ cpf, name, amount });
    }
  }

  genToken(payload: ICreateAccountDTO) {
    try {
      const token = jwt.sign(payload, this._jwtSecret, {
        expiresIn: '20m',
        algorithm: 'HS256',
      });

      return token;
    } catch (err) {
      throw new Error('Error.');
    }
  }

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, this._jwtSecret);
      console.log('DECODED', decoded);
      return decoded;
    } catch (err) {
      throw new Error('Token inválido.');
    }
  }

  async getBalance(id: number) {
    const accountBalance = await this.accountModel.findAccountById(id);
    const { amount, name, cpf } = accountBalance!;

    return { nome: name, documento: cpf, saldo: amount };
  }
}
