import { PassportModule } from '@nestjs/passport';
import { Bid } from './entities/bid.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BidService } from './bid.service';
import { BidController } from './bid.controller';
import { HouseModule } from '../house/house.module';
import { EmailService } from '../shared/providers/email.service';

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
  providers: [
    BidService,
    {
      provide: EmailService,
      useClass: EmailService,
    },
  ],
  exports: [BidService],
})
export class BidModule {}
