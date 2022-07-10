const frisby = require("frisby");

const {
  createTestFunction,
  // deleteTestFunction,
} = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Revenues tests.", () => {
  it("it should not be possible to add a recipe without the title.", async () => {
    const date = new Date("01/07/2022");

    const created = await createTestFunction(
      frisby,
      URL_Deploy,
      "revenue",
      {
        title: "Salário",
        value: 2000,
        date: "01/07/2022",
      },
      201
    );

    expect(created).toEqual({
      title: "Salário",
      value: 2000,
      date: `${date.getFullYear()}-0${
        date.getMonth() + 1
      }-0${date.getDate()}T03:00:00.000Z`,
    });
  });
});
