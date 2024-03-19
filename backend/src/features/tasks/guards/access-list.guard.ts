import { BadRequestException, CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";
import { List } from "@prisma/client";

import { ListsRepository } from "../../lists/lists.repository";
import { AccessListDto } from "../dto/access-list.dto";
import { TaskRequest } from "../tasks.types";
import { validateBody } from "~utils/functions/validate-body";

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

    const errorMessages = await validateBody(AccessListDto, request.body);

    if (errorMessages.length > 0)
      throw new BadRequestException({
        message: errorMessages,
        error: "Bad request",
        status: HttpStatus.BAD_REQUEST,
      });

    const list = await this.getList(request.body.listId);

    return this.canAccessList(request.user.id, list.userId);
  }
}
