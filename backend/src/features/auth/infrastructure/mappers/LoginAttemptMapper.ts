import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { User } from "~features/user/domain/UserEntity";

export class LoginAttemptMapper {
  static toDto(entity: User): LoginAttemptDto {
    const { id, loginAttempt, email, password } = entity;

    return new LoginAttemptDto(id, email, password, loginAttempt);
  }
}
