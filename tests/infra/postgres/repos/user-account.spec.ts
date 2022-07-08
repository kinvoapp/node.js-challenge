import { User } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

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

describe('PgUserAccountRepository', () => {
  let sut: PgUserAccountRepository
  let pgUserRepo: Repository<User>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = getRepository(User)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgUserAccountRepository()
  })

  it('should return an account if email exists', async () => {
    await pgUserRepo.save({ name: 'any_name', email: 'any_existing_email', password: 'any_password' })
    const account = await sut.load({ email: 'any_existing_email' })
    expect(account?.id).toEqual(1)
  })
})
