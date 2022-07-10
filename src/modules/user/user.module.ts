import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from 'src/shared/auth/auth.service';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import * as dotenv from 'dotenv';
import { jwtConstants } from '../login/jwt-constants';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
    }),],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy]
})
export class UserModule { }
