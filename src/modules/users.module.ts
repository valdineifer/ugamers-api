import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserResolver from 'src/resolvers/user.resolver';
import RoleRepository from 'src/repositories/role.repository';
import UserService from '../services/users.service';
import UserRepository from '../repositories/users.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, RoleRepository])],
  providers: [UserService, UserResolver],
  // controllers: [UsersController],
})
export default class UsersModule {}
