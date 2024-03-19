import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { BoardsRepository } from "../boards.repository";
import { TargetedRequestWithToken } from "~core/types/request.types";
import { isValidObjectId } from "~utils/functions/is-valid-objectid";

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

    if (!isValidObjectId(request.params.id)) throw new BadRequestException({ message: "Id should be valid objectId" });

    const board = await this.getBoard(request.params.id);

    return this.canAccessBoard(request.user.id, board.userId);
  }
}
