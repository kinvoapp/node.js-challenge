import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { JwtStrategy } from 'src/shared/strategy/jwt.strategy';
import { AuthService } from 'src/shared/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { jwtConstants } from './jwt-constants';
dotenv.config();

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secretOrPrivateKey: jwtConstants.secret,
    signOptions: {
      expiresIn: 3600,
    },
  }),],
  controllers: [LoginController],
  providers: [AuthService, UserService, JwtService, JwtStrategy]
})
export class LoginModule { }
