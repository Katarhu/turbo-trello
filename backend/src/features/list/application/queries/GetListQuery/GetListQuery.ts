import { Inject, Injectable, Scope } from "@nestjs/common";

import { GetListDto } from "~features/list/application/dto/GetListDto";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { IGetListQuery } from "~features/list/application/queries/GetListQuery/IGetListQuery";
import { GetListResponse } from "~features/list/application/responses/GetListResponse";
import { IListService } from "~features/list/application/services/IListService";
import { ListServiceToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class GetListQuery implements IGetListQuery {
  @Inject(ListServiceToken.LIST_SERVICE)
  private _listService: IListService;

  async execute(dto: GetListDto): Promise<GetListResponse> {
    const list = await this._listService.getById(dto.id);

    this._listService.validateAccess(dto.userId, list);

    return new GetListResponse(ListMapper.toDto(list));
  }
}
