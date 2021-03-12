import dotenv from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';
import session from 'express-session';
import redis from 'redis';
import connectRedis from 'connect-redis';
import winstonConfig from './configs/winston.config';
import AppModule from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  dotenv.config();
  const logger = WinstonModule.createLogger(winstonConfig);
  const app = await NestFactory.create(AppModule, { logger });

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

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
        client: redisClient,
        disableTouch: true,
      }),
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
    }),
  );

  await app.listen(parseInt(process.env.PORT, 10));
}

bootstrap();
