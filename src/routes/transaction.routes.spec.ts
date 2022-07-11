import request from "supertest";
import app from "../app";
import { AppDataSource } from "../infra/database/typeorm.connection";
import { transactionHistoryRepository } from "../repositories/transactionHistory.repository";

describe("Transaction Route", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  describe("Create Transaction", () => {
    it("should return a error if entry field was not provided", async () => {
      const dto = {};

      const response = await request(app).post("/transactions").send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Entry field was not provided!");
    });

    it("should return a error if entry field is not a number", async () => {
      const dto = {
        entry: "string",
      };

      const response = await request(app).post("/transactions").send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Entry field should be number!");
    });

    it("should create transaction", async () => {
      const dto = {
        entry: 100,
      };

      const response = await request(app).post("/transactions").send(dto);

      expect(response.status).toBe(200);
      expect(response.body.entry).toBe(100);
    });
  });

  describe("Update Transaction", () => {
    it("should return a error if DTO was bad format", async () => {
      const dto = {};

      const response = await request(app)
        .put("/transactions/some-id")
        .send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Entry field was not provided!");
    });

    it("should return a error if entry field is not a number", async () => {
      const dto = {
        entry: "string",
      };

      const response = await request(app)
        .put("/transactions/some-id")
        .send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Entry field should be number!");
    });

    it("should return a error if id param is not a number", async () => {
      const dto = {
        entry: 123,
      };

      const response = await request(app)
        .put("/transactions/not-a-number")
        .send(dto);

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Id param should be number!");
    });

    it("should return a error if Transaction was not found", async () => {
      const dto = {
        entry: 100,
      };

      const response = await request(app).put("/transactions/0").send(dto);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Transaction was not found");
    });

    it("should edit transaction", async () => {
      const transaction = transactionHistoryRepository.create({
        entry: 150,
      });

      await transactionHistoryRepository.save(transaction);

      const dto = {
        entry: 100,
      };

      const response = await request(app)
        .put(`/transactions/${transaction.id}`)
        .send(dto);

      expect(response.status).toBe(201);
      expect(response.body.entry).toBe(100);
    });
  });

  fdescribe("Delete Transaction", () => {
    it("should return a error if id param is not a number", async () => {
      const response = await request(app).delete("/transactions/not-a-number");

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Id param should be number!");
    });

    it("should return a error if Transaction was not found", async () => {
      const response = await request(app).delete("/transactions/0");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Transaction was not found");
    });

    it("should delete transaction", async () => {
      const newTransaction = transactionHistoryRepository.create({
        entry: 150,
      });

      await transactionHistoryRepository.save(newTransaction);

      await request(app).delete(`/transactions/${newTransaction.id}`);

      const transaction = await transactionHistoryRepository.findOneBy({
        id: newTransaction.id,
      });

      expect(transaction).toBeNull();
    });
  });
});
