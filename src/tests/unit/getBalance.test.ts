import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { GetBalanceUseCase } from "../../app/useCases/getBalanceUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

const memoryRepositoryFactory = new MemoryRepositoryFactory()
const transactionRepository = memoryRepositoryFactory.createTransactionRepository()

const createTransaction = new CreateTransactionUseCase(transactionRepository)
const getBalance = new GetBalanceUseCase(transactionRepository)

describe("GetBalance", () => {
  test("should be able to get the balance", async () => {
    await createTransaction.execute({ title: "Test", description: "Test", type: "income", amount: 1200 })
    await createTransaction.execute({ title: "Test", description: "Test", type: "expense", amount: 100 })
    await createTransaction.execute({ title: "Test", description: "Test", type: "expense", amount: 270 })
    await createTransaction.execute({ title: "Test", description: "Test", type: "expense", amount: 135 })

    const balance = await getBalance.execute()
    expect(balance).toBe(695)
  })
})
