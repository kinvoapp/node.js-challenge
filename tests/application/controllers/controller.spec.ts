import { Controller } from '@/application/controller'
import { SeverError } from '@/application/errors'
import { HttpResponse } from '@/application/helpers'
import { ValidationComposite } from '@/application/validation'
import { mocked } from 'jest-mock'

jest.mock('@/application/validation/composite')
class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_date'
  }

  async perform (httRequest: any): Promise<HttpResponse> {
    return this.result
  }
}

describe('Controller', () => {
  let sut: ControllerStub
  beforeEach(() => {
    sut = new ControllerStub()
  })

  it('should return  400 validation fails', async () => {
    const error = new Error('validation_error')
    const ValidationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(ValidationCompositeSpy)
    const httResponse = await sut.handle('any_value')
    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should return  500 if perform throws', async () => {
    const error = new Error('perform_Error')
    jest.spyOn(sut, 'perform').mockRejectedValueOnce(error)
    const httResponse = await sut.handle('any_value')
    expect(httResponse).toEqual({
      statusCode: 500,
      data: new SeverError(error)
    })
  })

  it('should return  save result as perform', async () => {
    const httResponse = await sut.handle('any_value')
    expect(httResponse).toEqual(sut.result)
  })
})
