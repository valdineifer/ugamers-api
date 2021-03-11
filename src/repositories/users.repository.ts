import { EntityRepository, Repository } from 'typeorm';
import * as crypto from 'crypto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import hashPassword from 'src/utils/hashPassword';
import CreateUserDto from '../dtos/users/create-user.dto';
import User from '../entities/User';
import CredentialsDto from '../dtos/auth/credentials.dto';
import FindUsersQueryDto from '../dtos/users/find-users-query-dto';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  async findUsers(
    queryDto: FindUsersQueryDto,
  ): Promise<{ users: User[]; total: number }> {
    const status = queryDto.status === undefined ? true : queryDto.status;
    const page = queryDto.page < 1 ? 1 : queryDto.page;
    const limit = queryDto.limit > 100 ? 100 : queryDto.limit;

    const { email, name, role } = queryDto;
    const query = this.createQueryBuilder('user');
    query.where('user.status = :status', { status });

    if (email) {
      query.andWhere('user.email ILIKE :email', { email: `%${email}%` });
    }

    if (name) {
      query.andWhere('user.name ILIKE :name', { name: `%${name}%` });
    }

    if (role) {
      query.andWhere('user.role = :role', { role });
    }
    query.skip((page - 1) * limit);
    query.take(+limit);
    query.orderBy(queryDto.sort ? JSON.parse(queryDto.sort) : undefined);
    query.select(['user.name', 'user.email', 'user.role', 'user.status']);

    const [users, total] = await query.getManyAndCount();

    return { users, total };
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, name, username, password, roleId } = createUserDto;

    const user = this.create();
    user.email = email;
    user.name = name;
    user.username = username;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.password = await hashPassword(password);
    user.roleId = roleId;

    try {
      await user.save();
      delete user.password;
      return user;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException('Endereço de email já está em uso');
      } else {
        throw new InternalServerErrorException(
          error,
          'Erro ao salvar o usuário no banco de dados',
        );
      }
    }
  }

  async changePassword(id: string, password: string): Promise<void> {
    const user = await this.findOne(id);

    // TODO: add validation if user doesn't exists
    user.password = await hashPassword(password);
    user.recoverToken = null;

    await user.save();
  }

  async checkCredentials(credentialsDto: CredentialsDto): Promise<User> {
    const { email, password } = credentialsDto;
    const user = await this.findOne({ email, status: true });

    if (user && (await user.checkPassword(password))) {
      return user;
    }
    return null;
  }
}
