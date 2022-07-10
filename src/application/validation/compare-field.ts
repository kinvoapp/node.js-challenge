import { CompraredFieldError } from '@/application/errors'
import { Validator } from './validator'

export class ComparedFieldValidator implements Validator {
  constructor (
    private readonly fieldValue: string,
    private readonly fieldToCompareValue: string) { }

  validate (): Error | undefined {
    if (this.fieldValue !== this.fieldToCompareValue) {
      return new CompraredFieldError()
    }
  }
}
