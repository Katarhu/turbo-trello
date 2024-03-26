import { JwtService } from "@nestjs/jwt";

import { ITokenPayload } from "~common/application/interfaces/ITokenPayload";
import { JwtConfig } from "~config/JwtConfig";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { ITokenService } from "~features/auth/application/services/TokenService/ITokenService";

export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

  private createJwtPayload(dto: LoginAttemptDto): ITokenPayload {
    return {
      id: dto.id,
      email: dto.email,
    };
  }

  createAccessToken(dto: LoginAttemptDto): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: JwtConfig.accessTokenExpireTime });
  }

  createRefreshToken(dto: LoginAttemptDto): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: JwtConfig.refreshTokenExpireTime });
  }
}
