import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/domain/entities/errors'

type Input = AddFinantialIncomeRepository.Input
type Output = AddFinantialIncomeRepository.Output

export type AddFinantialIncome = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: AddFinantialIncomeRepository) => AddFinantialIncome
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  const result = await bankAccoutRepo.add({ type: params.type, value: params.value, description: params.description, user_id: params.user_id })
  if (result !== undefined) return result
  throw new ServerError()
}
