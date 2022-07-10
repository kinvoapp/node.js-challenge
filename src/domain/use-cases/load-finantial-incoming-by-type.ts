import { LoadFinantialIncomeByTypeRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

type Input = LoadFinantialIncomeByTypeRepository.Input
type Output = LoadFinantialIncomeByTypeRepository.Output
export type LoadFinantialIncomeByType = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: LoadFinantialIncomeByTypeRepository) => LoadFinantialIncomeByType

export const setupLoadFinantialIncomeByTypeRepository: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.load({ type: params.type })
  if (resutl !== undefined) {
    return resutl
  }
  throw new AuthenticationError()
}
