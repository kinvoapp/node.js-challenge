import { Decrypt, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository } from '@/domain/contracts/repos'
import { AuthenticationError, InvalidParamError } from '@/domain/entities/errors'

type Output = { accessToken: string }
type Input = { email: string, password: string }
export type Login = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository, crypto: Decrypt, token: TokenGenerator) => Login

export const loginSeup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const result = await userAccountRepo.load({ email: params.email })
  if (result !== undefined) {
    const { key } = await crypto.decrypt({ value: result.password })
    if (key === params.password) {
      const accessToken = await token.generate({ key: result.id })
      return { accessToken }
    } else {
      throw new InvalidParamError('password')
    }
  }
  throw new AuthenticationError()
}
