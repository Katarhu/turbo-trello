import { Inject, Injectable, Scope } from "@nestjs/common";

import { IDeleteListCommand } from "~features/list/application/commands/DeleteListCommand/IDeleteListCommand";
import { DeleteListDto } from "~features/list/application/dto/DeleteListDto";
import { DeleteListResponse } from "~features/list/application/responses/DeleteListResponse";
import { IListService } from "~features/list/application/services/IListService";
import { ListServiceToken } from "~features/list/diTokens";

@Injectable({ scope: Scope.REQUEST })
export class DeleteListCommand implements IDeleteListCommand {
  @Inject(ListServiceToken.LIST_SERVICE)
  private _listService: IListService;

  async execute(dto: DeleteListDto): Promise<DeleteListResponse> {
    const list = await this._listService.getById(dto.id);

    this._listService.validateAccess(dto.userId, list);

    await this._listService.delete(dto.id);

    return new DeleteListResponse();
  }
}
