import { mock, MockProxy } from 'jest-mock-extended'

export namespace AddFinantialIncomeRepository {
  export type Input = { type: string, value: number, description: string }
}
export interface AddFinantialIncomeRepository {
  add: (param: AddFinantialIncomeRepository.Input) => Promise<void>
}

type Input = { type: string, value: number, description: string }
type AddFinantialIncome = (params: Input) => Promise<void>
export type Setup = (bankAccoutRepo: AddFinantialIncomeRepository) => AddFinantialIncome
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  await bankAccoutRepo.add({ type: params.type, value: params.value, description: params.description })
}

describe('AddFinantialIncome', () => {
  let sut: AddFinantialIncome
  let bankAccoutRepo: MockProxy<AddFinantialIncomeRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
  })

  beforeEach(() => {
    sut = setupAddFinantialIncome(bankAccoutRepo)
  })

  it('should call add with correct input', async () => {
    await sut({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(bankAccoutRepo.add).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc' })
    expect(bankAccoutRepo.add).toHaveBeenCalledTimes(1)
  })
})
