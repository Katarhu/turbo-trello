import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class LoginCredentialsDto {
  @IsEmail()
  @IsString()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  @Length(12, 60)
  readonly password: string;
}
