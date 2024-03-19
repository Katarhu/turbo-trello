import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { BoardsRepository } from "../../boards/boards.repository";
import { ListRequest } from "../lists.types";

@Injectable()
export class AccessBoardGuard implements CanActivate {
  constructor(private boardRepository: BoardsRepository) {}

  private async getBoard(boardId: string) {
    const board = await this.boardRepository.getBoard(boardId);

    if (!board) throw new BadRequestException({ message: "There is no board with such id" });

    return board;
  }

  private canAccessBoard(userId: string, boardCreatorId: string): boolean {
    return userId === boardCreatorId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ListRequest = context.switchToHttp().getRequest();

    const board = await this.getBoard(request.body.boardId);

    return this.canAccessBoard(request.user.id, board.userId);
  }
}
