import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterCredentialsDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(12, 60)
  password: string;
}
