import { Body, Controller, Inject, Post } from "@nestjs/common";

import { ILoginUserCommand } from "~features/auth/application/commands/ILoginUserCommand";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { LoginUserResponse } from "~features/auth/application/responces/LoginUserResponse";
import { AuthCommandToken } from "~features/auth/common/diTokens";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { UserCommandToken } from "~features/user/common/diTokens";

@Controller("/auth")
export class AuthController {
  @Inject(UserCommandToken.CREATE_USER_COMMAND)
  private _createUserCommand: ICreateUserCommand;

  @Inject(AuthCommandToken.LOGIN_USER_COMMAND)
  private _loginUserCommand: ILoginUserCommand;

  @Post("/register")
  async register(@Body() dto: RegisterUserRequest) {
    await this._createUserCommand.execute(dto);
  }

  @Post("/login")
  async login(@Body() dto: LoginUserRequest): Promise<LoginUserResponse> {
    return await this._loginUserCommand.execute(dto);
  }
}
