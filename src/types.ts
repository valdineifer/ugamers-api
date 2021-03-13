// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
};
