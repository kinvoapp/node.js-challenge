import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { DeleteTransactionUseCase } from "../../app/useCases/deleteTransactionUseCase"
import { GetTransactionUseCase } from "../../app/useCases/getTransactionsUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

let memoryRepositoryFactory: MemoryRepositoryFactory

let createTransaction: CreateTransactionUseCase
let deleteTransaction: DeleteTransactionUseCase
let getTransaction: GetTransactionUseCase

describe("Delete Transaction", () => {
  beforeEach(() => {
    memoryRepositoryFactory = new MemoryRepositoryFactory()
    let transactionRepository = memoryRepositoryFactory.createTransactionRepository()
    getTransaction = new GetTransactionUseCase(transactionRepository)
    createTransaction = new CreateTransactionUseCase(transactionRepository)
    deleteTransaction = new DeleteTransactionUseCase(transactionRepository)
  })

  it("should be possible to delete a transaction", async () => {
    const transaction = await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 273.99,
      type: "income",
    })

    await expect(deleteTransaction.execute(transaction.uid)).resolves.toBeUndefined()
    await expect(getTransaction.execute(transaction.uid)).rejects.toThrow("Transaction was not found")
  })

  it("should mpt be possible to delete a deleted transaction", async () => {
    const transaction = await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 273.99,
      type: "income",
    })

    expect(memoryRepositoryFactory.memoryRepository.transactions[0].uid).toBe(transaction.uid)
    await deleteTransaction.execute(transaction.uid)
    await expect(deleteTransaction.execute(transaction.uid)).rejects.toThrow("Transaction was not found")
  })
})
