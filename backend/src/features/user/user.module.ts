import { Module } from "@nestjs/common";

import { PrismaModule } from "~core/prisma/prisma.module";

import { UserRepository } from "./user.repository";

@Module({
  imports: [PrismaModule],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
