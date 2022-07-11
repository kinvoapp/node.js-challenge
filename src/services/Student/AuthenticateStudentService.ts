import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidArgument } from "../../domain/error";
import { IFindStudentByDocumentRepository } from "../../domain/interface/repositories/Student/IFindStudentByDocumentRepository";
import { IAuthenticateStudentService } from "../../domain/interface/services/Student/IAuthenticateStudentService";
import { IAuthenticateStudentRequest } from "../../domain/requestDto";

export class AuthenticateStudentService implements IAuthenticateStudentService {
  private findStudentByDocumentRepository: IFindStudentByDocumentRepository;

  constructor(
    findStudentByDocumentRepository: IFindStudentByDocumentRepository
  ) {
    this.findStudentByDocumentRepository = findStudentByDocumentRepository;
  }
  async execute({ document, password }: IAuthenticateStudentRequest) {
    const student = await this.findStudentByDocumentRepository.findByDocument(
      document
    );

    if (!student) {
      throw new InvalidArgument("Email/Password incorrect");
    }

    const passwordMatch = await compare(password, student.password);

    if (!passwordMatch) {
      throw new InvalidArgument("Email/Password incorrect");
    }

    const token = sign(
      {
        login: student.document,
        accountId: student.accountId,
      },
      `${process.env.STUDENT_SECRET}`,
      {
        subject: student.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}
