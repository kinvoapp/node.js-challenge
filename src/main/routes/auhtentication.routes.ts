import { adaptEpressRoute as adapt } from '@/main/adapters'
import { makeSingupController, makeLoginController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/singup', adapt(makeSingupController()))
  router.post('/login', adapt(makeLoginController()))
}
