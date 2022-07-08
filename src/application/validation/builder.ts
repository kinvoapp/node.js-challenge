import { RequiredStringValidator, Validator } from '@/application/validation'
import { ComparedFieldValidator } from './compare-field'

export class ValidationBuilder {
  private constructor (
    private readonly value: string,
    private readonly fiedlName: string,
    private readonly validators: Validator[] = []
  ) { }

  static of (params: { value: string, fieldName: string }): ValidationBuilder {
    return new ValidationBuilder(params.value, params.fieldName)
  }

  compare (otherFieldValue: string): ValidationBuilder {
    this.validators.push(new ComparedFieldValidator(this.value, otherFieldValue))
    return this
  }

  required (): ValidationBuilder {
    this.validators.push(new RequiredStringValidator(this.value, this.fiedlName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
