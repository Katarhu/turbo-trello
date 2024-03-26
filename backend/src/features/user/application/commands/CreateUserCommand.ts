import { Inject, Injectable, Scope } from "@nestjs/common";

import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { IUserService } from "~features/user/application/services/IUserService";
import { UserServiceToken } from "~features/user/common/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateUserCommand implements ICreateUserCommand {
  @Inject(UserServiceToken.USER_SERVICE)
  private _userService: IUserService;

  async execute(input: RegisterUserRequest): Promise<void> {
    await this._userService.validateUserCreation(input.email);

    await this._userService.createUser(input);
  }
}