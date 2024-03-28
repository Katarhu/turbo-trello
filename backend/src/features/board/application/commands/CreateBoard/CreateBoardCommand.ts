import { Inject, Injectable, Scope } from "@nestjs/common";

import { ICreateBoardCommand } from "~features/board/application/commands/CreateBoard/ICreateBoardCommand";
import { CreateBoardDto } from "~features/board/application/dto/CreateBoardDto";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { CreateBoardResponse } from "~features/board/application/responses/CreateBoardResponse";
import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateBoardCommand implements ICreateBoardCommand {
  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async execute(request: CreateBoardDto): Promise<CreateBoardResponse> {
    const board = await this._boardService.create(request);

    return new CreateBoardResponse(BoardMapper.toDto(board));
  }
}
