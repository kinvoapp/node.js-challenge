import { setupUpdateFinantialIncome, UpdateFinantialIncome } from '@/domain/use-cases'
import { makePgBankAccountRepository } from '@/main/factories/repos/pg-bank-account'

export const makeUpdateFinatialIncome = (): UpdateFinantialIncome => {
  return setupUpdateFinantialIncome(makePgBankAccountRepository())
}
