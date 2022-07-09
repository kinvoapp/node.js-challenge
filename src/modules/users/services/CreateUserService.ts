import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import {hash} from 'bcryptjs'


@injectable()
class CreateUserService {
  constructor(@inject('UsersRepository') private usersRepository: UsersRepository) { }
  
  public async execute(username: string, email: string, password: string) {

    const user = await this.usersRepository.findByEmail(email)

    if (user) {
      throw Error();
    }

    const hashedPassword = await hash(password, 8)

    const newUser = await this.usersRepository.create(username, email, hashedPassword, 0)
    await this.usersRepository.save(newUser)

    return newUser

  }
} export {CreateUserService}