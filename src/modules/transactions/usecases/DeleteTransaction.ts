import { TransactionsRepository } from '../repositories/TransactionsRepository'

type DeleteTransactionProps = {
  id: string
}

export class DeleteTransaction {
  constructor(private transactionsRepo: TransactionsRepository) {}

  async execute(data: DeleteTransactionProps) {
    const { id } = data

    await this.transactionsRepo.delete(id)
  }
}
