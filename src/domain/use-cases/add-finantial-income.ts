import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
import { ServerError } from '@/domain/entities/errors'

type Input = { type: string, value: number, description: string, userId: string }
type Output = undefined | { id: string, type: string, value: number, description: string, userId: string }

export type AddFinantialIncome = (params: Input) => Promise<Output>
export type Setup = (bankAccoutRepo: AddFinantialIncomeRepository) => AddFinantialIncome
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  const result = await bankAccoutRepo.add({ type: params.type, value: params.value, description: params.description, userId: params.userId })
  if (result !== undefined) return result
  throw new ServerError()
}
