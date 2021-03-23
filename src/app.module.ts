import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BidModule } from './bid/bid.module';
import ormconfig from '../ormconfig';
import { HouseModule } from './house/house.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    AuthModule,
    TypeOrmModule.forRoot(ormconfig),
    HouseModule,
    BidModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
