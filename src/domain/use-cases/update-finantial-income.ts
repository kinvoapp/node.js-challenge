import { UpdateFinantialIncomeRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/domain/entities/errors'

type Input = UpdateFinantialIncomeRepository.Input
type Output = UpdateFinantialIncomeRepository.Output
export type UpdateFinantialIncome = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: UpdateFinantialIncomeRepository) => UpdateFinantialIncome

export const setupUpdateFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.update({ id: params.id, type: params.type, value: params.value, description: params.description })
  if (resutl !== undefined) {
    return { message: 'updated' }
  }
  throw new ServerError()
}
