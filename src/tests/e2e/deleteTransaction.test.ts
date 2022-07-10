import supertest from "supertest"
import { app } from "../../infra/app"

const apiKinvo = supertest(app)

describe("DeleteTransaction", () => {
  it("DELETE 200: should be able to delete a transaction", async () => {
    const transaction = await apiKinvo.post(`/transactions`).send({
      title: "Fatura anual da Kinvo",
      amount: 100,
      type: "expense",
    })
    const response = await apiKinvo.delete(`/transactions/${transaction.body.uid}`)
    expect(response.status).toBe(200)
  })

  it("DELETE 404: should not be able to get a transaction if it not exists", async () => {
    const response = await apiKinvo.delete("/transactions/1")
    expect(response.status).toBe(404)
    expect(response.body.message).toBe("Transaction was not found")
  })
})
