import { Injectable } from "@nestjs/common";

import { PrismaService } from "~core/prisma/prisma.service";

import { ChangeTaskListDto } from "./dto/change.task-list.dto";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto } from "./dto/update.task.dto";

@Injectable()
export class TasksRepository {
  constructor(private prismaService: PrismaService) {}

  private get collection() {
    return this.prismaService.task;
  }

  createTask(userId: string, createTaskDto: CreateTaskDto) {
    return this.collection.create({
      data: {
        userId,
        title: createTaskDto.title,
        listId: createTaskDto.listId,
      },
    });
  }

  getTasks(listId: string) {
    return this.collection.findMany({ where: { listId } });
  }

  getTask(id: string) {
    return this.collection.findUnique({ where: { id } });
  }

  updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    return this.collection.update({ where: { id }, data: { ...updateTaskDto } });
  }

  changeTaskList(id: string, changeTaskListDto: ChangeTaskListDto) {
    return this.collection.update({ where: { id }, data: { listId: changeTaskListDto.listId } });
  }

  deleteTask(id: string) {
    return this.collection.delete({ where: { id } });
  }
}
