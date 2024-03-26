import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";

export interface IUserService {
  validateUserCreation(email: string): Promise<void>;

  createUser(request: RegisterUserRequest): Promise<void>;
}
