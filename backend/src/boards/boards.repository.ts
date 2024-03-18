import { Injectable } from "@nestjs/common";

import { PrismaService } from "~core/prisma/prisma.service";

import { CreateBoardDto } from "./dto/create.board.dto";
import { UpdateBoardDto } from "./dto/update.board.dto";

@Injectable()
export class BoardsRepository {
  constructor(private prismaService: PrismaService) {}

  createBoard(userId: string, createBoardDto: CreateBoardDto) {
    return this.prismaService.board.create({
      data: {
        title: createBoardDto.title,
        userId: userId,
      },
    });
  }

  getBoards(userId: string) {
    return this.prismaService.board.findMany({ where: { userId: userId } });
  }

  getBoard(boardId: string) {
    return this.prismaService.board.findUnique({ where: { id: boardId } });
  }

  updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    return this.prismaService.board.update({ where: { id: boardId }, data: { ...updateBoardDto } });
  }

  async deleteBoard(boardId: string) {
    return this.prismaService.board.delete({ where: { id: boardId } });
  }
}
