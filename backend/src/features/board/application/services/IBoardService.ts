import { ICreateBoard } from "~features/board/application/interfaces/ICreateBoard";
import { IUpdateBoard } from "~features/board/application/interfaces/IUpdateBoard";
import { Board } from "~features/board/domain/BoardEntity";

export interface IBoardService {
  findById(id: number): Promise<Board>;

  findMany(userId: number): Promise<Board[]>;

  delete(id: number): Promise<void>;

  create(dto: ICreateBoard): Promise<Board>;

  update(id: number, dto: IUpdateBoard): Promise<Board>;

  validateAccess(userId: number, board: Board): void;
}
