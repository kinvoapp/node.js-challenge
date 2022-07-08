import { Request, Response } from "express";
import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../domain/requestDto";
import { CreateStudentRepository } from "../repositories/Student/CreateStudentRepository";
import { FindStudentByDocumentRepository } from "../repositories/Student/FindStudentByDocumentRepository";
import { CreateStudentService } from "../services/Student/CreateStudentService";

export class CreateStudentController {
  async handle(request: Request, response: Response) {
    const { name, password, document }: ICreateStudentRequest = request.body;
    const createStudentService = new CreateStudentService(
      new CreateStudentRepository(),
      new FindStudentByDocumentRepository()
    );

    const student: ICreateStudentResponse = await createStudentService.execute({
      name,
      password,
      document,
    });

    return response.json(student);
  }
}
