import { IsEmail, Length, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsEmail()
  email: string;

  @Length(2, 32)
  name: string;

  @Length(2, 32)
  surname: string;

  @MinLength(8)
  password: string;

  @MinLength(8)
  repeatPassword: string;
}
