import { faker } from "@faker-js/faker";
import { ICreateStudentRequest } from "../../src/domain/requestDto";

export function mockICreateUserRequest() {
  const studentData: ICreateStudentRequest = {
    name: faker.name.findName(),
    document: faker.random.numeric(),
    password: "admin",
  };
  return studentData;
}
