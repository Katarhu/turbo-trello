import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

import { PrismaService } from "../core/prisma/prisma.service";

@Injectable()
export class IdentityService {
  constructor(private prismaService: PrismaService) {}

  async createUser(user: Prisma.UserCreateInput) {
    console.log(user);
  }
}
