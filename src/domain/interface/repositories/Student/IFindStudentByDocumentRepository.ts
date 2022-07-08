import { ICreateStudentResponse } from "../../../requestDto";

export interface IFindStudentByDocumentRepository {
  findByDocument(document: string): Promise<ICreateStudentResponse | null>;
}
