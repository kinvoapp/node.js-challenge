const frisby = require("frisby");

const {
  createTestFunction,
  loggingIn,
} = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Balance tests.", () => {
  it("It must be possible to obtain the balance between income and expenses.", async () => {
    await createTestFunction(
      frisby,
      URL_Deploy,
      "revenue",
      {
        id: 1,
        title: "Salário",
        value: 2000,
        date: "01/07/2022",
      },
      201
    );

    await createTestFunction(
      frisby,
      URL_Deploy,
      "expense",
      {
        id: 1,
        title: "Salário",
        value: 1000,
        date: "01/07/2022",
      },
      201
    );

    const response = await frisby
      .get(`${URL_Deploy}/balance`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;

        return JSON.parse(body);
      });

    expect(response).toEqual({ balance: 1000 });
  });
});
