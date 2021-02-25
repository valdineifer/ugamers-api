import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/users.repository';
import { UserService } from '../services/users.service';
import { UsersController } from '../controllers/users.controller';
import { PassportModule } from '@nestjs/passport';
import UserResolver from 'src/resolvers/user.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [UserService, UserResolver],
  // controllers: [UsersController],
})
export class UsersModule {}
