import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [NestJwtModule.register({ secret: '123123' })],
  providers: [JwtService],
})
export class JwtModule {}
