import { Comparator, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError, InvalidParamError } from '@/domain/entities/errors'

type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Comparator, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const result = await userAccountRepo.load({ email: params.email })
  if (result !== undefined) {
    const isValid = await crypto.compare({ value: result.password, valueToComoare: params.password })
    if (isValid) {
      const accessToken = await token.generate({ key: result.id })
      return { accessToken }
    }
    throw new InvalidParamError('password')
  }
  throw new AuthenticationError()
}
