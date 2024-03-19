import { Injectable } from "@nestjs/common";

import { JwtPayload } from "~core/types/jwt.types";

import { AccessListDto } from "./dto/access-list.dto";
import { ChangeTaskListDto } from "./dto/change.task-list.dto";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { TasksRepository } from "./tasks.repository";

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  async createTask(user: JwtPayload, createTaskDto: CreateTaskDto) {
    const task = await this.tasksRepository.createTask(user.id, createTaskDto);

    return {
      task,
    };
  }

  async getTasks(accessListDto: AccessListDto) {
    const tasks = await this.tasksRepository.getTasks(accessListDto.listId);

    return {
      tasks,
    };
  }

  async getTask(taskId: string) {
    const task = await this.tasksRepository.getTask(taskId);

    return {
      task,
    };
  }

  async updateTask(taskId: string, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.updateTask(taskId, updateTaskDto);

    return {
      message: "Task was updated successfully",
    };
  }

  async changeTaskList(taskId: string, changeTaskListDto: ChangeTaskListDto) {
    await this.tasksRepository.changeTaskList(taskId, changeTaskListDto);

    return {
      message: "Task's list was changed successfully",
    };
  }

  async deleteTask(taskId: string) {
    await this.tasksRepository.deleteTask(taskId);

    return {
      message: "Task was deleted successfully",
    };
  }
}
