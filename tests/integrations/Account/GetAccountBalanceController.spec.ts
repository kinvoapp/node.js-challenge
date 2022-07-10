import { authenticateStudent, createStudent } from "../../helpers/helper";
import { mockICreateUserRequest } from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to get account balance", async () => {
    const studentRequest = mockICreateUserRequest();

    const createUserResponse = await createStudent(studentRequest);

    const loginRequest = {
      document: createUserResponse.document,
      password: "admin",
    };

    const token = await authenticateStudent(loginRequest);

    const response = await superAppRequest
      .get("/balance")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.available).toBe(0);
  });
});
