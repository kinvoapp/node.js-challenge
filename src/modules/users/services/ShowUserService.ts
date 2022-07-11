import { inject, injectable } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import {hash} from 'bcryptjs'
import { IUsersRepository } from "../models/IUsersRepository";
import { User } from "../models/User";


@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository
  ){}
  
  public async execute(id: string): Promise<User> {

    const user = await this.usersRepository.findById(id)


    if (!user) {
      throw Error();
    }

    return user

  }
} export {ShowUserService}