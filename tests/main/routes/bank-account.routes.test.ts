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
      const accessToken = await request(app)
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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .set('authorization', `Bear ${accessToken.body.accessToken}`)
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc',
          user_id: '1'
        })
        .expect(204)
    })

    it('should return 204 on add sucess', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email_1',
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
        .expect(403)
    })
  })

  describe('PUT /bankAccount/updateFinantialIcomes', () => {
    it('should return 204 on add sucess', async () => {
      const accessToken = await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email_76',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)

      await request(app)
        .post('/api/bankAccount/addFinantialIncome')
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .set('authorization', `Bear ${accessToken.body.accessToken}`)
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc'
        })
        .expect(204)

      await request(app)
        .put('/api/bankAccount/updateFinantialIcomes')
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .set('authorization', `Bear ${accessToken.body.accessToken}`)
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc'
        })
        .expect(204)
    })

    it('should return 204 on add sucess', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email_45',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)
      const data = await request(app)
        .put('/api/bankAccount/updateFinantialIcomes')
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc'
        })
        .expect(403)
    })
  })

  describe('PUT /bankAccount/loadFinantialIcomes', () => {
    it('should return 204 on add sucess', async () => {
      const accessToken = await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email_556',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)

      await request(app)
        .get('/api/bankAccount/loadFinantialIcomes')
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        .set('authorization', `Bear ${accessToken.body.accessToken}`)
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc'
        })
        .expect(200)
    })

    it('should return 204 on add sucess', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email_455e5',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)
      const data = await request(app)
        .get('/api/bankAccount/loadFinantialIcomes')
        .send({
          type: 'any_type',
          value: 1000,
          description: 'any_desc'
        })
        .expect(403)
    })
  })
})
