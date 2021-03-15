import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiErrors } from 'src/constants/errorConstants';

@InputType()
export default class LoginInput {
  @IsNotEmpty({ message: ApiErrors.nullField('username').message })
  @MinLength(3, { message: ApiErrors.tooShortField('username', 3).message })
  @MaxLength(42, { message: ApiErrors.tooLongField('username', 42).message })
  @Field()
  readonly username: string;

  @IsNotEmpty({ message: ApiErrors.nullField('password').message })
  @MinLength(8, { message: ApiErrors.tooShortField('password', 8).message })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword.message },
  )
  @Field()
  readonly password: string;
}
