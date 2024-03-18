import { Module } from "@nestjs/common";

import { BoardsModule } from "~boards/boards.module";
import { PrismaModule } from "~core/prisma/prisma.module";
import { JwtStrategy } from "~core/strategies/jwt.strategy";

import { ListsController } from "./lists.controller";
import { ListsRepository } from "./lists.repository";
import { ListsService } from "./lists.service";

@Module({
  imports: [PrismaModule, BoardsModule],
  controllers: [ListsController],
  providers: [ListsService, ListsRepository, JwtStrategy],
})
export class ListsModule {}
