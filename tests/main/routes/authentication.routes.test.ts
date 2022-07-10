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

  describe('POST /singup', () => {
    it('should return 200 on singup', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'email',
          password: 'test_password',
          confirmPassword: 'test_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    it('should return 200 on singup', async () => {
      await request(app)
        .post('/api/singup')
        .send({
          name: 'usuário_test',
          email: 'usuario_test@gamil.com',
          password: 'quesenha',
          confirmPassword: 'quesenha'
        })
        .expect(200)

      await request(app)
        .post('/api/login')
        .send({
          email: 'usuario_test@gamil.com',
          password: 'quesenha'
        })
        .expect(200)
    })
  })
})
