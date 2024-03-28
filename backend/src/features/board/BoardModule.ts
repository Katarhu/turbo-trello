import { Module } from "@nestjs/common";

import { CreateBoardCommand } from "~features/board/application/commands/CreateBoard/CreateBoardCommand";
import { DeleteBoardCommand } from "~features/board/application/commands/DeleteBoard/DeleteBoardCommand";
import { UpdateBoardCommand } from "~features/board/application/commands/UpdateBoard/UpdateBoardCommand";
import { GetBoardQuery } from "~features/board/application/queries/BoardQuery/GetBoardQuery";
import { GetBoardsQuery } from "~features/board/application/queries/BoardsQuery/GetBoardsQuery";
import { BoardService } from "~features/board/application/services/BoardService";
import { BoardCommandToken, BoardQueryToken, BoardRepositoryToken, BoardServiceToken } from "~features/board/diTokens";
import { BoardRepository } from "~features/board/infrastructure/persistance/BoardRepository";
import { BoardController } from "~features/board/presentation/BoardController";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [PrismaModule],
  controllers: [BoardController],
  providers: [
    createProvider(BoardRepositoryToken.BOARD_REPOSITORY, BoardRepository),
    createProvider(BoardCommandToken.CREATE_BOARD_COMMAND, CreateBoardCommand),
    createProvider(BoardCommandToken.DELETE_BOARD_COMMAND, DeleteBoardCommand),
    createProvider(BoardCommandToken.UPDATE_BOARD_COMMAND, UpdateBoardCommand),
    createProvider(BoardQueryToken.GET_BOARD_QUERY, GetBoardQuery),
    createProvider(BoardQueryToken.GET_BOARDS_QUERY, GetBoardsQuery),
    createProvider(BoardServiceToken.BOARD_SERVICE, BoardService),
  ],
  exports: [BoardServiceToken.BOARD_SERVICE],
})
export class BoardModule {}
