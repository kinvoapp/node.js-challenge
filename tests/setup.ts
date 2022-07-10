import { PrismaClient } from "@prisma/client";
import request from "supertest";
import app from "../src/app";
import { config } from "dotenv";

config({ path: ".env.test" });

const prismaClient = new PrismaClient();
beforeAll(() => {
  return prismaClient.$connect();
});

afterAll(() => {
  prismaClient.account.deleteMany();
  prismaClient.balance.deleteMany();
  prismaClient.student.deleteMany();
  prismaClient.transaction.deleteMany();
  return;
});

export const superAppRequest = request(app);
