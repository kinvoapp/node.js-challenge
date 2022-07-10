import { IsNotEmpty, Length } from 'class-validator';
import Decimal from 'decimal.js';

export class createItemDto {
  @IsNotEmpty()
  @Length(4, 100)
  title: string;

  @IsNotEmpty()
  value: Decimal;

  @IsNotEmpty()
  type: boolean;

  createdDate?: Date;

  description?: string;

  @IsNotEmpty()
  user: number;
}
