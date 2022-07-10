import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { GetTransactionUseCase } from "../../app/useCases/getTransactionsUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

const memoryRepositoryFactory = new MemoryRepositoryFactory()
const transactionRepository = memoryRepositoryFactory.createTransactionRepository()

const createTransaction = new CreateTransactionUseCase(transactionRepository)
const getTransaction = new GetTransactionUseCase(transactionRepository)

describe("GetTransaction", () => {
  test("should be able to get a new transaction", async () => {
    const newTransaction = await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 273.99,
      type: "income",
    })
    const transaction = await getTransaction.execute(newTransaction.uid)
    expect(transaction).toBeDefined()
  })

  test("should throw an error if transaction does not exist", async () => {
    await expect(() => getTransaction.execute("invalid")).rejects.toThrow("Transaction was not found")
  })
})
