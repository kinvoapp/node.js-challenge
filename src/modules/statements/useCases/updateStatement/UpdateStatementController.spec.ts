import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import { StatementDoesNotExists } from "../errors/StatementDoesNotExists";

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
  it("Should be able to update an existing Statement", async () => {
    const createdStatementResponse = await request(app)
      .post(`/api/v1/statements/income`)
      .send({
        amount: 9000.0,
        description: "Test",
      });

    const response = await request(app)
      .put(`/api/v1/statements/${createdStatementResponse.body.id}`)
      .send({
        amount: 5000.0,
        description: "Test updated",
        type: "expense",
      });

    expect(response.body.amount).toEqual(5000);
    expect(response.body.description).toEqual("Test updated");
    expect(response.body.type).toEqual("expense");
  });
  it("Should not be able to update a nonexisting Statement", async () => {
    const idForTest = uuidv4();

    const response = await request(app)
      .put(`/api/v1/statements/${idForTest}`)
      .send({
        amount: 5000.0,
        description: "Test updated",
        type: "expense",
      });

    const statementNotFound = new StatementDoesNotExists();

    expect(response.status).toEqual(404);
    expect(response.text).toEqual(
      JSON.stringify({ message: statementNotFound.message })
    );
  });
});
