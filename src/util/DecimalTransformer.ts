import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(value?: Decimal): string {
    return value?.toString();
  }

  from(value?: string): Decimal | null {
    return value ? new Decimal(value) : null;
  }

  // https://mikemcl.github.io/decimal.js/#Dsum
  sum(value: Decimal, other: string): Decimal {
    const otherInDecimal = new Decimal(other);
    const result = Decimal.sum(value, otherInDecimal);
    return result;
  }

  sub(value: Decimal, other: string): Decimal {
    const otherInDecimal = new Decimal(other);
    const result = Decimal.sub(value, otherInDecimal);
    return result;
  }
}
