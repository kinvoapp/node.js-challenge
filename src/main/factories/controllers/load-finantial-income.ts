import { LoadFinatitalIncomesControler } from '@/application/controller'
import { makeLoadFinatialIncome } from '@/main/factories/use-cases'

export const makeLoadFinantialIncomeController = (): LoadFinatitalIncomesControler => {
  return new LoadFinatitalIncomesControler(makeLoadFinatialIncome())
}
