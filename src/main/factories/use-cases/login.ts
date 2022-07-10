import { setupLogin, Login } from '@/domain/use-cases'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenHandler, makeBcryptHandler } from '@/main/factories/crypto'

export const makeLogin = (): Login => {
  return setupLogin(makePgUserAccountRepository(), makeBcryptHandler(), makeJwtTokenHandler())
}
