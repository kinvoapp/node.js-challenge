import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../users/models/IUsersRepository";
import { TransactionsRepository } from "../repositories/TransactionsRepository";

@injectable()
class UpdateUserBalanceService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('TransactionsRepository') private transactionsRepository: TransactionsRepository
  ) { }
  
  public async execute() {

    
  }
} export {UpdateUserBalanceService}
