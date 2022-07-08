import { CompraredFieldError } from '@/application/errors'
import { ComparedFieldValidator } from '@/application/validation'

describe('RequiredStringValidator', () => {
  it('should return CompraredFieldError if the fields don\'t match', () => {
    const sut = new ComparedFieldValidator('any_field', 'other_field')
    const error = sut.validate()
    expect(error).toEqual(new CompraredFieldError())
  })

  it('should return if validation success', () => {
    const sut = new ComparedFieldValidator('any_field', 'any_field')
    const error = sut.validate()
    expect(error).toBeFalsy()
  })
})
