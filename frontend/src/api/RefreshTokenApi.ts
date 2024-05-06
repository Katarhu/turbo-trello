import { TokenConstants } from "~constants/TokenConstants.ts";

export class RefreshTokenApi {
  static setToken(token: string): void {
    document.cookie = `${TokenConstants.REFRESH_TOKEN_KEY}=${token}; path=/;`;
  }

  static getToken(): string | null {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(TokenConstants.REFRESH_TOKEN_KEY))
      ?.split("=")[1];

    return cookieValue || null;
  }

  static removeToken(): void {
    document.cookie = `${TokenConstants.REFRESH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }
}
