import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { ICreateBoard } from "~features/board/application/interfaces/ICreateBoard";
import { IUpdateBoard } from "~features/board/application/interfaces/IUpdateBoard";
import { BoardRepositoryToken } from "~features/board/diTokens";
import { Board } from "~features/board/domain/BoardEntity";

import { IBoardService } from "./IBoardService";

@Injectable()
export class BoardService implements IBoardService {
  @Inject(BoardRepositoryToken.BOARD_REPOSITORY)
  private _boardRepository: IBoardRepository;

  async create(dto: ICreateBoard): Promise<Board> {
    const board = await this._boardRepository.create(dto);

    return board;
  }

  async update(id: number, dto: IUpdateBoard): Promise<Board> {
    const board = await this._boardRepository.update(id, dto);

    return board;
  }

  async delete(id: number) {
    const isBoardExist = await this._boardRepository.getById(id);

    if (!isBoardExist) throw new BadRequestException({ message: "There is no board with such id" });

    await this._boardRepository.delete(id);
  }

  async findById(id: number): Promise<Board> {
    const board = await this._boardRepository.getById(id);

    if (!board) throw new BadRequestException({ message: "There is no board with such id" });

    return board;
  }

  async findMany(userId: number): Promise<Board[]> {
    const boards = await this._boardRepository.findMany(userId);

    return boards;
  }

  validateAccess(userId: number, board: Board): void {
    const isUserHasAccess = board.userId === userId;

    if (!isUserHasAccess) throw new ForbiddenException({ message: "Operation is forbidden" });
  }
}
