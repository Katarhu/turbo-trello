import { BaseEntity } from "~common/domain/BaseEntity";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

export class User extends BaseEntity {
  private readonly _email: string;
  private readonly _password: string;
  private readonly _loginAttempt: LoginAttempt;

  constructor(id: number, email: string, password: string, unsuccessfulLoginAttemptsCount: number, banStartTime: Date) {
    super(id);

    this._email = email;
    this._password = password;

    this._loginAttempt = new LoginAttempt(unsuccessfulLoginAttemptsCount, banStartTime);
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get loginAttempt(): LoginAttempt {
    return this._loginAttempt;
  }

  get unsuccessfulLoginAttemptsCount(): number {
    return this._loginAttempt.unsuccessfulLoginAttemptsCount;
  }

  get banStartTime(): Date {
    return this._loginAttempt.banStartTime;
  }
}
