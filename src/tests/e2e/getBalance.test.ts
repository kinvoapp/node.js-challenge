import { app } from "../../infra/app"
import supertest from "supertest"
const apiKinvo = supertest(app)

describe("GetBalance", () => {
  it("should be able to get the balance", async () => {
    const response = await apiKinvo.get("/balance")
    expect(response.status).toBe(200)
  })
})
