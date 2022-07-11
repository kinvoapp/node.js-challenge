import { BankAccount, User } from '@/infra/postgres/entities'
import { PgBankAccountRepository } from '@/infra/postgres/repos'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'

describe('PgBankAccountRepository', () => {
  let sut: PgBankAccountRepository
  let backup: IBackup
  let pgBancAccoutRepo: Repository<BankAccount>
  let pgUserRepo: Repository<User>
  let user: User

  beforeAll(async () => {
    const db = await makeFakeDb()
    backup = db.backup()
    pgBancAccoutRepo = getRepository(BankAccount)
    pgUserRepo = getRepository(User)
  })

  beforeEach(async () => {
    backup.restore()
    sut = new PgBankAccountRepository()
    user = await pgUserRepo.save({ name: 'any_name', email: 'any_existing_email', password: 'any_password' })
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('add', () => {
    it('should return an banck account finantial incomes', async () => {
      const userAccount = await pgBancAccoutRepo.save({ type: 'any_type', value: 1000, description: 'any_des', user_id: user.id })
      const bankAccount = await sut.add({ type: 'any_type', value: 1000, description: 'any_desc', user_id: userAccount.id })
      expect(bankAccount?.id).toBe('2')
    })
  })

  describe('load', () => {
    it('should return an account if email exists', async () => {
      const userAccount = await pgBancAccoutRepo.save({ type: 'any_type', value: 1000, description: 'any_des', user_id: user.id })
      const account = await sut.load({ userId: user.id })
      expect(account?.id).toEqual(1)
    })

    it('should return  undefined if user does not exists', async () => {
      const account = await sut.load({ userId: 2 })
      expect(account?.id).toBeUndefined()
    })
  })

  describe('loadByType', () => {
    it('should return bank  account if exists', async () => {
      await pgBancAccoutRepo.save({ type: 'any_type', value: 1000, description: 'any_des', user_id: user.id })
      const account = await sut.loadByType({ type: 'any_type' })

      expect(account?.id).toEqual(1)
    })

    it('should return  undefined if email does not exists', async () => {
      const account = await sut.loadByType({ type: 'annn' })
      expect(account?.id).toBeUndefined()
    })
  })

  describe('update', () => {
    it('should return bank  account if exists', async () => {
      await pgBancAccoutRepo.save({ type: 'any_type', value: 1000, description: 'any_des', user_id: user.id })
      const account = await sut.update({ id: 1, type: 'any_type_novo', value: 1000, description: 'any_desniveo' })
      expect(account).toEqual({ message: 'updated' })
    })
  })
})
