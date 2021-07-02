import { Module } from '@nestjs/common';
import UserResolver from 'src/resolvers/user.resolver';
import RoleService from 'src/services/role.service';
import UserService from '../services/users.service';
import PrismaModule from './prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver, RoleService],
})
export default class UsersModule {}
