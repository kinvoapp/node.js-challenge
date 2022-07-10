import supertest from "supertest"
import { app } from "../../infra/app"

const apiKinvo = supertest(app)

describe("UpdateTransaction", () => {
  it("PUT 204: should be able to update a transaction", async () => {
    const transaction = await apiKinvo.post("/transactions").send({
      title: "Fatura anual da Kinvo",
      amount: 100,
      type: "income",
    })
    const response = await apiKinvo.put(`/transactions/${transaction.body.uid}`).send({ type: "expense" })
    expect(response.status).toBe(204)
  })

  it("PUT 404: should not be able to update a transaction if it not exists", async () => {
    const response = await apiKinvo.put("/transactions/1").send({ type: "expense" })
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Transaction was not found")
  })
})
