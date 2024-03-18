import { Module } from "@nestjs/common";

import { AuthModule } from "./auth/auth.module";
import { BoardsModule } from "./boards/boards.module";

@Module({
  imports: [AuthModule, BoardsModule],
})
export class AppModule {}
