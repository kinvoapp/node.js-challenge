import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class DecimalTransformer implements ValueTransformer {
  to(value?: Decimal): string {
    return value?.toString();
  }

  from(value?: string): Decimal | null {
    return value ? new Decimal(value) : null;
  }
}
