import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Identity } from "@prisma/client";
import { Strategy } from "passport-local";

import { IdentityService } from "~identity/identity.service";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private identityService: IdentityService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<Identity> {
    const identity = await this.identityService.validateUser(email, password);

    if (!identity) throw new BadRequestException("Email or password is incorrect");

    return identity;
  }
}
