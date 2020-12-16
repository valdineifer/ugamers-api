import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import User from 'src/entities/user.entity';

export const GetUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
