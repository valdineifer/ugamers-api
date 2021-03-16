import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ApiErrors } from 'src/constants/errorConstants';

@InputType()
export default class LoginInput {
  @IsNotEmpty({ message: ApiErrors.nullField })
  @Field()
  readonly username: string;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(8, { message: ApiErrors.tooShortField })
  @Field()
  readonly password: string;
}
