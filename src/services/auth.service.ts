import {
  Injectable,
  UnprocessableEntityException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { randomBytes } from 'crypto';
import { UserRepository } from '../repositories/users.repository';
import { CreateUserDto } from '../dtos/users/create-user.dto';
import User from '../entities/User';
import { CredentialsDto } from '../dtos/auth/credentials.dto';
import { ChangePasswordDto } from '../dtos/auth/change-password.dto';

@Injectable()
export default class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new UnprocessableEntityException('As senhas não conferem');
    } else {
      const user = await this.userRepository.createUser(createUserDto);
      const mail = {
        to: user.email,
        from: 'noreply@application.com',
        subject: 'Email de confirmação',
        template: 'email-confirmation',
        context: {
          token: user.confirmationToken,
        },
      };
      await this.mailerService.sendMail(mail);
      return user;
    }
  }

  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const user = await this.userRepository.checkCredentials(credentialsDto);

    if (user === null) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const jwtPayload = {
      id: user.id,
    };
    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }

  async confirmEmail(confirmationToken: string): Promise<void> {
    const result = await this.userRepository.update(
      { confirmationToken },
      { confirmationToken: null },
    );
    if (result.affected === 0) throw new NotFoundException('Token inválido');
  }

  async sendRecoverPasswordEmail(email: string): Promise<void> {
    const user = await this.userRepository.findOne({ email });

    if (!user)
      throw new NotFoundException('Não há usuário cadastrado com esse email.');

    user.recoverToken = randomBytes(32).toString('hex');
    await user.save();

    const mail = {
      to: user.email,
      from: 'noreply@application.com',
      subject: 'Recuperação de senha',
      template: 'recover-password',
      context: {
        token: user.recoverToken,
      },
    };
    await this.mailerService.sendMail(mail);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { password, passwordConfirmation } = changePasswordDto;

    if (password !== passwordConfirmation)
      throw new UnprocessableEntityException('As senhas não conferem');

    await this.userRepository.changePassword(id, password);
  }

  async resetPassword(
    recoverToken: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.userRepository.findOne(
      { recoverToken },
      {
        select: ['id'],
      },
    );
    if (!user) throw new NotFoundException('Token inválido.');

    await this.changePassword(user.id.toString(), changePasswordDto);
  }
}
