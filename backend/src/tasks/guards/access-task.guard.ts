import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Task } from "@prisma/client";

import { TasksRepository } from "../tasks.repository";
import { TargetedRequestWithToken } from "~core/types/request.types";

@Injectable()
export class AccessTaskGuard implements CanActivate {
  constructor(private tasksRepository: TasksRepository) {}

  private async getTask(taskId: string): Promise<Task> {
    const task = await this.tasksRepository.getTask(taskId);

    if (!task) throw new BadRequestException({ message: "There is no task with such id" });

    return task;
  }

  private canAccessTask(userId: string, taskCreatorId: string): boolean {
    return userId === taskCreatorId;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: TargetedRequestWithToken = context.switchToHttp().getRequest();

    const task = await this.getTask(request.params.id);

    return this.canAccessTask(request.user.id, task.userId);
  }
}
