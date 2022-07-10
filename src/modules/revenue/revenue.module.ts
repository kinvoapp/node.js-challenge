import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { RevenueService } from './revenue.service';
import { RevenueController } from './revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Revenue } from './entities/revenue.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/shared/auth/auth.service';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as dotenv from 'dotenv';
import { jwtConstants } from '../login/jwt-constants';
dotenv.config();


@Module({
  imports: [
    TypeOrmModule.forFeature([Revenue, User]),
    CacheModule.register(
      {
        ttl: 20,
        max: 100
      }
    ),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [RevenueController],
  providers: [RevenueService, AuthService, JwtStrategy, UserService]
})
export class RevenueModule { }
