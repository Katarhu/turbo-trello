import { Module } from "@nestjs/common";

import { PrismaModule } from "~core/prisma/prisma.module";
import { JwtStrategy } from "~core/strategies/jwt.strategy";

import { BoardsController } from "./boards.controller";
import { BoardsRepository } from "./boards.repository";
import { BoardsService } from "./boards.service";

@Module({
  imports: [PrismaModule],
  providers: [BoardsService, BoardsRepository, JwtStrategy],
  controllers: [BoardsController],
  exports: [BoardsRepository],
})
export class BoardsModule {}
