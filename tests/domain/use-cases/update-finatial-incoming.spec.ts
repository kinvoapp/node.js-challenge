import { UpdateFinantialIncomeRepository } from '@/domain/contracts/repos'
import { setupUpdateFinantialIncome, UpdateFinantialIncome } from '@/domain/use-cases'
import { mock, MockProxy } from 'jest-mock-extended'

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
