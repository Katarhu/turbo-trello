import { Inject, Injectable, Scope } from "@nestjs/common";

import { GetListsDto } from "~features/list/application/dto/GetListsDto";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { IGetListsQuery } from "~features/list/application/queries/GetListsQuery/IGetListsQuery";
import { GetListsResponse } from "~features/list/application/responses/GetListsResponse";
import { IListService } from "~features/list/application/services/IListService";
import { ListServiceToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetListsQuery implements IGetListsQuery {
  @Inject(ListServiceToken.LIST_SERVICE)
  private _listService: IListService;

  async execute(dto: GetListsDto): Promise<GetListsResponse> {
    await this._listService.validateAccessToBoard(dto.userId, dto.boardId);

    const lists = await this._listService.getByBoardId(dto.boardId);

    return new GetListsResponse(lists.map(ListMapper.toDto));
  }
}
