import { TokenPairDto } from 'src/shared/dto/token-pair.dto';
import { LoginDto } from './dtos/login.dto';
import { RegistrationDto } from './dtos/registration.dto';
import { ConfirmCodeActions } from 'src/users/types/confirm-code-actions.type';
import { User } from 'src/users/entities/user.entity';

export interface IAuthService {
  registration(body: RegistrationDto): Promise<void>;
  login(body: LoginDto): Promise<TokenPairDto>;
  logout(refreshToken: string): Promise<void>;
  initConfirmation(action: ConfirmCodeActions, userId: string): Promise<void>;
  confirmEmail(confirmCode: string, userId): Promise<void>;
  changePassword(newPassword: string): Promise<void>;
  changeName(newName: string): Promise<User>;
  changeSurname(newSurname: string): Promise<User>;
  deleteAccount(userId: string): Promise<void>;
}
