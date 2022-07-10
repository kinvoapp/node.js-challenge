import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/domain/contracts/repos'
import { User } from '@/infra/postgres/entities'
import { getRepository } from 'typeorm'
export class PgUserAccountRepository implements LoadUserAccountRepository, SaveUserAccountRepository {
  async load ({ email }: LoadUserAccountRepository.Input): Promise<LoadUserAccountRepository.Output> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email })
    return pgUser !== undefined ? { id: pgUser.id.toString(), name: pgUser.name, email: pgUser.email, password: pgUser.password } : undefined
  }

  async save ({ name, email, password }: SaveUserAccountRepository.Input): Promise<SaveUserAccountRepository.Output> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.save({ name, email, password })
    return { id: pgUser.id.toString(), name: pgUser.name, email: pgUser.email }
  }
}
