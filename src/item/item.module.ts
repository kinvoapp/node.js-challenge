import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { itemController } from './item.controller';
import { itemProviders } from './item.providers';
import { ItemService } from './item.service';

@Module({
  imports: [DatabaseModule],
  controllers: [itemController],
  providers: [...itemProviders, ItemService],
})
export class ItemModule {}
