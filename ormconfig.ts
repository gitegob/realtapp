import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import env from './src/env';

const ormconfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.DB_HOST || 'localhost',
  port: 5432,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: ['./src/**/entities/*.entity.js'],
  synchronize: env.NODE_ENV !== 'production',
  autoLoadEntities: true,
  ssl: env.NODE_ENV === 'production',
};
export default ormconfig;
