import { Injectable } from "@nestjs/common";

import { PrismaService } from "~core/prisma/prisma.service";

@Injectable()
export class ListsRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.lists;
  }

  createList() {}

  getLists() {}

  getList() {}

  updateList() {}

  deleteList() {}
}
