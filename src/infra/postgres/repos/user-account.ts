import { getRepository } from 'typeorm'
import { User } from '@/infra/postgres/entities'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'

type Input = LoadUserAccountRepository.Input
type Output = LoadUserAccountRepository.Output

export class PgUserAccountRepository implements LoadUserAccountRepository {
  async load ({ email }: Input): Promise<Output> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email })
    return pgUser !== undefined ? { id: pgUser.id.toString(), name: pgUser.name, email: pgUser.email } : undefined
  }
}
