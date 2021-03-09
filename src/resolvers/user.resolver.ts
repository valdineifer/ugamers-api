import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import User from 'src/entities/User';
import UserService from 'src/services/users.service';
import Role from 'src/entities/Role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import UserInput from './input/user.input';

@Resolver(() => User)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Query(() => User, { nullable: true })
  public async getUser(
    @Args('id', { type: () => Number }) id: number,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Mutation(() => User)
  public async createUser(@Args('data') data: UserInput): Promise<User> {
    return this.userService.createUser({
      name: data.name,
      email: data.email.toLowerCase().trim(),
      username: data.username,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
      roleId: data.role.connect.id,
    });
  }

  @ResolveField(() => Role)
  public async role(@Parent() parent: User): Promise<Role> {
    return this.roleRepository.findOne(parent.roleId);
  }
}

export default UserResolver;
