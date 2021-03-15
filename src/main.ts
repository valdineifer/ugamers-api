import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { ValidationError, ValidationPipe } from '@nestjs/common';
import { ApolloError } from 'apollo-server-express';
import winstonConfig from './configs/winston.config';
import AppModule from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { logger });

  const RedisStore = connectRedis(session);
  const redis = new Redis({
    host: process.env.REDIS_URL,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors: ValidationError[]) =>
        new ApolloError('VALIDATION_ERROR', 'VALIDATION_ERROR', {
          invalidArgs: errors,
        }),
    }),
  );

  app.use(
    helmet({
      contentSecurityPolicy: process.env.NODE_ENV === 'production' ? undefined : false,
    }),
    session({
      name: process.env.SESSION_COOKIE,
      cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30,
        sameSite: 'lax', // csrf
        secure: process.env.NODE_ENV === 'production', // cookie only works in https
      },
      resave: false,
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    }),
  );

  await app.listen(parseInt(process.env.PORT, 10));
}

bootstrap();
