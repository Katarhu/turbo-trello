import { Module } from "@nestjs/common";

import { PrismaModule } from "~core/prisma/prisma.module";

import { ListsController } from "./lists.controller";
import { ListsService } from "./lists.service";

@Module({
  imports: [PrismaModule],
  providers: [ListsService],
  controllers: [ListsController],
})
export class ListsModule {}
