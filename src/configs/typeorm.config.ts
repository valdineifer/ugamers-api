import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: '',
  port: 5432,
  username: '',
  password: '',
  database: '',
  entities: [__dirname + '/../entities/*.entity.{js,ts}'],
  synchronize: true,
  logging: false,
  ssl: true,
};
