const frisby = require("frisby");

const { createUser } = require("../src/utils/tests.functions");

require("dotenv").config();

const { PORT, HOST } = process.env;

const URL_Deploy =
  process.env.DEVELOPMENT === "true"
    ? `http://${HOST}:${PORT}`
    : "https://node-challenge-backend.herokuapp.com/";

// const createUser = async () =>
//   await frisby
//     .post(`${URL_Deploy}/user`, {
//       id: 1,
//       name: "Aluno",
//       email: "aluno@gmail.com",
//       password: "alunopassword",
//     })
//     .expect("status", 201);

describe("Users tests.", () => {
  it("It must be possible to enter a user.", async () => {
    await createUser(frisby, URL_Deploy, {
      id: 1,
      name: "Aluno",
      email: "aluno@gmail.com",
      password: "alunopassword",
    });
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

  it("It must be possible to search for a user by ID.", async () => {
    await createUser();

    await frisby
      .delete(`${URL_Deploy}/user/1`)
      .expect("status", 200)
      .then((response) => {
        const { body } = response;
        console.log(body);
        expect({
          acknowledged: true,
          deletedCount: 1,
        }).toEqual(JSON.parse(body));
      });
  });
});
