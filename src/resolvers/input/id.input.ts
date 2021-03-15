import { ArgsType, Field } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { ApiErrors } from 'src/constants/errorConstants';

@ArgsType()
export default class IdInput {
  @IsInt({ message: ApiErrors.invalidType })
  @Field()
  id: number;
}
