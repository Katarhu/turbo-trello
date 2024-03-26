export class LoginUserResponse {
  id: number;
  email: string;
  accessToken: string;
  refreshToken: string;

  constructor(id: number, email: string, accessToken: string, refreshToken: string) {
    this.id = id;
    this.email = email;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
