import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { BoardsRepository } from "../boards.repository";
import { BoardRequest } from "../boards.types";

@Injectable()
export class BoardGuard implements CanActivate {
  constructor(private boardsRepository: BoardsRepository) {}

  async canActivate(context: ExecutionContext) {
    const request: BoardRequest = context.switchToHttp().getRequest();

    const board = await this.boardsRepository.getBoard(request.params.id);

    if (!board) throw new BadRequestException({ message: "There is no board with such id" });

    return board.userId === request.user.id;
  }
}
