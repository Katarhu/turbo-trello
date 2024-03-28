import { BadRequestException, ForbiddenException, Inject, Injectable } from "@nestjs/common";

import { IBoardService } from "~features/board/application/services/IBoardService";
import { BoardServiceToken } from "~features/board/diTokens";
import { ICreateList } from "~features/list/application/interfaces/ICreateList";
import { IListRepository } from "~features/list/application/interfaces/IListRepository";
import { IUpdateList } from "~features/list/application/interfaces/IUpdateList";
import { IListService } from "~features/list/application/services/IListService";
import { ListRepositoryToken } from "~features/list/diTokens";
import { List } from "~features/list/domain/ListEntity";

@Injectable()
export class ListService implements IListService {
  @Inject(ListRepositoryToken.LISTS_REPOSITORY)
  private _listRepository: IListRepository;

  @Inject(BoardServiceToken.BOARD_SERVICE)
  private _boardService: IBoardService;

  async create(dto: ICreateList): Promise<List> {
    const isBoardExists = await this._boardService.findById(dto.boardId);

    if (!isBoardExists) throw new BadRequestException({ message: "There is no board with such id" });

    return await this._listRepository.create(dto);
  }

  async delete(id: number): Promise<void> {
    return await this._listRepository.delete(id);
  }

  async getByBoardId(boardId: number): Promise<List[]> {
    return await this._listRepository.getManyByBoardId(boardId);
  }

  async getById(id: number): Promise<List> {
    return await this._listRepository.getById(id);
  }

  async update(id: number, dto: IUpdateList): Promise<List> {
    return await this._listRepository.update(id, dto);
  }

  validateAccess(userId: number, list: List) {
    const isUserHasAccess = list.userId === userId;

    if (!isUserHasAccess) throw new ForbiddenException({ message: "Operation is forbidden" });
  }

  async validateAccessToBoard(userId: number, boardId: number): Promise<void> {
    const board = await this._boardService.findById(boardId);

    this._boardService.validateAccess(userId, board);
  }
}
