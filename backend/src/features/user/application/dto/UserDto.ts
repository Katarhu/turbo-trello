import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";

export class UserDto {
  private readonly _id: number;
  private readonly _email: string;
  private readonly _loginAttempt: LoginAttempt;

  constructor(id: number, email: string, loginAttempt: LoginAttempt) {
    this._id = id;

    this._email = email;

    this._loginAttempt = loginAttempt;
  }

  get email(): string {
    return this._email;
  }

  get loginAttempt(): LoginAttempt {
    return this._loginAttempt;
  }

  get id(): number {
    return this._id;
  }
}
