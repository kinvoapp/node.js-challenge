import { CompraredFieldError } from '@/application/errors'

export class ComparedFieldValidator {
  constructor (
    private readonly field: string,
    private readonly fieldToCompare: string) { }

  validate (): Error | undefined {
    if (this.field !== this.fieldToCompare) {
      return new CompraredFieldError()
    }
  }
}
