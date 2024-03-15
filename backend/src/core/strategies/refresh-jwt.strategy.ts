import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "process";

import { JwtPayload } from "../types/jwt.types";
import { IdentityService } from "~identity/identity.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(private identityService: IdentityService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET"],
    });
  }

  async validate(payload: JwtPayload) {
    const identity = await this.identityService.getUserByEmail(payload.email);

    return identity;
  }
}
