import { ICommand } from "~common/application/interfaces/ICommand";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { RegisterUserResponse } from "~features/auth/application/responces/RegisterUserResponse";

export abstract class ICreateUserCommand implements ICommand<RegisterUserRequest, RegisterUserResponse> {
  abstract execute(input: RegisterUserRequest): Promise<RegisterUserResponse>;
}
