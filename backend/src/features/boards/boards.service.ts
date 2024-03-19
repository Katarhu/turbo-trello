import { Injectable } from "@nestjs/common";

import { JwtPayload } from "~core/types/jwt.types";

import { BoardsRepository } from "./boards.repository";
import { CreateBoardDto } from "./dto/create.board.dto";
import { UpdateBoardDto } from "./dto/update.board.dto";

@Injectable()
export class BoardsService {
  constructor(private boardsRepository: BoardsRepository) {}

  async createBoard(user: JwtPayload, createBoardDto: CreateBoardDto) {
    const board = await this.boardsRepository.createBoard(user.id, createBoardDto);

    return {
      board,
    };
  }

  async getBoards(user: JwtPayload) {
    const boards = await this.boardsRepository.getBoards(user.id);

    return {
      boards,
    };
  }

  async getBoard(boardId: string) {
    const board = await this.boardsRepository.getBoard(boardId);

    return {
      board,
    };
  }

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    await this.boardsRepository.updateBoard(boardId, updateBoardDto);

    return {
      message: "Board was updated successfully",
    };
  }

  async deleteBoard(boardId: string) {
    await this.boardsRepository.deleteBoard(boardId);

    return {
      message: "Board was deleted successfully",
    };
  }
}
