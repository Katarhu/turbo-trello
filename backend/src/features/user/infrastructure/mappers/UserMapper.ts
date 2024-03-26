import { UserDto } from "~features/user/application/dto/UserDto";
import { User } from "~features/user/domain/UserEntity";

export class UserMapper {
  static toDto(entity: User): UserDto {
    const { id, email, loginAttempt } = entity;

    return new UserDto(id, email, loginAttempt);
  }
}
