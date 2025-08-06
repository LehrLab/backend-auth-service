import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from 'src/jwt/jwt.module';
import { EmailModule } from 'src/email/emal.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule, EmailModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
