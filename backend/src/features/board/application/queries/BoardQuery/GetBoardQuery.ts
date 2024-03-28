import { Inject, Injectable, Scope } from "@nestjs/common";

import { GetBoardDto } from "~features/board/application/dto/GetBoardDto";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { IGetBoardQuery } from "~features/board/application/queries/BoardQuery/IGetBoardQuery";
import { GetBoardResponse } from "~features/board/application/responses/GetBoardResponse";
import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetBoardQuery implements IGetBoardQuery {
  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async execute(dto: GetBoardDto): Promise<GetBoardResponse> {
    const board = await this._boardService.findById(dto.id);

    this._boardService.validateAccess(dto.userId, board);

    return new GetBoardResponse(BoardMapper.toDto(board));
  }
}
