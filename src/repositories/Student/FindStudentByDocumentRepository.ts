import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import { IFindStudentByDocumentRepository } from "../../domain/interface/repositories/Student/IFindStudentByDocumentRepository";
import { ICreateStudentResponse } from "../../domain/requestDto";

export class FindStudentByDocumentRepository
  implements IFindStudentByDocumentRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async findByDocument(
    document: string
  ): Promise<ICreateStudentResponse | null> {
    const student = await this.prismaClient.student.findUnique({
      where: {
        document,
      },
    });
    return student;
  }
}
