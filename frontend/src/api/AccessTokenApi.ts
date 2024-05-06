import { TokenConstants } from "~constants/TokenConstants.ts";

export class AccessTokenApi {
  static setToken(token: string): void {
    localStorage.setItem(TokenConstants.ACCESS_TOKEN_KEY, token);
  }

  static getToken(): string | null {
    return localStorage.getItem(TokenConstants.ACCESS_TOKEN_KEY);
  }

  static removeToken(): void {
    localStorage.removeItem(TokenConstants.ACCESS_TOKEN_KEY);
  }
}
