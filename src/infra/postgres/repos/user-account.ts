import { getRepository } from 'typeorm'
import { User } from '@/infra/postgres/entities'

type Input = { email: string }
type Output = undefined | {
  id: number
  name: string
  email: string
  password: string
}

export class PgUserAccountRepository {
  async load ({ email }: Input): Promise<Output> {
    const pgUserRepo = getRepository(User)
    const pgUser = await pgUserRepo.findOne({ email })
    return pgUser !== undefined ? pgUser : undefined
  }
}
