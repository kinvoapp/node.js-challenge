import request from "supertest";
import { Connection } from "typeorm";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import { InvalidAmount } from "../errors/InvalidAmount";

let connection: Connection;

describe("Create Statement", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();
  });
  afterAll(async () => {
    await connection.query(`TRUNCATE TABLE STATEMENTS`);
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to create a new INCOME Statement", async () => {
    const incomeResponse = await request(app)
      .post(`/api/v1/statements/income`)
      .send({
        amount: 400.0,
        description: "Test",
      });

    expect(incomeResponse.status).toEqual(201);
    expect(incomeResponse.body).toHaveProperty("id");
    expect(incomeResponse.body.type).toEqual("income");
  });
  it("Should be able to create a new EXPENSE Statement", async () => {
    const incomeResponse = await request(app)
      .post(`/api/v1/statements/expense`)
      .send({
        amount: 400.0,
        description: "Test",
      });

    expect(incomeResponse.status).toEqual(201);
    expect(incomeResponse.body).toHaveProperty("id");
    expect(incomeResponse.body.type).toEqual("expense");
  });
  it("Should not be able to create a new Statement with invalid amount", async () => {
    const incomeResponse = await request(app)
      .post(`/api/v1/statements/income`)
      .send({
        amount: 10000.0,
        description: "Test",
      });

    const invalidAmountMessage = new InvalidAmount();

    expect(incomeResponse.status).toEqual(400);
    expect(incomeResponse.text).toEqual(
      JSON.stringify({ message: invalidAmountMessage.message })
    );
  });
});
