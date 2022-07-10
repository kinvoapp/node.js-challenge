import { PartialType } from '@nestjs/mapped-types';
import { CreateRevenueDto } from './create-revenue.dto';

export class UpdateRevenueDto extends PartialType(CreateRevenueDto) {}
