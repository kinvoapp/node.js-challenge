import { adaptEpressRoute as adapt } from '@/main/adapters'
import { makeAddFinantialIncomeController } from '@/main/factories/controllers'
import { Router } from 'express'
import { auth } from '@/main/middlewares'

export default (router: Router): void => {
  router.post('/bankAccount/addFinantialIncome', auth, adapt(makeAddFinantialIncomeController()))
}
