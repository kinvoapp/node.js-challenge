import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Revenue]),
    CacheModule.register(
      {
        ttl: 20,
        max: 100
      }
    )
  ],
  controllers: [RevenueController],
  providers: [RevenueService]
})
export class RevenueModule { }
