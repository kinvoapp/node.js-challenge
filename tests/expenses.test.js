const frisby = require("frisby");

const {
  createTestFunction,
  getTestFunction,
  deleteTestFunction,
} = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Expenses tests.", () => {
  it("it should not be possible to add a expencie without the title.", async () => {
    const date = new Date("01/07/2022");

    const created = await createTestFunction(
      frisby,
      URL_Deploy,
      "expense",
      {
        id: 1,
        title: "Salário",
        value: 2000,
        date: "01/07/2022",
      },
      201
    );

    expect(created).toEqual({
      id: 1,
      title: "Salário",
      value: 2000,
      date: `${date.getFullYear()}-0${
        date.getMonth() + 1
      }-0${date.getDate()}T03:00:00.000Z`,
    });
  });

  it("It should be possible to list expenses.", async () => {
    await getTestFunction(frisby, URL_Deploy, "expense", null, 200);
  });

  it("It should be possible to search for a recipe by id.", async () => {
    await getTestFunction(frisby, URL_Deploy, "expense", 1, 200);
  });

  it("It should be possible to search for expenses between dates.", async () => {
    for (let i = 1; i <= 4; i++) {
      await createTestFunction(
        frisby,
        URL_Deploy,
        "expense",
        {
          title: `Salário test ${i}`,
          value: i * 1000,
          date: `0${i}/07/2022`,
        },
        201
      );
    }

    const expenses = await frisby
      .post(`${URL_Deploy}/search-expenses`, {
        initialDate: "02/07/2022",
        finalDate: "03/07/2022",
      })
      .expect("status", 200)
      .then((response) => {
        const { body } = response;

        return JSON.parse(body);
      });
    console.log(expenses);
    expect(expenses[0].date).toEqual("2022-02-07T03:00:00.000Z");
    expect(expenses[1].date).toEqual("2022-03-07T03:00:00.000Z");
  });

  it("It must be possible to update data for a user.", async () => {
    await frisby
      .put(`${URL_Deploy}/expense/15`, {
        title: "Novo salário",
        value: 3000,
        date: "04/07/2022",
      })
      .expect("status", 200);
  });

  it.only("It must be possible to delete a expense by ID.", async () => {
    await createTestFunction(
      frisby,
      URL_Deploy,
      "expense",
      {
        id: 10,
        title: "Salário",
        value: 2000,
        date: "01/07/2022",
      },
      201
    );

    const deleted = await deleteTestFunction(
      frisby,
      URL_Deploy,
      "expense",
      10,
      200
    );

    expect(deleted).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
  });
});
