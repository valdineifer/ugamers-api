/* eslint-disable max-classes-per-file */
import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEnum,
  IsEmail,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';
import { ApiErrors } from 'src/constants/errorConstants';
import UserRole from 'src/helpers/enum/user-roles.enum';

@InputType()
class UserRoleInput {
  @IsNotEmpty({ message: ApiErrors.nullField })
  @IsEnum(UserRole, { message: 'O escopo (role) informado não é válido' })
  @Field()
  readonly id: number;
}

@InputType()
class UserInput {
  @IsNotEmpty({ message: ApiErrors.nullField })
  @IsEmail({}, { message: ApiErrors.invalidEmail })
  @MaxLength(200, { message: ApiErrors.tooLongField })
  @Field()
  readonly email: string;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(3, { message: ApiErrors.tooShortField })
  @MaxLength(200, { message: ApiErrors.tooLongField })
  @Field()
  readonly name: string;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(3, { message: ApiErrors.tooShortField })
  @MaxLength(42, { message: ApiErrors.tooLongField })
  @Matches(/^[a-z0-9_-]{3,42}$/, { message: ApiErrors.invalidUsername })
  @Field()
  readonly username: string;

  // TODO: verify if this is the right approach
  @Field()
  readonly role: UserRoleInput;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(8, { message: ApiErrors.tooShortField })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword },
  )
  @Field()
  readonly password: string;

  @IsNotEmpty({ message: ApiErrors.nullField })
  @MinLength(8, { message: ApiErrors.tooShortField })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword },
  )
  @Field()
  readonly passwordConfirmation: string;
}

export default UserInput;
