const frisby = require("frisby");
require("dotenv").config();

const URL_Deploy = "";

describe("Deploy verify.", () => {
  it("Must return application title in root route.", async () => {
    await frisby
      .get(URL_Deploy)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;

        expect({ APP: "Cada centavo" }).toEqual(JSON.parse(body));
      });
  });
});
