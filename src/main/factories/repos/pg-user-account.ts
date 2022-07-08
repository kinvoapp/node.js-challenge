import { PgUserAccountRepository } from '@/infra/postgres/repos'

export const makePgUserAccountRepository = (): PgUserAccountRepository => {
  return new PgUserAccountRepository()
}
