const frisby = require("frisby");
require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Users tests.", () => {
  it("It must be possible to enter a user.", async () => {
    await frisby
      .post(`${URL_Deploy}/user`, {
        name: "Neto Noronha",
        email: "aluno@gmail.com",
        password: "alunopassword",
      })
      .expect("status", 201);
  });
});
