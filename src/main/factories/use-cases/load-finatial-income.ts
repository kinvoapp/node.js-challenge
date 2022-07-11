import { LoadFinantialIcomings, setupLoadFinantialIcomings } from '@/domain/use-cases'
import { makePgBankAccountRepository } from '@/main/factories/repos'

export const makeLoadFinatialIncome = (): LoadFinantialIcomings => {
  return setupLoadFinantialIcomings(makePgBankAccountRepository())
}
