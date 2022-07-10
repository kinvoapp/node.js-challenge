import { ITransactionRepository } from "../../contracts/repositories/TransactionRepository"

export class GetBalanceUseCase {
  constructor(private transactionRepository: ITransactionRepository) {}

  async execute(): Promise<number> {
    return this.transactionRepository.getBalance()
  }
}
