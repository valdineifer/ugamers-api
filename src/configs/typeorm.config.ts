import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// TODO: verificar necessidade deste arquivo de configuração
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || '127.0.0.1',
  url: process.env.DATABASE_URL,
  port: Number(process.env.DATABASE_PORT) || 5432,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME || 'ugamers',
  entities: [path.resolve(__dirname, '..', 'entities', '*.entity.ts')],
  migrations: [path.resolve(__dirname, '..', 'database', 'migrations', '*.ts')],
  migrationsRun: false,
  synchronize: false,
  logging: false,
  cli: {
    migrationsDir: path.resolve(__dirname, '..', 'database', 'migrations'),
  }
};
