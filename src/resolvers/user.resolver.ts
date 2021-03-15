// eslint-disable-next-line max-classes-per-file
import {
  Args,
  Context,
  Field,
  Mutation,
  ObjectType,
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
import { Logger } from '@nestjs/common';
import { FieldError, MyContext } from '../types';
import UserInput from './input/user.input';
import LoginInput from './input/login.input';
import { ApiErrors } from '../constants/errorConstants';
import IdInput from './input/id.input';

// TODO: verify if this is a good place for declare module and interface
declare module 'express-session' {
  interface Session {
    userId: number;
  }
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver(() => User)
class UserResolver {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  @Query(() => UserResponse, { nullable: true })
  public async getUser(@Args() args: IdInput): Promise<UserResponse> {
    return { user: await this.userService.findUserById(args.id) };
  }

  @Mutation(() => UserResponse)
  public async createUser(@Args('data') data: UserInput): Promise<UserResponse> {
    const userCreated = await this.userService.createUser({
      ...data,
      email: data.email.toLowerCase().trim(),
      roleId: data.role.id,
    });

    return { user: userCreated };
  }

  @Mutation(() => UserResponse)
  public async login(
    @Args('data') data: LoginInput,
    @Context() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await this.userService.findUserByUsername(data.username);

    if (!user) {
      return {
        errors: [{ field: 'username', message: ApiErrors.userNotFound('username') }],
      };
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      return { errors: [{ field: 'password', message: ApiErrors.passwordDiff }] };
    }

    req.session.userId = user.id;

    return { user };
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

  @Query(() => UserResponse, { nullable: true })
  public async me(@Context() { req }: MyContext): Promise<UserResponse> {
    if (!req.session.userId) {
      return null;
    }

    const user = await this.userService.findUserById(req.session.userId);

    return { user };
  }

  @ResolveField(() => Role)
  public async role(@Parent() parent: User): Promise<Role> {
    return this.roleRepository.findOne(parent.roleId);
  }
}

export default UserResolver;
