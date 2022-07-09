import {
  ICreateStudentRequest,
  ICreateStudentResponse,
} from "../../domain/requestDto";
import { studentMock } from "../../_mocks/studentMock";
import { ICreateStudentRepository } from "../../domain/interface/repositories/Student/ICreateStudentRepository";
import {
  IFindStudentByDocumentRepository,
  IUserCredentialsWithAccountId,
} from "../../domain/interface/repositories/Student/IFindStudentByDocumentRepository";
import { CreateStudentService } from "./CreateStudentService";
import { faker } from "@faker-js/faker";

describe("Create Student", () => {
  it("Should be able to create a student", async () => {
    const student = studentMock();
    class MockCreateStudentRepository implements ICreateStudentRepository {
      createStudent(
        data: ICreateStudentRequest
      ): Promise<ICreateStudentResponse> {
        return Promise.resolve(student);
      }
    }
    class MockFindStudentByDocumentRepository
      implements IFindStudentByDocumentRepository
    {
      findByDocument(
        document: string
      ): Promise<IUserCredentialsWithAccountId | null> {
        return Promise.resolve(null);
      }
    }
    const createStudentService = new CreateStudentService(
      new MockCreateStudentRepository(),
      new MockFindStudentByDocumentRepository()
    );
    const execute = await createStudentService.execute({
      name: student.name,
      document: student.document,
      password: faker.random.alphaNumeric(),
    });

    expect(execute.document).toBe(student.document);
  });
  it("Should should fail if document is already registered", async () => {
    const student = studentMock();
    class MockCreateStudentRepository implements ICreateStudentRepository {
      createStudent(
        data: ICreateStudentRequest
      ): Promise<ICreateStudentResponse> {
        return Promise.resolve(student);
      }
    }
    class MockFindStudentByDocumentRepository
      implements IFindStudentByDocumentRepository
    {
      findByDocument(
        document: string
      ): Promise<IUserCredentialsWithAccountId | null> {
        return Promise.resolve({
          accountId: student.accountId,
          document: student.document,
          id: student.id,
          password: faker.random.alphaNumeric(),
        });
      }
    }
    const createStudentService = new CreateStudentService(
      new MockCreateStudentRepository(),
      new MockFindStudentByDocumentRepository()
    );
    const execute = createStudentService.execute({
      name: student.name,
      document: student.document,
      password: faker.random.alphaNumeric(),
    });

    await expect(execute).rejects.toThrow("User has already been registered.");
  });
});
