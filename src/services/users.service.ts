import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SemanticException from 'src/exceptions/semantic.exception';
import { ApiErrors } from 'src/constants/errorConstants';
import UserRepository from '../repositories/users.repository';
import CreateUserDto from '../dtos/users/create-user.dto';
import User from '../entities/User';
import UpdateUserDto from '../dtos/users/update-user.dto';

@Injectable()
export default class UserService {
  constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.username = :username', { username: data.username })
      .orWhere('user.email = :email', { email: data.email })
      .getCount();

    if (user) {
      throw new SemanticException('username', ApiErrors.userExists);
    }

    return this.userRepository.createUser(data);
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.userRepository.findOne(userId);

    return user;
  }

  async findUserByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto, id: number): Promise<User> {
    const result = await this.userRepository.update({ id }, updateUserDto);

    if (result.affected > 0) {
      const user = await this.findUserById(id);
      return user;
    }

    return null;
  }

  async deleteUser(userId: number): Promise<boolean> {
    const result = await this.userRepository.delete({ id: userId });

    if (result.affected === 0) {
      return false;
    }

    return true;
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
