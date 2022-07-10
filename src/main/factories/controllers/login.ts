import { LoginController } from '@/application/controller'
import { makeLogin } from '@/main/factories/use-cases'

export const makeLoginController = (): LoginController => {
  return new LoginController(makeLogin())
}
