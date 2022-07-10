import { mock, MockProxy } from 'jest-mock-extended'

import { AuthenticationError, ServerError } from '@/domain/entities/errors'

export namespace UpdateFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string }
  export type Output = undefined| { message: string }

}

export interface UpdateFinantialIncomeRepository {
  update: (param: UpdateFinantialIncomeRepository.Input) => Promise<UpdateFinantialIncomeRepository.Output>
}

type Input = UpdateFinantialIncomeRepository.Input
type Output = UpdateFinantialIncomeRepository.Output
export type UpdateFinantialIncome = (params: Input) => Promise<Output>
type Setup = (bankAccoutRepo: UpdateFinantialIncomeRepository) => UpdateFinantialIncome

export const setupUpdateFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  const resutl = await bankAccoutRepo.update({ type: params.type, value: params.value, description: params.description })
  if (resutl !== undefined) {
    return { message: 'updated' }
  }
  throw new ServerError()
}

describe('UpdateFinantialIncome', () => {
  let sut: UpdateFinantialIncome
  let bankAccoutRepo: MockProxy<UpdateFinantialIncomeRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.update.mockResolvedValue({ message: 'updated' })
  })

  beforeEach(() => {
    sut = setupUpdateFinantialIncome(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(bankAccoutRepo.update).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(bankAccoutRepo.update).toHaveBeenCalledTimes(1)
  })

  it('should return a finantial income on sucess', async () => {
    const result = await sut({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(result).toEqual({ message: 'updated' })
  })

  it('should rethrow if finatila icome not found', async () => {
    bankAccoutRepo.update.mockResolvedValueOnce(undefined)
    const promise = sut({ type: 'any_type', value: 1000, description: 'any_desc' })
    await expect(promise).rejects.toThrow()
  })
})
