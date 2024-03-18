import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";

import { RegisterUserDto } from "../auth/dto/register.credentials.dto";
import { AuthConstants } from "~core/constants/auth.constants";
import { PrismaService } from "~core/prisma/prisma.service";

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.user;
  }

  async createUser(credentials: RegisterUserDto): Promise<User> {
    return this.collection.create({
      data: {
        email: credentials.email,
        password: credentials.password,
      },
    });
  }

  getUserByEmail(email: string): Promise<User> {
    return this.collection.findUnique({ where: { email } });
  }

  incrementLoginAttempts(userId: string): Promise<User> {
    return this.collection.update({
      where: { id: userId },
      data: { loginAttempts: { increment: 1 } },
    });
  }

  restrictLogin(user: User, restrictedUntil: Date) {
    return this.collection.update({ where: { id: user.id }, data: { loginRestrictedUntil: restrictedUntil } });
  }

  clearLoginRestriction(userId: string) {
    return this.collection.update({
      where: { id: userId },
      data: { loginAttempts: 0, loginRestrictedUntil: AuthConstants.nullifiedRestrictionUntil },
    });
  }
}
