import frisby from "frisby";
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Deploy verify.", () => {
  it("Must return application title in root route.", async () => {
    await frisby
      .get(URL_Deploy)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;

        expect({ app: "Cada centavo" }).toEqual(JSON.parse(body));
      });
  });
});
