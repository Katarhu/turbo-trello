import { Module } from "@nestjs/common";

import { PrismaModule } from "../core/prisma/prisma.module";

import { IdentityController } from "./identity.controller";
import { IdentityService } from "./identity.service";

@Module({
  providers: [IdentityService],
  controllers: [IdentityController],
  imports: [PrismaModule],
})
export class IdentityModule {}
