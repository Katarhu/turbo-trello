import { Body, Controller, Inject, Post } from "@nestjs/common";

import { TokenConfig } from "~config/TokenConfig";
import { ILoginUserCommand } from "~features/auth/application/commands/Login/ILoginUserCommand";
import { IRefreshTokenCommand } from "~features/auth/application/commands/Token/IRefreshTokenCommand";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { LoginUserResponse } from "~features/auth/application/responses/LoginUserResponse";
import { RefreshTokenResponse } from "~features/auth/application/responses/RefreshTokenResponce";
import { AuthCommandToken } from "~features/auth/diTokens";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { UserCommandToken } from "~features/user/diTokens";
import { Cookies } from "~utils/decorators/CookieDecorator";

@Controller("/auth")
export class AuthController {
  @Inject(UserCommandToken.CREATE_USER_COMMAND)
  private _createUserCommand: ICreateUserCommand;

  @Inject(AuthCommandToken.LOGIN_USER_COMMAND)
  private _loginUserCommand: ILoginUserCommand;

  @Inject(AuthCommandToken.REFRESH_TOKEN_COMMAND)
  private _refreshTokenCommand: IRefreshTokenCommand;

  @Post("/register")
  async register(@Body() body: RegisterUserRequest): Promise<void> {
    await this._createUserCommand.execute(body);
  }

  @Post("/login")
  async login(@Body() body: LoginUserRequest): Promise<LoginUserResponse> {
    return await this._loginUserCommand.execute(body);
  }

  @Post("/refresh")
  async refreshAccessToken(@Cookies(TokenConfig.cookieTokenKey) refreshToken: string): Promise<RefreshTokenResponse> {
    return await this._refreshTokenCommand.execute({
      token: refreshToken,
    });
  }
}
