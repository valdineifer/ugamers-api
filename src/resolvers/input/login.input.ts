import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiErrors } from 'src/constants/errorConstants';

@InputType()
export default class LoginInput {
  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(3, { message: ApiErrors.tooShortField })
  @MaxLength(42, { message: ApiErrors.tooLongField })
  @Field()
  readonly username: string;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(8, { message: ApiErrors.tooShortField })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword },
  )
  @Field()
  readonly password: string;
}
