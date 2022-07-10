import request from "supertest";
import app from "../app";

import { TransactionsControllers } from "../controllers/Transaction.controller";

const transactionsControllers = new TransactionsControllers();

describe("Transaction Route", () => {
  describe("Create Transaction", () => {
    it("should return a error if entry field was not provided", async () => {
      const dto = {};

      const response = await request(app).post("/transactions").send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Entry field was not provided");
    });
  });
});
