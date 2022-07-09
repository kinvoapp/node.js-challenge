import { EntityRepository, getRepository, Repository } from "typeorm";
import { UserToken } from "../models/UserToken";

@EntityRepository(UserToken)
class UsersTokenRepository {
  private ormRepository: Repository<UserToken>
  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async create(
    token: string, user_id: string, expires_date: Date
  ): Promise<UserToken> {
    const userToken = this.ormRepository.create({
      token,
      user_id,
      expires_date
    })

    return userToken;
  }
  
  public async save(userToken: UserToken): Promise<UserToken> {
    return await this.ormRepository.save(userToken)
  }

  public async findAll(): Promise<UserToken[]> {
    return await this.ormRepository.find()
  }

} export {UsersTokenRepository}