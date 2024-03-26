import { Injectable } from "@nestjs/common";

import { LoggedInUserDto } from "~features/auth/application/dto/Login/LoggedInUserDto";
import { LoginAttemptDto } from "~features/auth/application/dto/Login/LoginAttemptDto";
import { ILoginAttemptRepository } from "~features/auth/application/interfaces/ILoginAttemptRepository";
import { LoggedInUserMapper } from "~features/auth/infrastructure/mappers/LoggedInUserMapper";
import { LoginAttemptMapper } from "~features/auth/infrastructure/mappers/LoginAttemptMapper";
import { LoginAttempt } from "~features/user/domain/LoginAttemptValueObject";
import { User } from "~features/user/domain/UserEntity";
import { PrismaService } from "~prisma/PrismaService";

@Injectable()
export class LoginAttemptRepository implements ILoginAttemptRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.user;
  }

  async getUserByEmail(email: string): Promise<LoginAttemptDto | null> {
    const user = await this.collection.findUnique({ where: { email } });

    if (!user) return null;

    const userEntity = new User(
      user.id,
      user.email,
      user.password,
      user.unsuccessfulLoginAttemptsCount,
      user.banStartTime
    );

    return LoginAttemptMapper.toDto(userEntity);
  }

  async saveNewLoginAttempt(id: number, loginAttempt: LoginAttempt): Promise<void> {
    await this.collection.update({
      where: { id },
      data: {
        banStartTime: loginAttempt.banStartTime,
        unsuccessfulLoginAttemptsCount: loginAttempt.unsuccessfulLoginAttemptsCount,
      },
    });
  }

  async getLoggedInUser(email: string): Promise<LoggedInUserDto> {
    const user = await this.collection.findUnique({
      where: { email },
    });

    const userEntity = new User(
      user.id,
      user.email,
      user.password,
      user.unsuccessfulLoginAttemptsCount,
      user.banStartTime
    );

    return LoggedInUserMapper.toDto(userEntity);
  }
}
