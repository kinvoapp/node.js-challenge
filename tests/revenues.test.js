const frisby = require("frisby");

const {
  createTestFunction,
  getTestFunction,
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

  it("It should be possible to list revenues.", async () => {
    await getTestFunction(frisby, URL_Deploy, "revenue", null, 200);
  });

  it("It should be possible to search for a recipe by id.", async () => {
    await getTestFunction(frisby, URL_Deploy, "revenue", 1, 200);
  });

  it.only("It should be possible to search for revenues between dates.", async () => {
    for (let i = 1; i <= 4; i++) {
      await createTestFunction(
        frisby,
        URL_Deploy,
        "revenue",
        {
          title: `Salário test ${i}`,
          value: i * 1000,
          date: `0${i}/07/2022`,
        },
        201
      );
    }

    const revenues = await frisby
      .post(`${URL_Deploy}/search-revenues`, {
        initialDate: "02/07/2022",
        finalDate: "03/07/2022",
      })
      .expect("status", 200)
      .then((response) => {
        const { body } = response;

        return JSON.parse(body);
      });
    console.log(revenues);
    expect(revenues[0].date).toEqual("2022-02-07T03:00:00.000Z");
    expect(revenues[1].date).toEqual("2022-03-07T03:00:00.000Z");
  });
});
