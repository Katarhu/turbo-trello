import { Inject, Injectable, Scope } from "@nestjs/common";

import { ICreateListCommand } from "~features/list/application/commands/CreateListCommand/ICreateListCommand";
import { CreateListDto } from "~features/list/application/dto/CreateListDto";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { CreateListResponse } from "~features/list/application/responses/CreateListResponse";
import { IListService } from "~features/list/application/services/IListService";
import { ListServiceToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class CreateListCommand implements ICreateListCommand {
  @Inject(ListServiceToken.LIST_SERVICE)
  private _listService: IListService;

  async execute(dto: CreateListDto): Promise<CreateListResponse> {
    await this._listService.validateAccessToBoard(dto.userId, dto.boardId);

    const newList = await this._listService.create(dto);

    return new CreateListResponse(ListMapper.toDto(newList));
  }
}
