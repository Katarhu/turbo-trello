import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { TokenConfig } from "~config/TokenConfig";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { ITokenService } from "~features/auth/application/services/TokenService/ITokenService";

@Injectable()
export class TokenService implements ITokenService {
  constructor(private jwtService: JwtService) {}

  private createJwtPayload(dto: LoginAttemptDto): IUserPayload {
    return {
      id: dto.id,
      email: dto.email,
    };
  }

  createAccessToken(dto: LoginAttemptDto): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: TokenConfig.accessTokenExpireTime });
  }

  createRefreshToken(dto: LoginAttemptDto): string {
    const payload = this.createJwtPayload(dto);

    return this.jwtService.sign(payload, { expiresIn: TokenConfig.refreshTokenExpireTime });
  }

  validateSync(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (err) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }
  }

  decode(token: string): IUserPayload {
    return this.jwtService.decode(token);
  }
}
