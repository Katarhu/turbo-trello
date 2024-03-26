import { LoginConfig } from "~config/LoginConfig";

export class LoginAttempt {
  private _unsuccessfulLoginAttemptsCount: number;
  private _banStartTime: Date;

  constructor(unsuccessfulLoginAttemptsCount: number = 0, banStartTime: Date = LoginConfig.defaultBanStart) {
    this._unsuccessfulLoginAttemptsCount = unsuccessfulLoginAttemptsCount;
    this._banStartTime = banStartTime;
  }

  get unsuccessfulLoginAttemptsCount(): number {
    return this._unsuccessfulLoginAttemptsCount;
  }

  get banStartTime(): Date {
    return this._banStartTime;
  }

  set unsuccessfulLoginAttemptsCount(unsuccessfulLoginAttemptsCount: number) {
    this._unsuccessfulLoginAttemptsCount = unsuccessfulLoginAttemptsCount;
  }

  set banStartTime(banStartTime: Date) {
    this._banStartTime = banStartTime;
  }

  incrementLoginAttempts(): void {
    this._unsuccessfulLoginAttemptsCount++;
  }

  clearLoginAttempts(): void {
    this._unsuccessfulLoginAttemptsCount = 0;
  }

  setBanStart(banStart: Date): void {
    this._banStartTime = banStart;
  }
}
