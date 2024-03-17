import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import * as process from "process";

import { JwtPayload } from "~core/types/jwt.types";
import { UserService } from "~user/user.service";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, "jwt-refresh") {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField("refreshToken"),
      ignoreExpiration: false,
      secretOrKey: process.env["JWT_SECRET"],
    });
  }

  async validate(payload: JwtPayload) {
    return this.userService.getUserByEmail(payload.email);
  }
}
