import { Inject, Injectable, Scope } from "@nestjs/common";

import { ILoginUserCommand } from "~features/auth/application/commands/ILoginUserCommand";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { LoginUserResponse } from "~features/auth/application/responces/LoginUserResponse";
import { IAuthService } from "~features/auth/application/services/AuthService/IAuthService";
import { ITokenService } from "~features/auth/application/services/TokenService/ITokenService";
import { AuthServiceToken } from "~features/auth/common/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class LoginUserCommand implements ILoginUserCommand {
  @Inject(AuthServiceToken.AUTH_SERVICE)
  private _authService: IAuthService;

  @Inject(AuthServiceToken.TOKEN_SERVICE)
  private _tokenService: ITokenService;

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    const user = await this._authService.getUserByEmail(request.email);

    await this._authService.validateLoginAttempt(user, request);

    const accessToken = this._tokenService.createAccessToken(user);
    const refreshToken = this._tokenService.createRefreshToken(user);

    return new LoginUserResponse(user.id, user.email, accessToken, refreshToken);
  }
}
