import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { app } from "../../../../shared/infra/http/app";
import createConnection from "../../../../shared/infra/typeorm";
import { Statement } from "../../infra/typeorm/entities/Statement";

const dateProvider = new DayjsDateProvider();

let connection: Connection;

describe("Create Statement", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const mockDataQt = 10;

    const incomeTags = [
      "Dividendos",
      "Venda",
      "Trabalho",
      "Salário",
      "Extra",
      "Freelance",
    ];

    const ids = [];
    const amounts = [];
    const types = [];
    const dates = [];
    const descriptions = [];

    for (let i = 0; i < mockDataQt; i += 1) {
      ids.push(uuidv4());

      amounts.push(50);

      types.push("income");

      const test = Math.floor(Math.random() * 7);
      const randomDays = Math.floor(Math.random() * 3 + 1);
      if (test === 0) {
        dates.push(dateProvider.dateNowInUTC());
      } else if (test % 2 === 0) {
        dates.push(
          dateProvider.manipulateDaysInUTC({ days: randomDays, type: "add" })
        );
      } else {
        dates.push(
          dateProvider.manipulateDaysInUTC({
            days: randomDays,
            type: "subtract",
          })
        );
      }

      descriptions.push(
        incomeTags[Math.floor(Math.random() * incomeTags.length)]
      );
    }

    await Promise.all(
      ids.map(async (id, index) => {
        await connection.query(
          `INSERT INTO STATEMENTS(id, amount, description, type, created_at, updated_at) values('${id}', ${amounts[index]}, '${descriptions[index]}', '${types[index]}', '${dates[index]}', '${dates[index]}')`
        );
      })
    );
  });
  afterAll(async () => {
    await connection.query(`TRUNCATE TABLE STATEMENTS`);
    await connection.dropDatabase();
    await connection.close();
  });
  it("Should be able to Get all existing Statements from a certain date", async () => {
    const response = await request(app).get(
      `/api/v1/statements?date=2022-07-10T15%3A33&by=start_date&itensPerPageType=0&pageNumber=1`
    );

    const statements: Statement[] = JSON.parse(response.body);

    statements.every(
      (statement) => statement.created_at >= dateProvider.dateNowInUTC()
    );
  });
});
