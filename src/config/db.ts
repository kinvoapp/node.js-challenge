import { ConnectionOptions } from "typeorm";
import { Transaction } from "../modules/transactions/model/Transaction";
import { User } from "../modules/users/models/User";
import { UserToken } from "../modules/users/models/UserToken";

let connectionOptions: ConnectionOptions;

connectionOptions = {
  name: 'default',
  type: 'postgres',
  port: 5432,
  synchronize: false,
  logging: false,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'kinvo-project-db',
  entities: [
    User, UserToken, Transaction
  ],
  migrations: [__dirname + '../shared/migrations/*.ts']
}

export default connectionOptions;