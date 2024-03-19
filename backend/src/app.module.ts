import { Module } from "@nestjs/common";

import { AuthModule } from "./features/auth/auth.module";
import { BoardsModule } from "./features/boards/boards.module";
import { ListsModule } from "./features/lists/lists.module";
import { TasksModule } from "./features/tasks/tasks.module";

@Module({
  imports: [AuthModule, BoardsModule, ListsModule, TasksModule],
})
export class AppModule {}
