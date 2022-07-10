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
    const response1 = await loggingIn(
      frisby,
      URL_Deploy,
      {
        password: "123456",
      },
      400
    );

    expect(response1).toEqual({ message: '"email" is required' });

    const response2 = await loggingIn(
      frisby,
      URL_Deploy,
      {
        email: "alunoemail.com",
        password: "123456",
      },
      400
    );

    expect(response2).toEqual({ message: '"email" must be a valid email' });
  });

  it("It should not be possible to log in without the password or with the wrong password.", async () => {
    const response1 = await loggingIn(
      frisby,
      URL_Deploy,
      {
        email: "aluno@email.com",
      },
      400
    );

    expect(response1).toEqual({ message: '"password" is required' });

    const response2 = await loggingIn(
      frisby,
      URL_Deploy,
      {
        email: "aluno@email.com",
        password: "12345",
      },
      400
    );

    expect(response2).toEqual({
      message: '"password" length must be at least 6 characters long',
    });
  });

  it("It should not be possible to log in without being registered.", async () => {
    const response1 = await loggingIn(
      frisby,
      URL_Deploy,
      {
        email: "noregister@email.com",
        password: "noregister",
      },
      400
    );

    expect(response1).toEqual({ message: "User no register" });
  });

  it("It should be possible to log in and get a token.", async () => {
    await createUser(
      frisby,
      URL_Deploy,
      {
        name: "Aluno Teste",
        email: "novoalunoteste@email.com",
        password: "novoalunoteste",
      },
      201
    );

    const response = await loggingIn(
      frisby,
      URL_Deploy,
      {
        email: "novoalunoteste@email.com",
        password: "novoalunoteste",
      },
      200
    );

    expect(response).not.toContain({ message: "User no register" });
  });
});
