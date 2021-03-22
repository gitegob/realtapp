import { Module } from '@nestjs/common';
import { HouseService } from './house.service';
import { HouseController } from './house.controller';
import { House } from './entities/house.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([House]), AuthModule],
  controllers: [HouseController],
  providers: [HouseService],
})
export class HouseModule {}
