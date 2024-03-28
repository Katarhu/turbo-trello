import { IBoardRepository } from "~features/board/application/interfaces/IBoardRepository";
import { ICreateBoard } from "~features/board/application/interfaces/ICreateBoard";
import { IUpdateBoard } from "~features/board/application/interfaces/IUpdateBoard";
import { BoardMapper } from "~features/board/application/mappers/BoardMapper";
import { Board } from "~features/board/domain/BoardEntity";
import { PrismaService } from "~prisma/PrismaService";

export class BoardRepository implements IBoardRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.board;
  }

  async create(request: ICreateBoard): Promise<Board> {
    const board = await this.collection.create({
      data: {
        title: request.title,
        userId: request.userId,
      },
    });

    return BoardMapper.toEntity(board);
  }

  async delete(id: number): Promise<void> {
    await this.collection.delete({ where: { id } });
  }

  async update(id: number, input: IUpdateBoard): Promise<Board> {
    const board = await this.collection.update({ where: { id }, data: { ...input } });

    return BoardMapper.toEntity(board);
  }

  async findMany(userId: number): Promise<Board[]> {
    const boards = await this.collection.findMany({ where: { userId } });

    const entities = boards.map(BoardMapper.toEntity);

    return entities;
  }

  async getById(id: number): Promise<Board> {
    const board = await this.collection.findUnique({ where: { id } });

    return BoardMapper.toEntity(board);
  }
}
