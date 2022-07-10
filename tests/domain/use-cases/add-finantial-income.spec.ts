import { AddFinantialIncomeRepository } from '@/domain/contracts/repos'
import { mock, MockProxy } from 'jest-mock-extended'
import { AddFinantialIncome, setupAddFinantialIncome } from '@/domain/use-cases'
import { ServerError } from '@/domain/entities/errors'

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
      user_id: 1
    })
  })

  beforeEach(() => {
    sut = setupAddFinantialIncome(bankAccoutRepo)
  })

  it('should call add with correct input', async () => {
    await sut({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    expect(bankAccoutRepo.add).toHaveBeenCalledWith({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    expect(bankAccoutRepo.add).toHaveBeenCalledTimes(1)
  })

  it('should return a finantial income on sucess', async () => {
    const result = await sut({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    expect(result).toEqual({
      id: 'any_id',
      type: 'any_type',
      value: 1000,
      description: 'any_desc',
      user_id: 1
    })
  })

  it('should  rethrow if add throws', async () => {
    bankAccoutRepo.add.mockResolvedValueOnce(undefined)
    const promise = sut({ type: 'any_type', value: 1000, description: 'any_desc', user_id: 1 })
    await expect(promise).rejects.toThrow(new ServerError())
  })
})
