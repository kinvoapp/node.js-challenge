export type CreateTransactionDto = {
  entry: number;
};

export type UpdateTransactionDto = {
  entry: number;
  created_at?: string;
};
