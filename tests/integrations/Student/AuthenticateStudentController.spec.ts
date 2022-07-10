import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to authenticate a student", async () => {
    const studentRequest = {
      name: "Gustavo Ferreira",
      document: "123456",
      password: "test",
    };

    await superAppRequest.post("/student").send(studentRequest);

    const loginRequest = {
      document: "123456",
      password: "test",
    };

    const response = await superAppRequest
      .post("/login/student")
      .send(loginRequest);
    expect(response.status).toBe(200);
  });
});
