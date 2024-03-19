import { Module } from "@nestjs/common";

import { ListsModule } from "../lists/lists.module";
import { PrismaModule } from "~core/prisma/prisma.module";
import { JwtStrategy } from "~core/strategies/jwt.strategy";

import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";
import { TasksService } from "./tasks.service";

@Module({
  imports: [PrismaModule, ListsModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository, JwtStrategy],
})
export class TasksModule {}
