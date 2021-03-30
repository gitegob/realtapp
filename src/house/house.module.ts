import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { House } from './entities/house.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import CloudinaryService from '../shared/providers/cloudinary.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([House]),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [HouseController],
  providers: [
    HouseService,
    {
      provide: CloudinaryService,
      useClass: CloudinaryService,
    },
  ],
  exports: [HouseService],
})
export class HouseModule {}
