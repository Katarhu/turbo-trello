export class LoggedInUserDto {
  readonly id: number;
  readonly email: string;

  constructor(id: number, email: string) {
    this.id = id;
    this.email = email;
  }
}
