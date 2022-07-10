import { PrismaClient } from "@prisma/client";
import { prismaClient } from "../../database/prismaClient";
import {
  IFindStudentByDocumentRepository,
  IUserCredentialsWithAccountId,
} from "../../domain/interface/repositories/Student/IFindStudentByDocumentRepository";

export class FindStudentByDocumentRepository
  implements IFindStudentByDocumentRepository
{
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async findByDocument(
    document: string
  ): Promise<IUserCredentialsWithAccountId | null> {
    const student = await this.prismaClient.student.findUnique({
      where: {
        document,
      },
      select: {
        id: true,
        document: true,
        password: true,
        accounts: true,
      },
    });
    if (!student) {
      return null;
    }
    return { ...student, accountId: student.accounts[0].id };
  }
}
