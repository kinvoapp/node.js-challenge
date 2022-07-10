import { IsNotEmpty } from 'class-validator';
import { IsOnlyDate } from 'src/schema/IsOnlyDate';

export class dateFilterDto {
  @IsNotEmpty()
  @IsOnlyDate()
  dateInit: string;

  @IsNotEmpty()
  @IsOnlyDate()
  dateEnd: string;
}
