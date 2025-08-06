import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { IAuthService } from './auth.service.contract';
import { TokenPairDto } from 'src/shared/dto/token-pair.dto';
import { User } from 'src/users/entities/user.entity';
import { ConfirmCodeActions } from 'src/users/types/confirm-code-actions.type';
import { LoginDto } from './dtos/login.dto';
import { RegistrationDto } from './dtos/registration.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(private readonly usersService: UsersService) {}

  async registration(body: RegistrationDto): Promise<void> {
    if (body.password !== body.repeatPassword) {
      throw new BadRequestException('Passwords must be equal');
    }

    const userWithEmail = await this.usersService.getByEmail(body.email);

    if (userWithEmail && userWithEmail.emailIsConfirmed) {
      throw new ForbiddenException('You must confirm your email');
    }

    if (userWithEmail) {
      throw new ConflictException('User with this email already exists');
    }

    await this.usersService.create(body);
  }

  login(body: LoginDto): Promise<TokenPairDto> {
    throw new Error('Method not implemented.');
  }

  logout(refreshToken: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  initConfirmation(action: ConfirmCodeActions, userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  confirmEmail(confirmCode: string, userId: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  changePassword(newPassword: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  changeName(newName: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  changeSurname(newSurname: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  deleteAccount(userId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
