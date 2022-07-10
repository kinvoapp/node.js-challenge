import { createStudent } from "../../helpers/helper";
import { mockICreateUserRequest } from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to authenticate a student", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const response = await superAppRequest
      .post("/login/student")
      .send(loginRequest);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it("should fail if credentials don't match", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "fail",
    };

    const response = await superAppRequest
      .post("/login/student")
      .send(loginRequest);
    expect(response.status).toBe(400);
  });
});
