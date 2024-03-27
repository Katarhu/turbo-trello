import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";

export interface ITokenService {
  createAccessToken(dto: LoginAttemptDto): string;

  createRefreshToken(dto: LoginAttemptDto): string;

  validateSync(token: string): void;

  decode(token: string): IUserPayload;
}
