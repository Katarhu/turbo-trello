import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class RegisterUserDto {
  @IsEmail()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Length(12, 60)
  password: string;
}
