import request from "supertest";
import app from "../app";
import { AppDataSource } from "../infra/database/typeorm.connection";

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

    it("should return a error if entry field is no a number", async () => {
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
});
