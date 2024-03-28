import { Inject, Injectable, Scope } from "@nestjs/common";

import { RegisterUserResponse } from "~features/auth/application/responses/RegisterUserResponse";
import { ICreateUserCommand } from "~features/user/application/commands/ICreateUserCommand";
import { CreateUserDto } from "~features/user/application/dto/CreateUserDto";
import { IUserService } from "~features/user/application/services/IUserService";
import { UserServiceToken } from "~features/user/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateUserCommand implements ICreateUserCommand {
  @Inject(UserServiceToken.USER_SERVICE)
  private _userService: IUserService;

  async execute(input: CreateUserDto): Promise<RegisterUserResponse> {
    await this._userService.validateUserCreation(input.email);

    await this._userService.createUser(input);

    return new RegisterUserResponse();
  }
}
