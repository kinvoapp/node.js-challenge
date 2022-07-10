import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, ItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
