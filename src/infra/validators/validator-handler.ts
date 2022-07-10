import { Emailvalidator } from '@/domain/contracts/validation/email-validation'
import validator from 'validator'

type Input = Emailvalidator.Input
type Output = Emailvalidator.Output

export class ValidatorHandler {
  async validate (params: Input): Promise<Output> {
    return validator.isEmail(params.value)
  }
}
