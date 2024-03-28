import { Inject, Injectable, Scope } from "@nestjs/common";

import { IUpdateBoardCommand } from "~features/board/application/commands/UpdateBoard/IUpdateBoardCommand";
import { UpdateBoardDto } from "~features/board/application/dto/UpdateBoardDto";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { UpdateBoardResponse } from "~features/board/application/responses/UpdateBoardResponse";
import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class UpdateBoardCommand implements IUpdateBoardCommand {
  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async execute(dto: UpdateBoardDto): Promise<UpdateBoardResponse> {
    const board = await this._boardService.findById(dto.id);

    this._boardService.validateAccess(dto.userId, board);

    const updatedBoard = await this._boardService.update(dto.id, { title: dto.title });

    return new UpdateBoardResponse(BoardMapper.toDto(updatedBoard));
  }
}
