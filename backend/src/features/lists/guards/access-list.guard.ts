import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { ListsRepository } from "../lists.repository";
import { TargetedRequestWithToken } from "~core/types/request.types";
import { isValidObjectId } from "~utils/functions/is-valid-objectid";

@Injectable()
export class AccessListGuard implements CanActivate {
  constructor(private listsRepository: ListsRepository) {}

  private async getList(listId: string) {
    const list = await this.listsRepository.getList(listId);

    if (!list) throw new BadRequestException({ message: "There is no list with such id" });

    return list;
  }

  private canAccessList(userId: string, listCreatorId: string) {
    return userId === listCreatorId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: TargetedRequestWithToken = context.switchToHttp().getRequest();

    if (!isValidObjectId(request.params.id)) throw new BadRequestException({ message: "Id should be valid objectId" });

    const list = await this.getList(request.params.id);

    return this.canAccessList(request.user.id, list.userId);
  }
}
