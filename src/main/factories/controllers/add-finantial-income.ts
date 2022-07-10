import { AddFinatitalIncomesControler } from '@/application/controller/add-finantial-incomes'
import { makeAddFinatialIncome } from '@/main/factories/use-cases'

export const makeAddFinantialIncomeController = (): AddFinatitalIncomesControler => {
  return new AddFinatitalIncomesControler(makeAddFinatialIncome())
}
