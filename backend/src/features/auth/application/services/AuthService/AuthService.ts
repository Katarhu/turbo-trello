import { BadRequestException, ForbiddenException, Inject } from "@nestjs/common";

import { ICryptoService } from "~common/application/services/CryptoService/ICryptoService";
import { CommonServiceToken } from "~common/diTokens";
import { LoginConfig } from "~config/LoginConfig";
import { LoggedInUserDto } from "~features/auth/application/dto/Login/LoggedInUserDto";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { calculateRemainingBanTime } from "~features/auth/application/helpers/calculateRemainingBanTime";
import { checkIsBanned } from "~features/auth/application/helpers/checkIsBanned";
import { createBanTime } from "~features/auth/application/helpers/createBanTime";
import { formatTime, TimeFormat } from "~features/auth/application/helpers/formatTime";
import { ILoginAttemptRepository } from "~features/auth/application/interfaces/ILoginAttemptRepository";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { AuthRepositoryToken } from "~features/auth/common/diTokens";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

import { IAuthService } from "./IAuthService";

export class AuthService implements IAuthService {
  @Inject(AuthRepositoryToken.LOGIN_ATTEMPT_REPOSITORY)
  private _loginAttemptRepository: ILoginAttemptRepository;

  @Inject(CommonServiceToken.CRYPTO_SERVICE)
  private _cryptoService: ICryptoService;

  async getUserByEmail(email: string) {
    const user = await this._loginAttemptRepository.getUserByEmail(email);

    if (!user) throw new BadRequestException({ message: "Email or password is incorrect" });

    return user;
  }

  async validateLoginAttempt(user: LoginAttemptDto, request: LoginUserRequest) {
    const newLoginAttempt = this.validateCurrentAttemptState(user);

    const isPasswordCorrect = await this._cryptoService.compare(request.password, user.password);

    if (isPasswordCorrect) return;

    newLoginAttempt.incrementLoginAttempts();

    await this.saveNewLoginAttempt(user, newLoginAttempt);

    throw new BadRequestException({ message: "Email or password is incorrect" });
  }

  async getLoggedInUser(email: string): Promise<LoggedInUserDto> {
    return await this._loginAttemptRepository.getLoggedInUser(email);
  }

  private validateCurrentAttemptState(user: LoginAttemptDto): LoginAttempt {
    const isLoginRestricted = checkIsBanned(user.banStartTime, LoginConfig.loginRestrictionTimeMs);

    if (isLoginRestricted) {
      const banTimeRemaining = calculateRemainingBanTime(user.banStartTime, LoginConfig.loginRestrictionTimeMs);

      throw new ForbiddenException({
        message: `Too many attempts, try again in ${formatTime(banTimeRemaining, TimeFormat.MIN)} minutes`,
        banTimeRemaining,
      });
    }

    return new LoginAttempt(user.unsuccessfulLoginAttemptsCount, user.banStartTime);
  }

  private async saveNewLoginAttempt(user: LoginAttemptDto, loginAttempt: LoginAttempt) {
    if (loginAttempt.unsuccessfulLoginAttemptsCount === LoginConfig.maximumLoginAttempts) {
      const newBanTime = createBanTime();

      loginAttempt.setBanStart(newBanTime);
      loginAttempt.clearLoginAttempts();
    }

    await this._loginAttemptRepository.saveNewLoginAttempt(user.id, loginAttempt);
  }
}
