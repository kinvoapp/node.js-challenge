import { mock, MockProxy } from 'jest-mock-extended'

export namespace AddFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string, userId: string }
  export type Output = { id: string, type: string, value: number, description: string, userId: string }

}
export interface AddFinantialIncomeRepository {
  add: (param: AddFinantialIncomeRepository.Input) => Promise<AddFinantialIncomeRepository.Output>
}

type Input = { type: string, value: number, description: string, userId: string }
export type Output = { id: string, type: string, value: number, description: string }

type AddFinantialIncome = (params: Input) => Promise<Output>
export type Setup = (bankAccoutRepo: AddFinantialIncomeRepository) => AddFinantialIncome
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  return await bankAccoutRepo.add({ type: params.type, value: params.value, description: params.description, userId: params.userId })
}

describe('AddFinantialIncome', () => {
  let sut: AddFinantialIncome
  let bankAccoutRepo: MockProxy<AddFinantialIncomeRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.add.mockResolvedValue({
      id: 'any_id',
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      userId: 'any_user_id'
    })
  })

  beforeEach(() => {
    sut = setupAddFinantialIncome(bankAccoutRepo)
  })

  it('should call add with correct input', async () => {
    await sut({ type: 'any_type', value: 1000, description: 'any_desc', userId: 'any_user_id' })
    expect(bankAccoutRepo.add).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc', userId: 'any_user_id' })
    expect(bankAccoutRepo.add).toHaveBeenCalledTimes(1)
  })

  it('should return a finantial income on sucess', async () => {
    const result = await sut({ type: 'any_type', value: 1000, description: 'any_desc', userId: 'any_user_id' })
    expect(result).toEqual({
      id: 'any_id',
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      userId: 'any_user_id'
    })
  })
})
