import { LoadFinantialIncomeByType, setupLoadFinantialIncomeByType } from '@/domain/use-cases'
import { makePgBankAccountRepository } from '@/main/factories/repos'

export const makeLoadFinatialIncomeByType = (): LoadFinantialIncomeByType => {
  return setupLoadFinantialIncomeByType(makePgBankAccountRepository())
}
