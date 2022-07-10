import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

const memoryRepositoryFactory = new MemoryRepositoryFactory()
const transactionRepository = memoryRepositoryFactory.createTransactionRepository()

const createTransaction = new CreateTransactionUseCase(transactionRepository)

describe("TransactionsTest", () => {
  test("should be able to create a new transaction", async () => {
    const transaction = await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 273.99,
      type: "income",
    })
    expect(transaction).toBeDefined()
    expect(transaction.uid).toBeDefined()
    expect(transaction.title).toBe("Conta de luz")
    expect(transaction.description).toBe("Conta de luz da casa")
    expect(transaction.amount).toBe(273.99)
    expect(transaction.type).toBe("income")
    expect(transaction.createdAt).toBeDefined()
    expect(transaction.updatedAt).toBeDefined()
    expect(memoryRepositoryFactory.memoryRepository.transactions).toHaveLength(1)
  })

  test("should not be able to create a new transaction if type is not income or expense", async () => {
    await expect(() =>
      createTransaction.execute({
        title: "Conta de luz",
        description: "Conta de luz da casa",
        amount: 273.99,
        // @ts-ignore-next-line
        type: "invalid",
      })
    ).rejects.toThrow("Invalid transaction type, must be income or expense")
  })

  test("should not be able to create a new transaction if amount is not a number", async () => {
    await expect(() =>
      createTransaction.execute({
        title: "Conta de luz",
        description: "Conta de luz da casa",
        // @ts-ignore-next-line
        amount: "invalid",
        type: "income",
      })
    ).rejects.toThrow("Invalid transaction amount, must be a number")
  })

  test("should not be able to create a new transaction if amount is lower than 0", async () => {
    await expect(() =>
      createTransaction.execute({
        title: "Conta de luz",
        description: "Conta de luz da casa",
        amount: -273.99,
        type: "income",
      })
    ).rejects.toThrow("Invalid transaction amount, must be greater than 0")
  })

  test("should not be able to create a new transaction if title is empty", async () => {
    await expect(() =>
      createTransaction.execute({
        title: "",
        description: "Conta de luz da casa",
        amount: 273.99,
        type: "income",
      })
    ).rejects.toThrow("You must provide a title")
  })

  test("should be able to create a new transaction if description is empty", async () => {
    const transaction = await createTransaction.execute({
      title: "Conta de luz",
      description: "",
      amount: 273.99,
      type: "income",
    })

    expect(transaction).toBeDefined()
    expect(transaction.description).toBe("")
  })
})
