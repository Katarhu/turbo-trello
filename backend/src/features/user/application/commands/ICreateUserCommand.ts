import { ICommand } from "~common/application/interfaces/ICommand";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";

export abstract class ICreateUserCommand implements ICommand<RegisterUserRequest, void> {
  abstract execute(input: RegisterUserRequest): Promise<void>;
}
