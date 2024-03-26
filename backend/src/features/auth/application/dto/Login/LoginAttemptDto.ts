import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

export class LoginAttemptDto {
  readonly id: number;
  readonly email: string;
  private readonly _password: string;
  private readonly _loginAttempt: LoginAttempt;

  constructor(id: number, email: string, password: string, loginAttempts: LoginAttempt) {
    this.id = id;

    this.email = email;
    this._password = password;

    this._loginAttempt = loginAttempts;
  }

  get password(): string {
    return this._password;
  }

  get unsuccessfulLoginAttemptsCount(): number {
    return this._loginAttempt.unsuccessfulLoginAttemptsCount;
  }

  get banStartTime(): Date {
    return this._loginAttempt.banStartTime;
  }
}
