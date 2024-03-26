import { Injectable } from "@nestjs/common";

import { RegisterUserRequest } from "~features/auth/application/requests/RegisterUserRequest";
import { UserDto } from "~features/user/application/dto/UserDto";
import { IUserRepository } from "~features/user/application/interfaces/IUserRepository";
import { User } from "~features/user/domain/UserEntity";
import { UserMapper } from "~features/user/infrastructure/mappers/UserMapper";
import { PrismaService } from "~prisma/PrismaService";

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.user;
  }

  async create(createUserDto: RegisterUserRequest): Promise<UserDto> {
    const { id, email, password, unsuccessfulLoginAttemptsCount, banStartTime } = await this.collection.create({
      data: { ...createUserDto },
    });

    const userEntity = new User(id, email, password, unsuccessfulLoginAttemptsCount, banStartTime);

    return UserMapper.toDto(userEntity);
  }

  async getByEmail(email: string): Promise<UserDto | null> {
    const user = await this.collection.findUnique({ where: { email } });

    if (!user) return null;

    const userEntity = new User(
      user.id,
      user.email,
      user.password,
      user.unsuccessfulLoginAttemptsCount,
      user.banStartTime
    );

    return UserMapper.toDto(userEntity);
  }
}
