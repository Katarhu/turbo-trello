import { Module } from "@nestjs/common";

import { AuthModule } from "~features/auth/AuthModule";
import { BoardModule } from "~features/board/BoardModule";
import { ListModule } from "~features/list/ListModule";
import { TaskModule } from "~features/task/TaskModule";

@Module({
  imports: [AuthModule, BoardModule, ListModule, TaskModule],
})
export class AppModule {}
