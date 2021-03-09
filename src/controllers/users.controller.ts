import {
  Controller,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Param,
  Patch,
  ForbiddenException,
  Delete,
} from '@nestjs/common';
import UserService from '../services/users.service';
import ReturnUserDto from '../dtos/users/return-user.dto';
import RolesGuard from '../guards/roles.guard';
import Roles from '../decorators/roles.decorator';
import UserRole from '../helpers/enum/user-roles.enum';
import UpdateUserDto from '../dtos/users/update-user.dto';
import User from '../entities/User';
import GetUser from '../decorators/get-user.decorator';

@Controller('users')
@UseGuards(RolesGuard)
export default class UsersController {
  constructor(private userService: UserService) {}

  @Get(':id')
  @Roles(UserRole.ADMIN)
  async findUserById(@Param('id') id: number): Promise<ReturnUserDto> {
    const user = await this.userService.findUserById(id);
    return {
      user,
      message: 'Usuário encontrado',
    };
  }

  @Patch(':id')
  async updateUser(
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
    @GetUser() user: User,
    @Param('id') id: number,
  ): Promise<User> {
    if (user.role.id !== UserRole.ADMIN && user.id !== id) {
      throw new ForbiddenException(
        'Você não tem autorização para acessar esse recurso',
      );
    } else {
      return this.userService.updateUser(updateUserDto, id);
    }
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: number): Promise<{ message: string }> {
    await this.userService.deleteUser(id);
    return {
      message: 'Usuário removido com sucesso',
    };
  }
}
