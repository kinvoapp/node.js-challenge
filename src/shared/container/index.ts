import { container } from "tsyringe"
import { TransactionsRepository } from "../../modules/transactions/repositories/TransactionsRepository"
import { IUsersRepository } from "../../modules/users/models/IUsersRepository"
import { UsersRepository } from "../../modules/users/repositories/UsersRepository"
import { UsersTokenRepository } from "../../modules/users/repositories/UsersTokenRepository"


container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<UsersTokenRepository>('UsersTokenRepository', UsersTokenRepository)
container.registerSingleton<TransactionsRepository>('TransactionsRepository', TransactionsRepository)