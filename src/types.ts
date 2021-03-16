/* eslint-disable max-classes-per-file */
/* eslint-disable import/no-extraneous-dependencies */
import { Field, ObjectType } from '@nestjs/graphql';
import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
};

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field(() => [String])
  message: string[];
}

@ObjectType()
export class InputResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
