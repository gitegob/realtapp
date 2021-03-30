import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Bid } from './src/bid/entities/bid.entity';
import env from './src/env';
import { House } from './src/house/entities/house.entity';
import { User } from './src/auth/entities/auth.entity';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [User, House, Bid],
  synchronize: env.NODE_ENV !== 'production',
  migrations: ['dist/src/db/migrations/*.js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  ssl:
    env.NODE_ENV === 'production'
      ? {
          rejectUnauthorized: false,
        }
      : false,
};
export default ormconfig;
