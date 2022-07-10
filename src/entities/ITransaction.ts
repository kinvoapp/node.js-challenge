export interface ITransaction {
  value: number;
  description: string;
  type: 'debit' | 'credit';
  accountId: number;
}
