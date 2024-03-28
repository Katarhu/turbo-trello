import { Inject, Injectable, Scope } from "@nestjs/common";

import { IDeleteBoardCommand } from "~features/board/application/commands/DeleteBoard/IDeleteBoardCommand";
import { DeleteBoardDto } from "~features/board/application/dto/DeleteBoardDto";
import { DeleteBoardResponse } from "~features/board/application/responses/DeleteBoardResponse";
import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class DeleteBoardCommand implements IDeleteBoardCommand {
  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async execute(dto: DeleteBoardDto): Promise<DeleteBoardResponse> {
    const board = await this._boardService.findById(dto.id);

    this._boardService.validateAccess(dto.userId, board);

    await this._boardService.delete(dto.id);

    return new DeleteBoardResponse();
  }
}
