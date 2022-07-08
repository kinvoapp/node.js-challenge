import { PrismaClient } from "@prisma/client";
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
    const student = await this.prismaClient.student.create({
      data: {
        ...data,
      },
      select: {
        id: true,
        name: true,
        document: true,
        created_at: true,
        updated_at: true,
      },
    });
    return student;
  }
}
