import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { BoardsRepository } from "../boards.repository";
import { TargetedRequestWithToken } from "~core/types/request.types";

@Injectable()
export class AccessBoardGuard implements CanActivate {
  constructor(private boardsRepository: BoardsRepository) {}

  private async getBoard(boardId: string) {
    const board = await this.boardsRepository.getBoard(boardId);

    if (!board) throw new BadRequestException({ message: "There is no board with such id" });

    return board;
  }

  private async canAccessBoard(userId: string, boardId: string): Promise<boolean> {
    return userId === boardId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: TargetedRequestWithToken = context.switchToHttp().getRequest();

    const board = await this.getBoard(request.params.id);

    return this.canAccessBoard(request.user.id, board.userId);
  }
}
