import { LoggedInUserDto } from "~features/auth/application/dto/Login/LoggedInUserDto";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

export interface ILoginAttemptRepository {
  getUserByEmail(email: string): Promise<LoginAttemptDto | null>;

  getLoggedInUser(email: string): Promise<LoggedInUserDto>;

  saveNewLoginAttempt(userId: number, loginAttempt: LoginAttempt): Promise<void>;
}
