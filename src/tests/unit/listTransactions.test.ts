import { CreateTransactionUseCase } from "../../app/useCases/createTransactionUseCase"
import { ListTransactionUseCase } from "../../app/useCases/listTransactionUseCase"
import { MemoryRepositoryFactory } from "../../factories/MemoryRepositoryFactory"

let memoryRepositoryFactory: MemoryRepositoryFactory

let createTransaction: CreateTransactionUseCase
let listTransactions: ListTransactionUseCase

describe("ListTransactions", () => {
  beforeEach(() => {
    memoryRepositoryFactory = new MemoryRepositoryFactory()
    let transactionRepository = memoryRepositoryFactory.createTransactionRepository()
    createTransaction = new CreateTransactionUseCase(transactionRepository)
    listTransactions = new ListTransactionUseCase(transactionRepository)
  })
  test("should be able to list all transactions", async () => {
    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 273.99,
      type: "income",
    })

    const transactions = await listTransactions.execute()
    expect(transactions.rows).toHaveLength(1)
    expect(transactions.page).toBe(1)
    expect(transactions.totalPages).toBe(1)
    expect(transactions.rows[0].title).toBe("Conta de luz")
  })

  test("should be able to list all transactions with pagination", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de agua da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Conta de luz da casa",
      amount: 1270.57,
      type: "income",
    })

    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 220.99,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 2)
    expect(transactions.rows).toHaveLength(2)
    expect(transactions.page).toBe(1)
    expect(transactions.totalPages).toBe(2)
  })

  test("should be able to list all transactions with pagination and filters", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1270.57,
      type: "income",
    })

    const { uid } = await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 220.99,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["title", "=", "Conta de luz"]])
    expect(transactions.rows).toHaveLength(1)
    expect(transactions.rows[0].uid).toBe(uid)
    expect(transactions.page).toBe(1)
    expect(transactions.totalPages).toBe(1)
  })

  test("should not be able to list all transactions with more than 100 results per page", async () => {
    await expect(listTransactions.execute(1, 101, [["title", "=", "Conta de luz"]])).rejects.toThrow("Maximum results per page is 100")
  })

  test("should list transactions only amounts lt 1000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })
    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["amount", "<", 1000]])
    expect(transactions.rows).toHaveLength(1)
  })

  test("should list transactions only amounts lte 1000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })
    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["amount", "<=", 1000]])
    expect(transactions.rows).toHaveLength(2)
  })

  test("should list transactions only amounts gt 1000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["amount", ">", 1000]])
    expect(transactions.rows).toHaveLength(1)
  })

  test("should list transactions only amounts gte 1000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["amount", ">=", 1000]])
    expect(transactions.rows).toHaveLength(2)
  })

  test("should list transactions only amounts between 1000 and 2000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1999,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 2001,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [
      ["amount", ">=", 1000],
      ["amount", "<=", 2000],
    ])

    expect(transactions.rows).toHaveLength(3)
    expect(transactions.rows[0].amount).toBe(1000)
    expect(transactions.rows[1].amount).toBe(1000.01)
    expect(transactions.rows[2].amount).toBe(1999)
  })

  test("should list transactions only amounts gte 1000", async () => {
    await createTransaction.execute({
      title: "Conta de água",
      description: "Conta de água da casa",
      amount: 100,
      type: "income",
    })

    await createTransaction.execute({
      title: "Conta de luz",
      description: "Conta de luz da casa",
      amount: 1000,
      type: "income",
    })

    await createTransaction.execute({
      title: "Fatura do cartão",
      description: "Fatura do cartão",
      amount: 1000.01,
      type: "income",
    })

    const transactions = await listTransactions.execute(1, 15, [["amount", "!=", 1000]])
    expect(transactions.rows).toHaveLength(2)
  })

  test("should throw an error if operator is invalid", async () => {
    // @ts-ignore-next-line
    await expect(listTransactions.execute(1, 15, [["amount", "x", 1000]])).rejects.toThrow("Invalid operator")
  })
})
