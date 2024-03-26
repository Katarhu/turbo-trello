import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";

export interface ITokenService {
  createAccessToken(dto: LoginAttemptDto): string;

  createRefreshToken(dto: LoginAttemptDto): string;
}
