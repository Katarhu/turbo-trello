import { Body, Request, Controller, Post, UseGuards, Get, Param, Put, Patch, Delete } from "@nestjs/common";

import { JwtGuard } from "~core/guards/jwt.guard";
import { RequestWithToken } from "~core/types/request.types";

import { AccessListDto } from "./dto/access-list.dto";
import { ChangeTaskListDto } from "./dto/change.task-list.dto";
import { CreateTaskDto } from "./dto/create.task.dto";
import { UpdateTaskDto } from "./dto/update.task.dto";
import { AccessListGuard } from "./guards/access-list.guard";
import { AccessTaskGuard } from "./guards/access-task.guard";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @UseGuards(JwtGuard, AccessListGuard)
  @Post()
  createTask(@Request() request: RequestWithToken, @Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(request.user, createTaskDto);
  }

  @UseGuards(JwtGuard, AccessListGuard)
  @Post("/get")
  getTasks(@Body() accessListDto: AccessListDto) {
    return this.tasksService.getTasks(accessListDto);
  }

  @UseGuards(JwtGuard, AccessTaskGuard)
  @Get("/:id")
  getTask(@Param("id") taskId: string) {
    return this.tasksService.getTask(taskId);
  }

  @UseGuards(JwtGuard, AccessTaskGuard)
  @Put("/:id")
  updateTask(@Param("id") taskId: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.updateTask(taskId, updateTaskDto);
  }

  @UseGuards(JwtGuard, AccessTaskGuard, AccessListGuard)
  @Patch("/:id")
  changeTaskList(@Param("id") taskId: string, @Body() changeTaskListDto: ChangeTaskListDto) {
    return this.tasksService.changeTaskList(taskId, changeTaskListDto);
  }

  @UseGuards(JwtGuard, AccessTaskGuard)
  @Delete("/:id")
  deleteTask(@Param("id") taskId: string) {
    return this.tasksService.deleteTask(taskId);
  }
}
