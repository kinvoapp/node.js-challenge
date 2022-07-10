import { mock, MockProxy } from 'jest-mock-extended'

export namespace LoadFinantialIncomeByUserIdRepository {
  export type Input = { userId: number }
  export type Output = undefined | { id: string, type: string, value: number, description: string, user_id: number }

}

export interface LoadFinantialIncomeByUserIdRepository {
  load: (param: LoadFinantialIncomeByUserIdRepository.Input) => Promise<LoadFinantialIncomeByUserIdRepository.Output>
}

type Input = LoadFinantialIncomeByUserIdRepository.Input
type Output = LoadFinantialIncomeByUserIdRepository.Output

export type LoadFinantialIncomeByUserId = (params: Input) => Promise<Output>
export type Setup = (bankAccoutRepo: LoadFinantialIncomeByUserIdRepository) => LoadFinantialIncomeByUserId
export const setupAddFinantialIncome: Setup = (bankAccoutRepo) => async params => {
  await bankAccoutRepo.load({ userId: params.userId })
  return undefined
}

describe('LoadFinantialIncomeByUserId', () => {
  let sut: LoadFinantialIncomeByUserId
  let bankAccoutRepo: MockProxy<LoadFinantialIncomeByUserIdRepository>

  beforeAll(() => {
    bankAccoutRepo = mock()
    bankAccoutRepo.load.mockResolvedValue({
      id: 'any_id',
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  beforeEach(() => {
    sut = setupAddFinantialIncome(bankAccoutRepo)
  })

  it('should call load with correct input', async () => {
    await sut({ userId: 1 })
    expect(bankAccoutRepo.load).toHaveBeenCalledWith({ userId: 1 })
    expect(bankAccoutRepo.load).toHaveBeenCalledTimes(1)
  })
})
