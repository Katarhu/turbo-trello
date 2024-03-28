import { BadRequestException, Inject } from "@nestjs/common";

import { ICryptoService } from "~common/application/services/CryptoService/ICryptoService";
import { CommonServiceToken } from "~common/diTokens";
import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { IUserRepository } from "~features/user/application/interfaces/IUserRepository";
import { IUserService } from "~features/user/application/services/IUserService";
import { UserRepositoryToken } from "~features/user/diTokens";

export class UserService implements IUserService {
  @Inject(UserRepositoryToken.USER_REPOSITORY)
  private _userRepository: IUserRepository;

  @Inject(CommonServiceToken.CRYPTO_SERVICE)
  private _cryptoService: ICryptoService;

  async validateUserCreation(email: string): Promise<void> {
    const isUserExist = await this._userRepository.getByEmail(email);

    if (isUserExist) throw new BadRequestException({ message: "User with this email already exists" });
  }

  async createUser(request: RegisterUserRequest): Promise<void> {
    const hashedPassword = await this._cryptoService.hash(request.password);

    await this._userRepository.create({ ...request, password: hashedPassword });
  }
}
