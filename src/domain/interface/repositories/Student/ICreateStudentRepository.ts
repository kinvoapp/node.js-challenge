import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../../../requestDto";

export interface ICreateStudentRepository {
  createStudent(data: ICreateStudentRequest): Promise<ICreateStudentResponse>;
}
