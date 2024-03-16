import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";

import { JwtConstants } from "../constants/jwt.constants";
import { JwtPayload } from "../types/jwt.types";

@Injectable()
export class AppJwtService {
  constructor(private jwtService: JwtService) {}

  private createJwtPayload(user: User): JwtPayload {
    return {
      id: user.id,
      email: user.email,
    };
  }

  createAccessToken(user: User) {
    const payload = this.createJwtPayload(user);

    return this.jwtService.sign(payload, { expiresIn: JwtConstants.accessTokenExpireTime });
  }

  createRefreshToken(user: User) {
    const payload = this.createJwtPayload(user);

    return this.jwtService.sign(payload, { expiresIn: JwtConstants.refreshTokenExpireTime });
  }
}
