import { Args, Mutation, Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import User from 'src/entities/User';
import UserInput from './input/user.input'
import { UserService } from 'src/services/users.service';
import { UserRole } from 'src/helpers/enum/user-roles.enum';
import Role from 'src/entities/Role';

@Resolver()
class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Query(() => User, { nullable: true })
  public async getUser(@Args('id', { type: () => Number }) id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.createUser({
      name: data.name,
      email: data.email,
      username: data.username,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      roleId: data.role.connect.id
    });
  }

  // TODO: finalizar busca de usuários com roles
  // @ResolveProperty()
  // public async role(@Parent() parent): Promise<Role> {
  //   return 1;
  // }
}
export default UserResolver;