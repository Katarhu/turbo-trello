import { Injectable } from "@nestjs/common";

import { PrismaService } from "~core/prisma/prisma.service";

import { CreateListDto } from "./dto/create.list.dto";
import { UpdateListDto } from "./dto/update.list.dto";

@Injectable()
export class ListsRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.list;
  }

  createList(userId: string, createListDto: CreateListDto) {
    return this.collection.create({
      data: {
        userId,
        title: createListDto.title,
        boardId: createListDto.boardId,
      },
    });
  }

  getLists(boardId: string) {
    return this.collection.findMany({ where: { boardId } });
  }

  getList(listId: string) {
    return this.collection.findUnique({ where: { id: listId } });
  }

  updateList(listId: string, updateListDto: UpdateListDto) {
    return this.collection.update({ where: { id: listId }, data: { ...updateListDto } });
  }

  deleteList(listId: string) {
    return this.collection.delete({ where: { id: listId } });
  }
}
