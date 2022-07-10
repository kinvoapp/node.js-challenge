import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { GetTransactionUseCase } from "../../app/useCases/getTransactionsUseCase"
import { UpdateTransactionUseCase } from "../../app/useCases/updateTransactionUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

const memoryRepositoryFactory = new MemoryRepositoryFactory()
const transactionRepository = memoryRepositoryFactory.createTransactionRepository()

const createTransaction = new CreateTransactionUseCase(transactionRepository)
const updateTransaction = new UpdateTransactionUseCase(transactionRepository)
const getTransaction = new GetTransactionUseCase(transactionRepository)

describe("UpdateTransaction", () => {
  test("should be able to create a new transaction", async () => {
    const transaction = await createTransaction.execute({
      description: "Test",
      title: "Test",
      type: "income",
      amount: 100,
    })
    expect(transaction.uid).toBeDefined()
    expect(transaction.amount).toBe(100)
    await updateTransaction.execute(transaction.uid, { amount: 1000 })
    const updatedTransaction = await getTransaction.execute(transaction.uid)
    expect(updatedTransaction.amount).toBe(1000)
  })

  test("should not be able to update a inexistent transaction", async () => {
    await expect(updateTransaction.execute("123", { amount: 1000 })).rejects.toThrow(`Transaction was not found`)
  })
})
