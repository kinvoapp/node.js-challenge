import { createStudent } from "../../helpers/helper";
import { mockICreateUserRequest } from "../../helpers/mock";
import { superAppRequest } from "../../setup";

describe("Create Student Controller", () => {
  it("should be able to create a new student", async () => {
    const studentRequest = mockICreateUserRequest();

    const response = await superAppRequest
      .post("/student")
      .send(studentRequest);
    expect(response.status).toBe(200);
  });
  it("should fail if student is already registered", async () => {
    const studentRequest = mockICreateUserRequest();

    await createStudent(studentRequest);

    const response = await superAppRequest
      .post("/student")
      .send(studentRequest);
    expect(response.status).toBe(400);
  });
});
