import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Create a new task
  @Post()
  async createTask(@Body() body: any): Promise<Task[]> {
    const task = await this.tasksService.createTask(body);
    return task;
  }

  //getTasks
  @Get()
  async getTasks(): Promise<Task[]> {
    const tasks = await this.tasksService.getTasks();
    return tasks;
  }

  // Get Task By Id
  @Get(':id')
  async getTaskByID(@Param('id') id: number): Promise<Task> {
    const task = this.tasksService.getTaskById(Number(id));
    return task;
  }

  // Update Task
  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() body: Task): Promise<Task> {
    const task = this.tasksService.updateTask(Number(id), body);
    return task;
  }

  // Delete Task
  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<number> {
    const task = this.tasksService.deleteTask(Number(id));
    return task;
  }

  @Patch(':id/status')
  async updateTaskStatus(@Param('id') id: number): Promise<Task> {
    const task = this.tasksService.updateTaskStatus(Number(id));
    return task;
  }
}
