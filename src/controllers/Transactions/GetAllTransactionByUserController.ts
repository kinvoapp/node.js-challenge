import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetAllUsersController {
  async handle (request: Request, response: Response) {

    const users = await prismaClient.user.findMany();

    return response.status(200).json(users);
  }
}