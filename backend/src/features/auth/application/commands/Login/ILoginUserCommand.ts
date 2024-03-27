import { ICommand } from "~common/application/interfaces/ICommand";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";
import { LoginUserResponse } from "~features/auth/application/responces/LoginUserResponse";

export abstract class ILoginUserCommand extends ICommand<LoginUserRequest, LoginUserResponse> {
  abstract execute(input: LoginUserRequest): Promise<LoginUserResponse>;
}
