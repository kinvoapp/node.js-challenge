import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/domain/entities/errors'

type Input = { type: string, value: number, description: string, user_id: number }
type Output = undefined | { id: string, type: string, value: number, description: string, user_id: number }

export type AddFinantialIncome = (params: Input) => Promise<Output>
export type Setup = (bankAccoutRepo: AddFinantialIncomeRepository) => AddFinantialIncome
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  const result = await bankAccoutRepo.add({ type: params.type, value: params.value, description: params.description, user_id: params.user_id })
  if (result !== undefined) return result
  throw new ServerError()
}
