import { Request, Response } from "express";
import { IAuthenticateStudentRequest } from "../../domain/requestDto";
import { FindStudentByDocumentRepository } from "../../repositories/Student/FindStudentByDocumentRepository";
import { AuthenticateStudentService } from "../../services/Student/AuthenticateStudentService";

export class AuthenticateStudentController {
  async handle(request: Request, response: Response) {
    const { document, password }: IAuthenticateStudentRequest = request.body;

    const authenticateStudentService = new AuthenticateStudentService(
      new FindStudentByDocumentRepository()
    );
    const tokenJwt = await authenticateStudentService.execute({
      document,
      password,
    });

    const responseJwt = {
      token: tokenJwt,
    };

    return response.json(responseJwt);
  }
}
