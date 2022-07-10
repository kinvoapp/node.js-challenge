import { AddFinantialIncome, setupAddFinantialIncome } from '@/domain/use-cases'
import { makePgBankAccountRepository } from '../repos/pg-bank-account'

export const makeAddFinatialIncome = (): AddFinantialIncome => {
  return setupAddFinantialIncome(makePgBankAccountRepository())
}
