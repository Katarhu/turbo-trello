import { ICreateList } from "~features/list/application/interfaces/ICreateList";
import { IUpdateList } from "~features/list/application/interfaces/IUpdateList";
import { List } from "~features/list/domain/ListEntity";

export interface IListService {
  getById(id: number): Promise<List>;

  getByBoardId(boardId: number): Promise<List[]>;

  create(dto: ICreateList): Promise<List>;

  update(id: number, dto: IUpdateList): Promise<List>;

  delete(id: number): Promise<void>;

  validateAccess(userId: number, list: List): void;

  validateAccessToBoard(userId: number, boardId: number): Promise<void>;
}
