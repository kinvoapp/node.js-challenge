import { LoadFinantialIncomeByTypeRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

type Input = LoadFinantialIncomeByTypeRepository.Input
type Output = LoadFinantialIncomeByTypeRepository.Output
export type LoadFinantialIncomeByType = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: LoadFinantialIncomeByTypeRepository) => LoadFinantialIncomeByType

export const setupLoadFinantialIncomeByType: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.loadByType({ type: params.type })
  if (resutl !== undefined) {
    return resutl
  }
  throw new AuthenticationError()
}
