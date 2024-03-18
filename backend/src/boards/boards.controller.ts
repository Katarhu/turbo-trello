import { Controller, Delete, Get, Post, Put, UseGuards } from "@nestjs/common";

import { JwtGuard } from "~core/guards/jwt.guard";

@Controller("boards")
export class BoardsController {
  @UseGuards(JwtGuard)
  @Post()
  createBoard() {}

  @UseGuards(JwtGuard)
  @Get()
  getBoards() {}

  @UseGuards(JwtGuard)
  @Get("/:id")
  getBoard() {}

  @UseGuards(JwtGuard)
  @Delete("/:id")
  deleteBoard() {}

  @UseGuards(JwtGuard)
  @Put("/:id")
  updateBoard() {}
}
