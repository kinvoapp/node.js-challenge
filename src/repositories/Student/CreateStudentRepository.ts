import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { prismaClient } from "../../database/prismaClient";
import { ICreateStudentRepository } from "../../domain/interface/repositories/Student/ICreateStudentRepository";
import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../../domain/requestDto";

export class CreateStudentRepository implements ICreateStudentRepository {
  private prismaClient: PrismaClient;
  constructor() {
    this.prismaClient = prismaClient;
  }

  async createStudent(
    data: ICreateStudentRequest
  ): Promise<ICreateStudentResponse> {
    const accountId = randomUUID();
    const student = await this.prismaClient.student.create({
      data: {
        ...data,
        accounts: {
          create: {
            id: accountId,
            balance: {
              create: {
                id: randomUUID(),
                available: 0,
              },
            },
          },
        },
      },
      select: {
        id: true,
        name: true,
        document: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { ...student };
  }
}
