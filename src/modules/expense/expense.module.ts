import { CacheModule, Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { AuthService } from 'src/shared/auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import * as dotenv from 'dotenv';
import { jwtConstants } from '../login/jwt-constants';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense, User]),
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
  controllers: [ExpenseController],
  providers: [ExpenseService, AuthService, JwtStrategy, UserService]
})
export class ExpenseModule { }
