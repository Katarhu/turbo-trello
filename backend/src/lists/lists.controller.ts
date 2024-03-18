import { Controller, Post, UseGuards, Request, Body, Get, Param, Put, Delete } from "@nestjs/common";

import { JwtGuard } from "~core/guards/jwt.guard";
import { RequestWithToken } from "~core/types/request.types";
import { AccessBoardDto } from "~lists/dto/access.board.dto";
import { AccessBoardGuard } from "~lists/guards/access-board.guard";

import { CreateListDto } from "./dto/create.list.dto";
import { UpdateListDto } from "./dto/update.list.dto";
import { AccessListGuard } from "./guards/access-list.guard";
import { ListsService } from "./lists.service";

@Controller("lists")
export class ListsController {
  constructor(private listsService: ListsService) {}

  @UseGuards(JwtGuard, AccessBoardGuard)
  @Post()
  createList(@Request() request: RequestWithToken, @Body() createListDto: CreateListDto) {
    return this.listsService.createList(request.user, createListDto);
  }

  @UseGuards(JwtGuard, AccessBoardGuard)
  @Post("/get")
  getLists(@Body() accessBoardDto: AccessBoardDto) {
    return this.listsService.getLists(accessBoardDto.boardId);
  }

  @UseGuards(JwtGuard, AccessListGuard)
  @Get("/:id")
  getList(@Param("id") listId: string) {
    return this.listsService.getList(listId);
  }

  @UseGuards(JwtGuard, AccessListGuard)
  @Put("/:id")
  updateList(@Param("id") listId: string, @Body() updateListDto: UpdateListDto) {
    return this.listsService.updateList(listId, updateListDto);
  }

  @UseGuards(JwtGuard, AccessListGuard)
  @Delete("/:id")
  deleteList(@Param("id") listId: string) {
    return this.listsService.deleteList(listId);
  }
}
