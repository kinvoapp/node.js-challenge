import { BcryptHandler } from '@/infra/crypto'

export const makeBcryptHandler = (): BcryptHandler => {
  return new BcryptHandler(12)
}
