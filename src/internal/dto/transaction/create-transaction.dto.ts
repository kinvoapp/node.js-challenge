export interface CreateTransactionDto {
  amount: number
  type: 'IN' | 'OUT'
  userId: string
}
