import { LoggedInUserDto } from "~features/auth/application/dto/Login/LoggedInUserDto";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { LoginUserRequest } from "~features/auth/application/requests/LoginUserRequest";

export interface IAuthService {
  getUserByEmail(email: string): Promise<LoginAttemptDto>;

  getLoggedInUser(email: string): Promise<LoggedInUserDto>;

  validateLoginAttempt(user: LoginAttemptDto, input: LoginUserRequest): Promise<void>;
}
