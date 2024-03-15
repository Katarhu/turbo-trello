import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Identity } from "@prisma/client";

import { JwtConstants } from "../constants/jwt.constants";
import { JwtPayload } from "../types/jwt.types";

@Injectable()
export class AppJwtService {
  constructor(private jwtService: JwtService) {}

  private createJwtPayload(identity: Identity): JwtPayload {
    return {
      id: identity.id,
      email: identity.email,
    };
  }

  createAccessToken(identity: Identity) {
    const payload = this.createJwtPayload(identity);

    return this.jwtService.sign(payload, { expiresIn: JwtConstants.accessTokenExpireTime });
  }

  createRefreshToken(identity: Identity) {
    const payload = this.createJwtPayload(identity);

    return this.jwtService.sign(payload, { expiresIn: JwtConstants.refreshTokenExpireTime });
  }
}
