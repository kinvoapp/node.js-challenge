export interface IStatement {
  value: number;
  description: string;
  type: 'debit' | 'credit';
  accountId: number;
}
