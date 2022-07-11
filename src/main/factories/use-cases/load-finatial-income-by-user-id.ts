import { LoadFinantialIncomeByUserId, setupLoadFinantialIncomeByUserId } from '@/domain/use-cases'
import { makePgBankAccountRepository } from '../repos/pg-bank-account'

export const makeLoadFinatialIncomeByUserId = (): LoadFinantialIncomeByUserId => {
  return setupLoadFinantialIncomeByUserId(makePgBankAccountRepository())
}
