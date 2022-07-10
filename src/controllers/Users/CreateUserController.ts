import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import { Prisma } from '@prisma/client';
import generateHash from '../../utils/generateHash';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    try {
      const newUser = await prismaClient.user.create({
        data: {
          name,
          email,
          password: generateHash(password)
        }
      });

      return response.status(201).json(newUser);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return response.status(401).json({ message: 'Este email já está cadastrado no sistema' })
        }
      }
    }
  }
}