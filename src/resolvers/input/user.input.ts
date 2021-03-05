import { InputType, Field } from '@nestjs/graphql';

@InputType()
class UserRoleConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class UserRoleInput {
  @Field()
  readonly connect: UserRoleConnectInput;
}

@InputType()
class UserInput {
  @Field()
  readonly email: string;
  @Field()
  readonly name: string;
  @Field()
  readonly username: string;
  @Field()
  readonly role: UserRoleInput;
  @Field()
  readonly password: string;
  @Field()
  readonly passwordConfirmation: string;
}

export default UserInput;
