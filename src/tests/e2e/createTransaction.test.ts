import supertest from "supertest"
import { app } from "../../infra/app"

const apiKinvo = supertest(app)

describe("CreateTransaction", () => {
  it("POST 201: should be able to create a transaction", async () => {
    const response = await apiKinvo.post(`/transactions`).send({
      title: "Fatura anual da Kinvo",
      amount: 100,
      type: "expense",
    })
    expect(response.status).toBe(201)
  })

  it("POST 400: should not be able to create a transaction if title was not provided", async () => {
    const response = await apiKinvo.post("/transactions").send({ amount: 100, type: "expense" })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("You must provide a title")
  })

  it("POST 400: should not be able to create a transaction if amount was not provided", async () => {
    const response = await apiKinvo.post("/transactions").send({ title: "Kinvo", type: "expense" })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Invalid transaction amount, must be a number")
  })

  it("POST 400: should not be able to create a transaction if type was is invalid", async () => {
    const response = await apiKinvo.post("/transactions").send({ title: "Kinvo", amount: 1200, type: "invalid" })
    expect(response.status).toBe(400)
    expect(response.body.message).toBe("Invalid transaction type, must be income or expense")
  })
})
