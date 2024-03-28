import { Module } from "@nestjs/common";

import { AuthModule } from "~features/auth/AuthModule";
import { BoardModule } from "~features/board/BoardModule";
import { ListModule } from "~features/list/ListModule";

@Module({
  imports: [AuthModule, BoardModule, ListModule],
})
export class AppModule {}
