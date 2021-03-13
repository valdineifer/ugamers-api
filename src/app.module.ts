import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
// import { MailerModule } from '@nestjs-modules/mailer';
import typeOrmConfig from './configs/typeorm.config';
import UsersModule from './modules/users.module';
import LoggerInterceptor from './interceptors/logger.interceptor';
import winstonConfig from './configs/winston.config';
// import mailerConfig from './configs/mailer.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    WinstonModule.forRoot(winstonConfig),
    // MailerModule.forRoot(mailerConfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    UsersModule,
    // AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export default class AppModule {}
