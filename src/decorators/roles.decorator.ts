import { CustomDecorator, SetMetadata } from '@nestjs/common';

export default (...roles: number[]): CustomDecorator<string> =>
  SetMetadata('roles', roles);
