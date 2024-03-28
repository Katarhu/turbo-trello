import { Inject, Injectable, Scope } from "@nestjs/common";

import { GetBoardsDto } from "~features/board/application/dto/GetBoardsDto";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { IGetBoardsQuery } from "~features/board/application/queries/BoardsQuery/IGetBoardsQuery";
import { GetBoardsResponse } from "~features/board/application/responses/GetBoardsResponse";
import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetBoardsQuery implements IGetBoardsQuery {
  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async execute(dto: GetBoardsDto): Promise<GetBoardsResponse> {
    const boards = await this._boardService.findMany(dto.userId);

    return new GetBoardsResponse(boards.map(BoardMapper.toDto));
  }
}
