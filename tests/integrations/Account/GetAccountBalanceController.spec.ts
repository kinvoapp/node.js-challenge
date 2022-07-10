import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to get account balance", async () => {
    const studentRequest = {
      name: "Gustavo Ferreira",
      document: "12345678",
      password: "test",
    };

    await superAppRequest.post("/student").send(studentRequest);

    const loginRequest = {
      document: "12345678",
      password: "test",
    };

    const token = await superAppRequest
      .post("/login/student")
      .send(loginRequest);

    const response = await superAppRequest
      .get("/balance")
      .set("Authorization", `Bearer ${token.body.token}`);

    expect(response.status).toBe(200);
    expect(response.body.available).toBe(0);
  });
});
