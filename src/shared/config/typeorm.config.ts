import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../auth/entities/auth.entity';
import { Bid } from '../../bid/entities/bid.entity';
import { House } from '../../house/entities/house.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('db.host'),
      port: this.config.get<number>('db.port'),
      username: this.config.get<string>('db.user'),
      password: this.config.get<string>('db.password'),
      database: this.config.get<string>('db.name'),
      entities: [User, House, Bid],
      synchronize: this.config.get<string>('global.nodeEnv') !== 'production',
      migrations: ['dist/src/db/migrations/*.js'],
      cli: {
        migrationsDir: 'src/db/migrations',
      },
      ssl:
        this.config.get<string>('global.nodeEnv') === 'production'
          ? {
              rejectUnauthorized: false,
            }
          : false,
    };
  }
}
