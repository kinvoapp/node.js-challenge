import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../../src/domain/requestDto";
import { superAppRequest } from "../setup";

export async function createStudent(body: ICreateStudentRequest) {
  const createStudentResponse = await superAppRequest
    .post("/student")
    .send(body);
  const createStudentResponseBody =
    createStudentResponse.body as ICreateStudentResponse;
  return createStudentResponseBody;
}
