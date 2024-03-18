import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { AppJwtService } from "~core/services/app.jwt.service";
import { UserRepository } from "~user/user.repository";

import { LoginResponse, RefreshTokenResponse } from "./auth.types";
import { RegisterUserDto } from "./dto/register.credentials.dto";
import { EncryptionService } from "./encryption.service";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private encryptionService: EncryptionService,
    private jwtService: AppJwtService
  ) {}

  async createUser(credentials: RegisterUserDto) {
    const isUserExist = await this.userRepository.getUserByEmail(credentials.email);

    if (isUserExist) throw new BadRequestException({ message: "User with this email already exists" });

    const encryptedPassword = await this.encryptionService.encryptPassword(credentials.password);

    await this.userRepository.createUser({ ...credentials, password: encryptedPassword });

    return {
      message: "Registration is successful",
    };
  }

  async loginUser(user: User): Promise<LoginResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, loginAttempts, ...data } = user;

    return {
      user: data,
      accessToken: this.jwtService.createAccessToken(user),
      refreshToken: this.jwtService.createRefreshToken(user),
    };
  }

  async getAccessToken(identity: User): Promise<RefreshTokenResponse> {
    return {
      accessToken: this.jwtService.createAccessToken(identity),
    };
  }
}
