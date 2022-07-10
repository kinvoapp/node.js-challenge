import { adaptEpressRoute as adapt } from '@/main/adapters'
import { makeSingupController } from '@/main/factories/controllers'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/singup', adapt(makeSingupController()))
}
