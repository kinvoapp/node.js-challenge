import { User } from "./User";


export interface IUsersRepository {
create(
    username: string, email: string, password: string, balance: number
  ): Promise<User>
  save(user: User): Promise<User>
  findAll(): Promise<User[]>
  findByEmail(email: string): Promise<User | undefined> 
  findById(id: string): Promise<User | undefined>
  updateBalance(id: string, balance: number): Promise<any>
}