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
  it("Should be able to Delete an existing Statement", async () => {
    const response = await request(app).post(`/api/v1/statements/income`).send({
      amount: 400.0,
      description: "Test",
    });

    await request(app).delete(`/api/v1/statements/${response.body.id}`);

    const deletedStatement = await request(app).get(
      `/api/v1/statements/${response.body.id}`
    );

    expect(deletedStatement.body).toEqual({});
  });
  it("Should not be able to Delete a nonexisting Statement", async () => {
    const idForTest = uuidv4();

    const deleteResponse = await request(app).delete(
      `/api/v1/statements/${idForTest}`
    );

    const statementNotFound = new StatementDoesNotExists();

    expect(deleteResponse.status).toEqual(404);
    expect(deleteResponse.text).toEqual(
      JSON.stringify({ message: statementNotFound.message })
    );
  });
});
