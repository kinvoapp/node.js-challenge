import { Encrypter, TokenGenerator } from '@/domain/contracts/crypto'
import { LoadUserAccountRepository, SaveUserAccountRepository } from '@/domain/contracts/repos'
import { EmailInUseError } from '@/domain/entities/errors'

type Setup = (
  userAccountRepo: LoadUserAccountRepository & SaveUserAccountRepository,
  crypto: Encrypter,
  token: TokenGenerator
) => Singup
export type Singup = (name: string, email: string, password: string) => Promise<{ token: string }>

export const setupSingup: Setup = (userAccountRepo, crypto, token) => async (name, email, password) => {
  const accountData = await userAccountRepo.loadByEmail({ email })
  if (accountData !== undefined) throw new EmailInUseError()
  const passwordHashed = await crypto.encrypt({ password })
  const { id } = await userAccountRepo.saveUser({ name, email, password: passwordHashed.key })
  const accessToken = await token.generate({ key: id })
  return { token: accessToken.token }
}
