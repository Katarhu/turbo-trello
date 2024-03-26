import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { UserDto } from "~features/user/application/dto/UserDto";

export interface IUserRepository {
  create(userDto: RegisterUserRequest): Promise<UserDto>;

  getByEmail(email: string): Promise<UserDto | null>;
}
