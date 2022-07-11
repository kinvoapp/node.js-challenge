import { adaptEpressRoute as adapt } from '@/main/adapters'
import { makeAddFinantialIncomeController, makeUpdateFinantialIncomeController, makeLoadFinantialIncomeController } from '@/main/factories/controllers'
import { auth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/bankAccount/addFinantialIncome', auth, adapt(makeAddFinantialIncomeController()))
  router.put('/bankAccount/updateFinantialIcomes', auth, adapt(makeUpdateFinantialIncomeController()))
  router.get('/bankAccount/loadFinantialIcomes', auth, adapt(makeLoadFinantialIncomeController()))
}
