import { ICreateStudentResponse } from "../../../requestDto";

export interface IFindStudentByDocumentRepository {
  findByDocument(name: string): Promise<ICreateStudentResponse | null>;
}
