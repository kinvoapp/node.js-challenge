import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to create a new student", async () => {
    const studentRequest = {
      name: "Gustavo Ferreira",
      password: "test",
      document: "123456",
    };

    const response = await superAppRequest
      .post("/student")
      .send(studentRequest);
    expect(response.status).toBe(200);
  });
});
