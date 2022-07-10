import { adaptEpressRoute as adapt } from '@/main/adapters'
import { makeAddFinantialIncomeController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/bankAccount/addFinantialIncome', adapt(makeAddFinantialIncomeController()))
}
