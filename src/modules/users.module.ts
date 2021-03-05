import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/users.repository';
import { UserService } from '../services/users.service';
import { PassportModule } from '@nestjs/passport';
import UserResolver from 'src/resolvers/user.resolver';
import { RoleRepository } from 'src/repositories/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, UserResolver],
  // controllers: [UsersController],
})
export class UsersModule {}
