import { Inject } from "@nestjs/common";

import { IUpdateListCommand } from "~features/list/application/commands/UpdateListCommand/IUpdateListCommand";
import { UpdateListDto } from "~features/list/application/dto/UpdateListDto";
import { ListMapper } from "~features/list/application/mappers/ListMapper";
import { UpdateListResponse } from "~features/list/application/responses/UpdateListResponse";
import { IListService } from "~features/list/application/services/IListService";
import { ListServiceToken } from "~features/list/diTokens";

export class UpdateListCommand implements IUpdateListCommand {
  @Inject(ListServiceToken.LIST_SERVICE)
  private _listService: IListService;

  async execute(dto: UpdateListDto): Promise<UpdateListResponse> {
    const list = await this._listService.getById(dto.id);

    this._listService.validateAccess(dto.userId, list);

    const updatedList = await this._listService.update(dto.id, {
      title: dto.title,
    });

    return new UpdateListResponse(ListMapper.toDto(updatedList));
  }
}
