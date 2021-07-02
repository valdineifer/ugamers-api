import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import SemanticException from 'src/exceptions/semantic.exception';
import { ApiErrors } from 'src/constants/errorConstants';
import hashPassword from 'src/utils/hashPassword';
import * as crypto from 'crypto';
import CreateUserDto from '../dtos/users/create-user.dto';
import User from '../entities/User';
import UpdateUserDto from '../dtos/users/update-user.dto';
import PrismaService from './prisma.service';

@Injectable()
export default class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<any> {
    const user = await this.prisma.user.count({
      where: { OR: [{ username: data.username, email: data.email }] },
    });
    if (user) {
      throw new SemanticException('username', ApiErrors.userExists);
    }

    const readyData = {
      ...data,
      confirmationToken: crypto.randomBytes(32).toString('hex'),
      password: await hashPassword(data.password),
    };

    try {
      return await this.prisma.user.create({ data: readyData });
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

  async findUserById(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    return user;
  }

  async findUserByUsername(username: string): Promise<any> {
    const user = await this.prisma.user.findFirst({ where: { username } });

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    const result = await this.prisma.user.update({ data: updateUserDto, where: { id } });

    // TODO: check implementation
    if (!result) {
      const user = await this.findUserById(id);
      return user;
    }

    return null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.prisma.user.delete({ where: { id: userId } });

    if (!result) {
      return false;
    }

    return true;
  }

  async findUsers(): Promise<any[]> {
    return this.prisma.user.findMany();
  }
}
