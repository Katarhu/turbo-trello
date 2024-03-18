import { Controller, Delete, Get, Post, Put, UseGuards, Request, Body, Param } from "@nestjs/common";

import { JwtGuard } from "~core/guards/jwt.guard";

import { BoardsService } from "./boards.service";
import { BoardsRequest } from "./boards.types";
import { CreateBoardDto } from "./dto/create.board.dto";
import { UpdateBoardDto } from "./dto/update.board.dto";
import { BoardGuard } from "./guards/board.guard";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @UseGuards(JwtGuard)
  @Post()
  createBoard(@Request() request: BoardsRequest, @Body() createBoardDto: CreateBoardDto) {
    return this.boardsService.createBoard(request.user, createBoardDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  getBoards(@Request() request: BoardsRequest) {
    return this.boardsService.getBoards(request.user);
  }

  @UseGuards(JwtGuard, BoardGuard)
  @Get("/:id")
  getBoard(@Param("id") boardId: string) {
    return this.boardsService.getBoard(boardId);
  }

  @UseGuards(JwtGuard, BoardGuard)
  @Put("/:id")
  updateBoard(@Param("id") boardId: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardsService.updateBoard(boardId, updateBoardDto);
  }

  @UseGuards(JwtGuard, BoardGuard)
  @Delete("/:id")
  deleteBoard(@Param("id") boardId: string) {
    return this.boardsService.deleteBoard(boardId);
  }
}
