import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class LoginInput {
  @Field()
  readonly username: string;

  @Field()
  readonly password: string;
}
