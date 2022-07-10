interface IStatement {
  id: string;
  value: number;
  description: string;
  type: 'debit' | 'credit';
  created_at: Date;
}
interface IAccount {
  id: string;
  name: string;
  cpf: string;
  password: string;
  amount: number;
  statement: IStatement[];
  created_at: Date;
}
