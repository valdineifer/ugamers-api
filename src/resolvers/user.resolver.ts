import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import User from 'src/entities/User';
import UserService from 'src/services/users.service';
import Role from 'src/entities/Role';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { MyContext } from 'src/types';
import UserInput from './input/user.input';
import LoginInput from './input/login.input';

// TODO: verify if this is a good place for declare module and interface
declare module 'express-session' {
  interface Session {
    userId: number;
  }
}

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
  public async getUser(@Args('id', { type: () => Number }) id: number): Promise<User> {
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
      roleId: data.role.id,
    });
  }

  @Mutation(() => User)
  public async login(
    @Args('data') data: LoginInput,
    @Context() { req }: MyContext,
  ): Promise<User> {
    const user = await this.userService.findUserByUsername(data.username);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      throw new UnprocessableEntityException('Senha incorreta');
    }

    req.session.userId = user.id;

    return user;
  }

  @Mutation(() => Boolean)
  logout(@Context() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(process.env.SESSION_COOKIE);
        if (err) {
          Logger.error(err);
          resolve(false);
          return;
        }

        resolve(true);
      }),
    );
  }

  @Query(() => User, { nullable: true })
  public async me(@Context() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    return this.userService.findUserById(req.session.userId);
  }

  @ResolveField(() => Role)
  public async role(@Parent() parent: User): Promise<Role> {
    return this.roleRepository.findOne(parent.roleId);
  }
}

export default UserResolver;
