import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { RegisterUserDto } from "../auth/dto/register.credentials.dto";
import { AuthConstants } from "~core/constants/auth.constants";
import { PrismaService } from "~core/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(credentials: RegisterUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  incrementLoginAttempts(userId: string): Promise<User> {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { loginAttempts: { increment: 1 } },
    });
  }

  restrictLogin(user: User, restrictedUntil: Date) {
    return this.prismaService.user.update({ where: { id: user.id }, data: { loginRestrictedUntil: restrictedUntil } });
  }

  clearLoginRestriction(userId: string) {
    return this.prismaService.user.update({
      where: { id: userId },
      data: { loginAttempts: 0, loginRestrictedUntil: AuthConstants.nullifiedRestrictionUntil },
    });
  }
}
