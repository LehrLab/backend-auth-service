import { Controller, Post, Put } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('registration')
  async registration() {}

  @Post('login')
  async login() {}

  @Post('logout')
  async logout() {}

  @Post('email/start-confirmation')
  async startEmailConfirmation() {}

  @Post('email/confirm')
  async confirmEmail() {}

  @Post('password/start-changing')
  async startPasswordChanging() {}

  @Put('password/change')
  async changePassword() {}
}
