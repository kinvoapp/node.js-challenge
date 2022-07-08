import { ForbiddenError } from '@/application/errors'
import { AuthenticationMiddleware } from '@/application/middlewares'

describe('AuthenticationMiddleware', () => {
  let sut: AuthenticationMiddleware
  let authorize: jest.Mock
  let authorization: string

  beforeAll(() => {
    authorization = 'any_authorization_token'
    authorize = jest.fn().mockResolvedValue('any_userId')
  })

  beforeEach(() => {
    sut = new AuthenticationMiddleware(authorize)
  })

  it('should return 403 if authorization is empty', async () => {
    const httpResponse = await sut.handler({ authorization: '' })
    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is null', async () => {
    const httpResponse = await sut.handler({ authorization: null as any })
    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 403 if authorization is undefined', async () => {
    const httpResponse = await sut.handler({ authorization: undefined as any })
    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should call authorize with correct input', async () => {
    await sut.handler({ authorization })
    expect(authorize).toHaveBeenCalledWith({ token: authorization })
    expect(authorize).toHaveBeenCalledTimes(1)
  })

  it('should return 403 if authorization throws', async () => {
    authorize.mockRejectedValueOnce(new Error('anny_error'))
    const httpResponse = await sut.handler({ authorization })
    expect(httpResponse).toEqual({
      statusCode: 403,
      data: new ForbiddenError()
    })
  })

  it('should return 200 with user id on success', async () => {
    const httpResponse = await sut.handler({ authorization })
    expect(httpResponse).toEqual({ statusCode: 200, data: { userId: 'any_userId' } })
  })
})
