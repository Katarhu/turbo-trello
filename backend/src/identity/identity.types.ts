import { Identity } from "@prisma/client";

export interface LoginRequest extends Request {
  user: Identity;
}

export interface RefreshTokenRequest extends Request {
  user: Identity;
}

export interface LoginResponse {
  user: Omit<Identity, "password" | "loginAttempts">;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
}
