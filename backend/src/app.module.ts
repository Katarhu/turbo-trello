import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { BoardsModule } from "./boards/boards.module";
import { ListsModule } from "./lists/lists.module";
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [AuthModule, BoardsModule, ListsModule, TasksModule],
})
export class AppModule {}
