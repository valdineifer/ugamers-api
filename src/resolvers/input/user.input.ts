import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
class UserInput {
  @Field()
  readonly email: string;
  @Field()
  readonly name: string;
  @Field()
  readonly username: string;
  @Field()
  readonly role: string;
  @Field()
  readonly status: boolean;
  @Field()
  readonly password: string;
  @Field()
  readonly passwordConfirmation: string;
}

export default UserInput;