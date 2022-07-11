import { IAuthenticateStudentRequest } from "../../../requestDto";

export interface IAuthenticateStudentService {
  execute({ document, password }: IAuthenticateStudentRequest): Promise<string>;
}
