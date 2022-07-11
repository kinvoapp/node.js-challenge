import { environment } from '../../environments/environmentVariable';
import { ICreateAccountDTO } from '../../infra/IAccountRepository';
import { AccountModel } from '../../infra/implementations/mysql/models/Account';
import { registerSchema } from './rules';

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
    return account;
  }
}
