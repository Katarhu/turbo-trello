import { BadRequestException, CanActivate, ExecutionContext, HttpStatus, Injectable } from "@nestjs/common";

import { BoardsRepository } from "../../boards/boards.repository";
import { AccessBoardDto } from "../dto/access.board.dto";
import { ListRequest } from "../lists.types";
import { validateBody } from "~utils/functions/validate-body";

@Injectable()
export class AccessBoardGuard implements CanActivate {
  constructor(private boardRepository: BoardsRepository) {}

  private async getBoard(boardId?: string) {
    const board = await this.boardRepository.getBoard(boardId);

    if (!board) throw new BadRequestException({ message: "There is no board with such id" });

    return board;
  }

  private canAccessBoard(userId: string, boardCreatorId: string): boolean {
    return userId === boardCreatorId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: ListRequest = context.switchToHttp().getRequest();

    const errorMessages = await validateBody(AccessBoardDto, request.body);

    if (errorMessages.length > 0)
      throw new BadRequestException({
        message: errorMessages,
        error: "Bad request",
        status: HttpStatus.BAD_REQUEST,
      });

    const board = await this.getBoard(request.body.boardId);

    return this.canAccessBoard(request.user.id, board.userId);
  }
}
