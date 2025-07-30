import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as NestJwtService } from '@nestjs/jwt';

import { TokenPairDto } from 'src/shared/dto/token-pair.dto';
import { JwtPayload } from 'src/shared/shared/jwt-payload.type';

@Injectable()
export class JwtService {
  constructor(private readonly nestJwtService: NestJwtService) {}

  public generateAT(payload: JwtPayload): string {
    return this.nestJwtService.sign(
      {
        sub: payload.sub,
        email: payload.email,
      },
      {
        expiresIn: '1h',
      },
    );
  }

  public generateRT(payload: JwtPayload): string {
    return this.nestJwtService.sign(
      {
        sub: payload.sub,
        email: payload.email,
      },
      {
        expiresIn: '30d',
      },
    );
  }

  public verify(token: string): JwtPayload {
    return this.nestJwtService.verify(token);
  }

  public decode(token: string): JwtPayload | null {
    return this.nestJwtService.decode(token);
  }

  public refreshTokens(refreshToken: string): TokenPairDto {
    let payload: JwtPayload;

    try {
      payload = this.verify(refreshToken);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return {
      accessToken: this.generateAT(payload),
      refreshToken: this.generateRT(payload),
    };
  }
}
