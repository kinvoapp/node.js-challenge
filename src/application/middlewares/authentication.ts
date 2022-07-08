import { forbidden, HttpResponse, ok } from '@/application/helpers'
import { RequiredStringValidator } from '@/application/validation'
import { Middleware } from './middleware'

export type HttpRequest = { authorization: string }
type Model = Error | { userId: string }
type Authorize = (params: { token: string }) => Promise<string>

export class AuthenticationMiddleware implements Middleware {
  constructor (
    private readonly authorize: Authorize
  ) { }

  async handler ({ authorization }: HttpRequest): Promise<HttpResponse<Model>> {
    if (!this.validate({ authorization })) return forbidden()
    try {
      const userId = await this.authorize({ token: authorization })
      return ok({ userId })
    } catch (error) {
      return forbidden()
    }
  }

  private validate ({ authorization }: HttpRequest): boolean {
    const error = new RequiredStringValidator(authorization, 'authorization').validate()
    return error === undefined
  }
}
