import { CreateUserDto } from "~features/user/application/dto/CreateUserDto";

export interface IUserService {
  validateUserCreation(email: string): Promise<void>;

  createUser(request: CreateUserDto): Promise<void>;
}
