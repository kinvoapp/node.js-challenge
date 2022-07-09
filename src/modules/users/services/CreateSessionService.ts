import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import dotenv from 'dotenv'
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersTokenRepository } from "../repositories/UsersTokenRepository";
import {addDays} from 'date-fns'
dotenv.config()
@injectable()
class CreateSessionService {
  constructor(
    @inject('UsersRepository') private usersRepository: UsersRepository,
    @inject('UsersTokenRepository') private usersTokensRepository: UsersTokenRepository
  ) { }
    public async execute(email: string, password: string): Promise<any> {
      const user = await this.usersRepository.findByEmail(email)
      
      if (!user) {
        throw Error()
      }

      const passwordMatch = await compare(password, user.password)

      if (!passwordMatch) {
        throw Error()
      }

      const access_token = sign({ email }, process.env.JWT_ACCESS_SECRET, {
        subject: user.id,
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN
      })

      const refresh_token = sign({ email }, process.env.JWT_REFRESH_SECRET, {
        subject: user.id,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN
      })

      const refreshTokenExpiresDate = addDays(Date.now(), 5)

      const newToken = await this.usersTokensRepository.create(refresh_token, user.id, refreshTokenExpiresDate)
      await this.usersTokensRepository.save(newToken)

      return {
        access_token,
        refresh_token
      }

    }
} export {CreateSessionService}