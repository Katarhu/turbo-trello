import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { BoardsModule } from "./boards/boards.module";
import { ListsModule } from './lists/lists.module';

@Module({
  imports: [AuthModule, BoardsModule, ListsModule],
})
export class AppModule {}
