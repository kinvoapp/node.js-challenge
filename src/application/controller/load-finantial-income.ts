import { HttpResponse, ok, serverError, unauthorized } from '@/application/helpers'
import { LoadFinantialIcomings } from '@/domain/use-cases'
import { UnauthorizedError } from '@/application/errors'
import { Controller } from './controller'

type HttpRequest = {
  locals?: any
}
type Model = any
export class LoadFinatitalIncomesControler extends Controller {
  constructor (
    private readonly loadAll: LoadFinantialIcomings) {
    super()
  }

  async perform ({ locals }: HttpRequest): Promise<HttpResponse<Model>> {
    try {
      if (locals.userId !== undefined) {
        const results = await this.loadAll({ userId: locals.userId })
        return ok(results)
      }
      return unauthorized()
    } catch (error) {
      return serverError(error)
    }
  }
}
