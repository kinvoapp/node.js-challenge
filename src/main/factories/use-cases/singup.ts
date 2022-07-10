import { setupSingup, Singup } from '@/domain/use-cases'
import { makePgUserAccountRepository } from '@/main/factories/repos'
import { makeJwtTokenHandler, makeBcryptHandler } from '@/main/factories/crypto'

export const makeSingup = (): Singup => {
  return setupSingup(makePgUserAccountRepository(), makeBcryptHandler(), makeJwtTokenHandler())
}
