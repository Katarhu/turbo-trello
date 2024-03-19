import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { List } from "@prisma/client";

import { ListsRepository } from "../../lists/lists.repository";
import { TaskRequest } from "../tasks.types";

@Injectable()
export class AccessListGuard implements CanActivate {
  constructor(private listsRepository: ListsRepository) {}

  private async getList(listId: string): Promise<List> {
    const list = await this.listsRepository.getList(listId);

    if (!list) throw new BadRequestException({ message: "There is no list with such id" });

    return list;
  }

  private canAccessList(userId: string, listCreatorId: string) {
    return userId === listCreatorId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: TaskRequest = context.switchToHttp().getRequest();

    const list = await this.getList(request.body.listId);

    return this.canAccessList(request.user.id, list.userId);
  }
}
