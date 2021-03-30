import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { RateLimiterInterceptor, RateLimiterModule } from 'nestjs-rate-limiter';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './bid/bid.module';
import { HouseModule } from './house/house.module';
import config from './app.config';
import { TypeOrmConfigService } from './shared/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      cache: true,
    }),
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
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
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
  exports: [HouseModule],
})
export class AppModule {}
