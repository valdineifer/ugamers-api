import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const options: TypeOrmModuleOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ugamers',
  entities: [],
  synchronize: true,
};

module.exports = options;