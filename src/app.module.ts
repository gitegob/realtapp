import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './bid/bid.module';
import ormconfig from '../ormconfig';
import { HouseModule } from './house/house.module';
import { MulterModule } from '@nestjs/platform-express';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    RateLimiterModule.register({
      points: 12,
      duration: 60,
      blockDuration: 60,
      errorMessage: 'Too many requests',
    }),
    MulterModule.register({
      dest: './upload',
    }),
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    HouseModule,
    BidModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: RateLimiterInterceptor,
    },
  ],
})
export class AppModule {}
