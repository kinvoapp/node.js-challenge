import supertest from "supertest"
import { app } from "../../infra/app"

const apiKinvo = supertest(app)

describe("GetTransaction", () => {
  it("GET 200: should be able to get a transaction", async () => {
    const transaction = await apiKinvo.post(`/transactions`).send({
      title: "Fatura da kinvo",
      amount: 19.9,
      type: "expense",
    })
    const response = await apiKinvo.get(`/transactions/${transaction.body.uid}`)
    expect(response.status).toBe(200)
  })

  it("GET 404: should not be able to get a transaction if it not exists", async () => {
    const response = await apiKinvo.get("/transactions/1")
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Transaction was not found")
  })
})
