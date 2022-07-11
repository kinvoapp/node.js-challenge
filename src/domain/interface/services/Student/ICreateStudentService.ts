import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../../../requestDto";

export interface ICreateStudentService {
  execute(data: ICreateStudentRequest): Promise<ICreateStudentResponse>;
}
