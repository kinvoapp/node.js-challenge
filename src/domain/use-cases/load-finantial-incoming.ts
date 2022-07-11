import { LoadFinantialIcomingsRepository } from '@/domain/contracts/repos'
import { AuthenticationError } from '@/domain/entities/errors'

type Output = LoadFinantialIcomingsRepository.Output
type Input = LoadFinantialIcomingsRepository.Input

export type LoadFinantialIcomings = (param: Input) => Promise<Output>
type Setup = (bankAccoutRepo: LoadFinantialIcomingsRepository) => LoadFinantialIcomings

export const setupLoadFinantialIcomings: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.loadAll({ userId: params.userId })
  if (resutl !== undefined) {
    return resutl
  }
  throw new AuthenticationError()
}
