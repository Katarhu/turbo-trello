import { Injectable } from "@nestjs/common";

import { JwtPayload } from "~core/types/jwt.types";

import { CreateListDto } from "./dto/create.list.dto";
import { UpdateListDto } from "./dto/update.list.dto";
import { ListsRepository } from "./lists.repository";

@Injectable()
export class ListsService {
  constructor(private listsRepository: ListsRepository) {}

  async createList(user: JwtPayload, createListDto: CreateListDto) {
    const list = await this.listsRepository.createList(user.id, createListDto);

    return {
      list,
    };
  }

  async getLists(boardId: string) {
    const lists = await this.listsRepository.getLists(boardId);

    return {
      lists,
    };
  }

  async getList(listId: string) {
    const list = await this.listsRepository.getList(listId);

    return {
      list,
    };
  }

  async updateList(listId: string, updateListDto: UpdateListDto) {
    await this.listsRepository.updateList(listId, updateListDto);

    return {
      message: "List was updated successfully",
    };
  }

  async deleteList(listId: string) {
    await this.listsRepository.deleteList(listId);

    return {
      message: "List was deleted successfully",
    };
  }
}
