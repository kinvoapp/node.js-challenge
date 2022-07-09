import { faker } from "@faker-js/faker";
import { Student } from "@prisma/client";
import { v4 as uuid } from "uuid";
import { ICreateStudentResponse } from "../domain/requestDto";

export function studentMock(): ICreateStudentResponse {
  const student: ICreateStudentResponse = {
    id: uuid(),
    name: faker.name.findName(),
    document: faker.random.numeric(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return student;
}
