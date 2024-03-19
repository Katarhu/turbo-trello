import { Injectable } from "@nestjs/common";

import { PrismaService } from "~core/prisma/prisma.service";

import { CreateBoardDto } from "./dto/create.board.dto";
import { UpdateBoardDto } from "./dto/update.board.dto";

@Injectable()
export class BoardsRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.board;
  }

  createBoard(userId: string, createBoardDto: CreateBoardDto) {
    return this.collection.create({
      data: {
        title: createBoardDto.title,
        userId: userId,
      },
    });
  }

  getBoards(userId: string) {
    return this.collection.findMany({ where: { userId: userId } });
  }

  getBoard(boardId: string) {
    return this.collection.findUnique({ where: { id: boardId } });
  }

  updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    return this.collection.update({ where: { id: boardId }, data: { ...updateBoardDto } });
  }

  deleteBoard(boardId: string) {
    return this.collection.delete({ where: { id: boardId } });
  }
}
