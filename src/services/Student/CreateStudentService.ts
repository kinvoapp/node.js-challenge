import { hash } from "bcryptjs";
import { InvalidArgument } from "../../domain/error";
import { ICreateStudentRepository } from "../../domain/interface/repositories/Student/ICreateStudentRepository";
import { IFindStudentByDocumentRepository } from "../../domain/interface/repositories/Student/IFindStudentByDocumentRepository";
import { ICreateStudentRequest } from "../../domain/requestDto";

export class CreateStudentService {
  private createStudentRepository: ICreateStudentRepository;
  private findStudentByDocumentRepository: IFindStudentByDocumentRepository;

  constructor(
    createStudentRepository: ICreateStudentRepository,
    findStudentByDocumentRepository: IFindStudentByDocumentRepository
  ) {
    this.createStudentRepository = createStudentRepository;
    this.findStudentByDocumentRepository = findStudentByDocumentRepository;
  }

  async execute(data: ICreateStudentRequest) {
    const studentExists =
      await this.findStudentByDocumentRepository.findByDocument(data.document);
    if (studentExists) {
      throw new InvalidArgument("User has already been registered.");
    }
    const passwordHash = await hash(data.password, 10);
    const student = await this.createStudentRepository.createStudent({
      ...data,
      password: passwordHash,
    });
    return student;
  }
}
