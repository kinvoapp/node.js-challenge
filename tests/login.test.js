const frisby = require("frisby");

const { createUser, loggingIn } = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Login tests.", () => {
  it("It should not be possible to log in without the email or with the wrong email.", async () => {
    await loggingIn(frisby, URL_Deploy, {
      password: "123456",
    });

    await loggingIn(frisby, URL_Deploy, {
      email: "alunoemail.com",
      password: "123456",
    });
  });

  it("It should not be possible to log in without the password or with the wrong password.", async () => {
    await loggingIn(frisby, URL_Deploy, {
      email: "alunoemail.com",
    });

    await loggingIn(frisby, URL_Deploy, {
      email: "aluno@email.com",
      password: "12345",
    });
  });

  it("It should not be possible to log in without being registered.", async () => {
    await loggingIn(frisby, URL_Deploy, {
      email: "aluno@email.com",
      password: "123456",
    });
  });

  it("It should be possible to log in and get a token.", async () => {
    await createUser(frisby, URL_Deploy, {
      name: "Aluno Teste",
      email: "aluno@email.com",
      password: "123456",
    });

    await loggingIn(frisby, URL_Deploy, {
      email: "aluno@email.com",
      password: "123456",
    });
  });
});
