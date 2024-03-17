import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { LoginService } from "../login.service";

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private loginService: LoginService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    const user = await this.loginService.getUserByEmail(email);

    if (!user) throw new BadRequestException({ message: "Email or password is incorrect" });

    const isLoginAttemptsSpent = this.loginService.checkIsLoginAttemptsSpent(user.loginAttempts);

    if (isLoginAttemptsSpent) {
      const isRestrictionContinues = this.loginService.checkIsRestrictionContinues(user.loginRestrictedUntil);

      if (isRestrictionContinues) throw new BadRequestException({ message: "Too many attempts, try again later" });
      else await this.loginService.clearLoginRestriction(user.id);
    }

    const isCredentialsValid = await this.loginService.validateCredentials(user, password);

    if (isCredentialsValid) return user;

    const updatedUser = await this.loginService.invalidateLoginAttempt(user.id);

    await this.loginService.handleCurrentLoginAttempt(updatedUser);

    throw new BadRequestException("Email or password is incorrect");
  }
}
