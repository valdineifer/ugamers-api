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
  @IsNotEmpty({ message: ApiErrors.nullField('id').message })
  @IsEnum(UserRole, { message: 'O escopo (role) informado não é válido' })
  @Field()
  readonly id: number;
}

@InputType()
class UserInput {
  @IsNotEmpty({ message: ApiErrors.nullField('email').message })
  @IsEmail({}, { message: ApiErrors.invalidEmail.message })
  @MaxLength(200, { message: ApiErrors.tooLongField('email', 200).message })
  @Field()
  readonly email: string;

  @IsNotEmpty({ message: ApiErrors.nullField('name').message })
  @MinLength(3, { message: ApiErrors.tooShortField('name', 3).message })
  @MaxLength(200, { message: ApiErrors.tooLongField('name', 200).message })
  @Field()
  readonly name: string;

  @IsNotEmpty({ message: ApiErrors.nullField('username').message })
  @MinLength(3, { message: ApiErrors.tooShortField('username', 3).message })
  @MaxLength(42, { message: ApiErrors.tooLongField('username', 42).message })
  @Matches(/^[a-z0-9_-]{3,42}$/, { message: ApiErrors.invalidUsername.message })
  @Field()
  readonly username: string;

  // TODO: verify if this is the right approach
  @Field()
  readonly role: UserRoleInput;

  @IsNotEmpty({ message: ApiErrors.nullField('password').message })
  @MinLength(8, { message: ApiErrors.tooShortField('password', 8).message })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword.message },
  )
  @Field()
  readonly password: string;

  @IsNotEmpty({ message: ApiErrors.nullField('passwordConfirmation').message })
  @MinLength(8, { message: ApiErrors.tooShortField('passwordConfirmation', 8).message })
  @Matches(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*\-+âáàãéèêíìîôòóúùû]).{8,}$/,
    { message: ApiErrors.invalidPassword.message },
  )
  @Field()
  readonly passwordConfirmation: string;
}

export default UserInput;
