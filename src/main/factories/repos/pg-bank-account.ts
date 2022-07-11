import { PgBankAccountRepository } from '@/infra/postgres/repos'

export const makePgBankAccountRepository = (): PgBankAccountRepository => {
  return new PgBankAccountRepository()
}
