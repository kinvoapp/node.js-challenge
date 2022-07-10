import { LoadFinantialIncomeByUserIdRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

type Input = LoadFinantialIncomeByUserIdRepository.Input
type Output = LoadFinantialIncomeByUserIdRepository.Output
export type LoadFinantialIncomeByUserId = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: LoadFinantialIncomeByUserIdRepository) => LoadFinantialIncomeByUserId

export const setupLoadFinantialIncomeByUserId: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.load({ userId: params.userId })
  if (resutl !== undefined) {
    return resutl
  }
  throw new AuthenticationError()
}
