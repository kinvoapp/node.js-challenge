import { badRequest, HttpResponse, serverError } from '@/application/helpers'
import { ValidationComposite, Validator } from '@/application/validation'

export abstract class Controller {
  abstract perform (httRequest: any): Promise<HttpResponse>
  buildValidators (httRequest: any): Validator[] {
    return []
  }

  async handle (httRequest: any, locals?: any): Promise<HttpResponse> {
    const error = this.validate(httRequest)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      if (locals !== undefined) {
        httRequest.locals = locals
        return await this.perform(httRequest)
      } else {
        return await this.perform(httRequest)
      }
    } catch (error) {
      return serverError(error)
    }
  }

  private validate (httRequest: any): Error | undefined {
    const validators = this.buildValidators(httRequest)
    return new ValidationComposite(validators).validate()
  }
}
