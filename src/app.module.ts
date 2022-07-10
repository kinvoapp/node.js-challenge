import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from './modules/expense/expense.module';
import { RevenueModule } from './modules/revenue/revenue.module';
import * as ormconfig from '../ormconfig.js';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './modules/login/jwt-constants';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './shared/guards/auth.guards';



@Module({
  imports: [
    ExpenseModule,
    RevenueModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    LoginModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: jwtConstants.secret,
      signOptions: {
        expiresIn: 3600,
      },
    })
  ],
  controllers: [AppController],
  providers:
    [AppService,
      {
        provide: APP_GUARD,
        useClass: JwtAuthGuard,
      },
    ],
})
export class AppModule { }
