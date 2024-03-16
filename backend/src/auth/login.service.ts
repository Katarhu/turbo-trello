import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { AuthConstants } from "~core/constants/auth.constants";
import { UserService } from "~user/user.service";

import { EncryptionService } from "./encryption.service";

@Injectable()
export class LoginService {
  constructor(
    private userService: UserService,
    private encryptionService: EncryptionService
  ) {}

  getUserByEmail(email: string) {
    return this.userService.getUserByEmail(email);
  }

  checkIsLoginAttemptsSpent(loginAttempts: number) {
    return loginAttempts >= AuthConstants.maximumLoginAttempts;
  }

  checkIsRestrictionContinues(loginRestrictedUntil: Date) {
    return new Date() < loginRestrictedUntil;
  }

  validateCredentials(user: User, incomingPassword: string) {
    return this.encryptionService.comparePasswords(incomingPassword, user.password);
  }

  clearLoginRestriction(userId: string) {
    return this.userService.clearLoginRestriction(userId);
  }

  invalidateLoginAttempt(userId: string) {
    return this.userService.incrementLoginAttempts(userId);
  }

  handleCurrentLoginAttempt(user: User) {
    if (user.loginAttempts !== AuthConstants.maximumLoginAttempts) return;

    const currentTimeMs = new Date().getTime();

    const restrictedUntil = new Date(currentTimeMs + AuthConstants.loginRestrictionTimeMin * 60_000);

    return this.userService.restrictLogin(user, restrictedUntil);
  }
}
