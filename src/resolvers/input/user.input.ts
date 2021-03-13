/* eslint-disable max-classes-per-file */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
class UserRoleInput {
  @Field()
  readonly id: number;
}
@InputType()
class UserInput {
  @Field()
  readonly email: string;

  @Field()
  readonly name: string;

  @Field()
  readonly username: string;

  // TODO: verify if this is the right approach
  @Field()
  readonly role: UserRoleInput;

  @Field()
  readonly password: string;

  @Field()
  readonly passwordConfirmation: string;
}

export default UserInput;
