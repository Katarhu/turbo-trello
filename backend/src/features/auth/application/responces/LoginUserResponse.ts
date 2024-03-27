import { IUserPayload } from "~common/application/interfaces/IUserPayload";

export class LoginUserResponse {
  user: IUserPayload;
  accessToken: string;
  refreshToken: string;

  constructor(id: number, email: string, accessToken: string, refreshToken: string) {
    this.user = {
      id,
      email,
    };
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
