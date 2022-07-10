import { BankAccount, User } from '@/infra/postgres/entities'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
export class PgBankAccountRepository {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async add ({ type, value, description, user_id }: AddFinantialIncomeRepository.Input): Promise<AddFinantialIncomeRepository.Output> {
    const pgBankAccountRepo = getRepository(BankAccount)
    const pgBankAccount = await pgBankAccountRepo.save({ type, value, description, user_id })
    return { id: pgBankAccount.id.toString(), type: pgBankAccount.type, value: pgBankAccount.value, description: pgBankAccount.description, user_id: pgBankAccount.user_id }
  }
}

describe('PgBankAccountRepository', () => {
  let sut: PgBankAccountRepository
  let backup: IBackup
  let pgUserRepo: Repository<User>

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    pgUserRepo = getRepository(User)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('load', () => {
    beforeEach(() => {
      backup.restore()
      sut = new PgBankAccountRepository()
    })

    it('should return an banck account finantial incomes', async () => {
      const userAccount = await pgUserRepo.save({ name: 'any_name', email: 'any_existing_email', password: 'any_password' })
      const bankAccount = await sut.add({ type: 'any_type', value: 1000, description: 'any_desc', user_id: userAccount.id })
      expect(bankAccount.id).toBe('1')
    })
  })
})
