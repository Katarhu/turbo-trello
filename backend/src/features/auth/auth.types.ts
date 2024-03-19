import { User } from "@prisma/client";

export interface LoginRequest extends Request {
  user: User;
}

export interface RefreshTokenRequest extends Request {
  user: User;
}

export interface LoginResponse {
  user: Omit<User, "password" | "loginAttempts" | "loginRestrictedUntil">;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
