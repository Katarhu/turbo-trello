export class RefreshTokenResponce {
  accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }
}