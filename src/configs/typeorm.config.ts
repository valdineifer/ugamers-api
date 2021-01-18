import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: verificar necessidade deste arquivo de configuração
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST || '127.0.0.1',
  url: process.env.TYPEORM_URL,
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE || 'ugamers',
  entities: [path.resolve(__dirname, '..', 'entities', '*.{ts,js}')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*.{ts,js}')],
  migrationsRun: false,
  synchronize: false,
  logging: false,
  cli: {
    entitiesDir: path.resolve(__dirname, '..', 'entities'),
    migrationsDir: path.resolve(__dirname, '..', 'database', 'migrations'),
  }
};
