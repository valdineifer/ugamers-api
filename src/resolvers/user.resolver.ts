import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import User from 'src/entities/user.entity';
import UserInput from './input/user.input'
import { UserService } from 'src/services/users.service';

@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Query(() => User, { nullable: true })
  public async user(@Args('id', { type: () => String }) id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  public async createAdminUser(@Args() data: UserInput): Promise<User> {
    return this.userService.createAdminUser({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
  }

  @Mutation(() => User)
  public async createUser(@Args() data: UserInput): Promise<User> {
    return this.userService.createUser({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    });
  }
}
export default UserResolver;