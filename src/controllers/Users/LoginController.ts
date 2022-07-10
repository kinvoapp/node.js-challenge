import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import { prismaClient } from '../../database/prismaClient';
import generateToken from '../../utils/generateToken';

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;
    await prismaClient.user.findFirst({
      where: {
        email
      }
    }).then((user) => {
      compare(password, user!.password, (err, result) => {
        if (err) {
          return response.status(400).json({
            error: err
          })
        } else {
          if (result) {
            return response.status(200).send({
              token: generateToken(user!.id)
            })
          } else {
            return response.status(401).json({
              isCorrect: result,
              message: 'Credenciais inválidas'
            })
          }
        }
      })
    }).catch((err) => {
      return response.status(500).json(err)
    });
  }
}