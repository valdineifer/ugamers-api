import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { NestExpressApplication } from '@nestjs/platform-express';
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

  app.use(
    session({
      name: 'qid',
      cookie: {
        httpOnly: true,
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
