import { UpdateFinatitalIncomesControler } from '@/application/controller'
import { makeLoadFinatialIncomeByUserId, makeUpdateFinatialIncome } from '@/main/factories/use-cases'
import { makeLoadFinatialIncomeByType } from '../use-cases/load-finatial-income-by-type'

export const makeUpdateFinantialIncomeController = (): UpdateFinatitalIncomesControler => {
  return new UpdateFinatitalIncomesControler(makeUpdateFinatialIncome(), makeLoadFinatialIncomeByUserId(), makeLoadFinatialIncomeByType())
}
