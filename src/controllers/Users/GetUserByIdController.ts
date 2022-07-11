import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';

export class GetUserByIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const user = await prismaClient.user.findFirst({
      where: {
        id
      }
    });

    if(!user?.id) return response.status(404).json({message: 'User não encontrado'})

    return response.status(200).json(user);
  }
}