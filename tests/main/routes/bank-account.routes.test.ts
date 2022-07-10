import { User } from '@/infra/postgres/entities'
import { PgUserAccountRepository } from '@/infra/postgres/repos'
import { IBackup } from 'pg-mem'
import { getConnection, getRepository, Repository } from 'typeorm'
import { makeFakeDb } from '@/tests/infra/postgres/mocks'
import request from 'supertest'
import { app } from '@/main/config/app'

describe('Auhtentication routes', () => {
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

  describe('POST /bankAccount/addFinantialIncome', () => {
    it('should return 204 on add sucess', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)
      const data = await request(app)
        .post('/api/bankAccount/addFinantialIncome')
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc',
          user_id: '1'
        })
        .expect(204)
    })
  })
})
