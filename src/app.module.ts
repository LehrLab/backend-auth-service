import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [JwtModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
