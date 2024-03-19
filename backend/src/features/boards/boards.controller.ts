import { Controller, Delete, Get, Post, Put, UseGuards, Request, Body, Param } from "@nestjs/common";

import { JwtGuard } from "~core/guards/jwt.guard";
import { RequestWithToken } from "~core/types/request.types";

import { BoardsService } from "./boards.service";
import { CreateBoardDto } from "./dto/create.board.dto";
import { UpdateBoardDto } from "./dto/update.board.dto";
import { AccessBoardGuard } from "./guards/access-board.guard";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(JwtGuard)
  @Post()
  createBoard(@Request() request: RequestWithToken, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(request.user, createBoardDto);
  }

  @UseGuards(JwtGuard)
  @Post("/get")
  getBoards(@Request() request: RequestWithToken) {
    return this.boardsService.getBoards(request.user);
  }

  @UseGuards(JwtGuard, AccessBoardGuard)
  @Get("/:id")
  getBoard(@Param("id") boardId: string) {
    return this.boardsService.getBoard(boardId);
  }

  @UseGuards(JwtGuard, AccessBoardGuard)
  @Put("/:id")
  updateBoard(@Param("id") boardId: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(boardId, updateBoardDto);
  }

  @UseGuards(JwtGuard, AccessBoardGuard)
  @Delete("/:id")
  deleteBoard(@Param("id") boardId: string) {
    return this.boardsService.deleteBoard(boardId);
  }
}
