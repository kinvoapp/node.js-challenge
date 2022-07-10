import supertest from "supertest"
import { app } from "../../infra/app"

const apiKinvo = supertest(app)

describe("ListTransactions", () => {
  beforeAll(async () => {
    await apiKinvo.post(`/transactions`).send({ title: "Salário", amount: 2890, date: "2022-01-02", type: "income" })
    await apiKinvo.post(`/transactions`).send({ title: "Fatura da Kinvo", amount: 19.9, date: "2022-01-06", type: "expense" })
    await apiKinvo.post(`/transactions`).send({ title: "Conta de luz", amount: 120.89, date: "2022-01-08", type: "expense" })
    await apiKinvo.post(`/transactions`).send({ title: "Conta de água", amount: 57.78, date: "2022-01-08", type: "expense" })
    await apiKinvo.post(`/transactions`).send({ title: "Conta de internet", amount: 89.9, date: "2022-01-10", type: "expense" })
  })
  it("GET 200: should be able to list a transaction", async () => {
    const response = await apiKinvo.get(`/transactions`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(5)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(1)
  })
  it("GET 200: should be able to list a transaction with pagination", async () => {
    const response = await apiKinvo.get(`/transactions?page=2&perPage=2`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(2)
    expect(response.body.page).toBe(2)
    expect(response.body.totalPages).toBe(3)
  })
  it("GET 200: should be able to list a transaction with filters", async () => {
    const response = await apiKinvo.get(`/transactions?query=(type=expense)`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(4)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(1)
  })

  it("GET 200: should be able to list a transaction with more than 1 filter", async () => {
    const response = await apiKinvo.get(`/transactions?query=(type=expense;amount>100)`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(1)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(1)
    expect(response.body.rows[0].title).toBe("Conta de luz")
  })

  it("GET 200: should be able to list a transaction with same filter 2 times", async () => {
    const response = await apiKinvo.get(`/transactions?query=(type=expense;amount<100;amount>50)`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(2)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(1)
  })

  it("GET 200: should be able to list a transaction with filter and page params", async () => {
    const response = await apiKinvo.get(`/transactions?page=1&perPage=1&query=(type=expense;amount<100;amount>50)`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(1)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(2)
  })

  it("GET 200: should be able to list a transaction with date filter", async () => {
    const response = await apiKinvo.get(`/transactions?query=(date>=2022-01-01;date<=2022-01-06)`)
    expect(response.status).toBe(200)
    expect(response.body.rows).toHaveLength(2)
    expect(response.body.page).toBe(1)
    expect(response.body.totalPages).toBe(1)
  })

  it("GET 400: should throw an error if a invalid field was provided", async () => {
    const response = await apiKinvo.get(`/transactions?query=(invalid=true)`)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Invalid query param provided, valid fields are: title, description, amount, type, date")
  })
})
