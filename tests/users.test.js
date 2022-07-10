const frisby = require("frisby");

const {
  createTestFunction,
  deleteTestFunction,
} = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

describe("Users tests.", () => {
  it("It should not be possible to register a user with an email already registered.", async () => {
    await createTestFunction(
      frisby,
      URL_Deploy,
      "user",
      {
        id: 1,
        name: "Aluno - Cadastro",
        email: "alunojacadastrado@gmail.com",
        password: "alunojacadastrado",
      },
      201
    );

    const response = await createTestFunction(
      frisby,
      URL_Deploy,
      "user",
      {
        id: 1,
        name: "Aluno - Cadastro",
        email: "alunojacadastrado@gmail.com",
        password: "alunojacadastrado",
      },
      401
    );

    expect(response).toEqual("E-mail already registered.");

    const deleted = await deleteTestFunction(
      frisby,
      URL_Deploy,
      "user",
      1,
      200
    );

    expect(deleted).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
  });

  it("It must be possible to enter a user.", async () => {
    await createTestFunction(
      frisby,
      URL_Deploy,
      "user",
      {
        id: 1,
        name: "Aluno",
        email: "aluno@gmail.com",
        password: "alunopassword",
      },
      201
    );
  });

  it("It should be possible to list all users.", async () => {
    await frisby.get(`${URL_Deploy}/user`).expect("status", 200);
  });

  it("It must be possible to search for a user by ID.", async () => {
    await frisby.get(`${URL_Deploy}/user/1`).expect("status", 200);
  });

  it("It must be possible to update data for a user.", async () => {
    await frisby
      .put(`${URL_Deploy}/user/1`, {
        name: "Adriano Xavier",
        email: "aluno@gmail.com",
        password: "alunopassword",
      })
      .expect("status", 200);
  });

  it("It must be possible to delete a user by ID.", async () => {
    await createTestFunction(
      frisby,
      URL_Deploy,
      "user",
      {
        id: 1,
        name: "Aluno a ser excluído",
        email: "alunoaserdeletado@gmail.com",
        password: "alunoaserdeletado",
      },
      201
    );

    const deleted = await deleteTestFunction(
      frisby,
      URL_Deploy,
      "user",
      1,
      200
    );

    expect(deleted).toEqual({
      acknowledged: true,
      deletedCount: 1,
    });
  });
});
