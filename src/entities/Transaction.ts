export interface Transaction {
  id: number;
  value: number;
  description: string;
  type: 'debit' | 'credit';
  accountId: number;
}
