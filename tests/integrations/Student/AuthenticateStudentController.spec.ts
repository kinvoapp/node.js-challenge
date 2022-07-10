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
  });
});
