import { SingupController } from '@/application/controller'
import { makeSingup } from '@/main/factories/use-cases'

export const makeSingupController = (): SingupController => {
  return new SingupController(makeSingup())
}
