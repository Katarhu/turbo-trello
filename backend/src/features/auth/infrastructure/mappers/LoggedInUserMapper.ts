import { LoggedInUserDto } from "~features/auth/application/dto/Login/LoggedInUserDto";
import { User } from "~features/user/domain/UserEntity";

export class LoggedInUserMapper {
  static toDto(entity: User) {
    return new LoggedInUserDto(entity.id, entity.email);
  }
}
