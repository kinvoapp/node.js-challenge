import { Account } from '../entities/Account';

export interface ICreateAccountDTO {
  name?: string;
  cpf?: string;
  password?: string;
  amount?: number;
}

export interface IAccountRepository {
  findByCpf(cpf: string): Promise<Account | null>;
  create(account: ICreateAccountDTO): Promise<void>;
}
