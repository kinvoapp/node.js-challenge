import { Encrypter, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/domain/contracts/repos'
import { EmailInUseError } from '@/domain/entities/errors'

type Output = { accessToken: string }
type Input = { name: string, email: string, password: string }
export type Singup = (params: Input) => Promise<Output>
type Setup = (userAccountRepo: LoadUserAccountRepository & SaveUserAccountRepository, crypto: Encrypter, token: TokenGenerator) => Singup

export const setupSingup: Setup = (userAccountRepo, crypto, token) => async (params) => {
  const accountData = await userAccountRepo.load({ email: params.email })
  if (accountData === undefined) {
    const { key } = await crypto.encrypt({ value: params.password })
    const { id } = await userAccountRepo.save({ name: params.name, email: params.email, password: key })
    const accessToken = await token.generate({ key: id })
    return { accessToken }
  }
  throw new EmailInUseError()
}
