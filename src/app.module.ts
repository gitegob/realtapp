import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
