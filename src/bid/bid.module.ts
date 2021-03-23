import { PassportModule } from '@nestjs/passport';
import { Bid } from './entities/bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { HouseService } from '../house/house.service';
import { House } from '../house/entities/house.entity';
import { HouseModule } from '../house/house.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bid]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    HouseModule,
  ],
  controllers: [BidController],
  providers: [BidService],
})
export class BidModule {}
