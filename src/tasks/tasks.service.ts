import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  tasks: Task[] = [
    {
      id: 1,
      title: 'Do homework',
      description: 'Lorem ipsum dolor sit amet',
      done: true,
    },
    {
      id: 2,
      title: 'Do homework 2',
      description: 'Lorem ipsum dolor sit amet',
      done: true,
    },
    {
      id: 3,
      title: 'Do homework 3',
      description: 'Lorem ipsum dolor sit amet',
      done: true,
    },
  ];

  // Create Task
  async createTask(task: Task): Promise<Task[]> {
    if (task.title === '' || task.description === '') {
      new BadRequestException();
    }
    const taskToCreate: Task = await {
      id: this.tasks.length + 1,
      title: task.title,
      description: task.description,
      done: false,
    };

    this.tasks.push(taskToCreate);

    return [...this.tasks];
  }

  //getTasks
  async getTasks(): Promise<Task[]> {
    return await [...this.tasks];
  }

  private async findTask(id: number): Promise<Task> {
    const task = this.tasks.find((task) => task.id === id);
    return task;
  }

  private async findIndex(id: number): Promise<number> {
    const index = this.tasks.findIndex((task) => task.id === id);
    return index;
  }

  //getTaskById
  async getTaskById(id: number): Promise<Task> {
    const task = await this.findTask(id);
    if (!task) {
      throw new NotFoundException();
      //   return 'Task not found';
    }
    return { ...task };
    // return task;
  }

  // Update Task
  async updateTask(id: number, task: any): Promise<Task> {
    const taskToUpdate = await this.findTask(id);
    const index = await this.findIndex(id);
    if (!taskToUpdate) {
      throw new NotFoundException();
    }
    if (task.title === '' || task.description === '') {
      throw new BadRequestException();
    }
    this.tasks[index] = { ...taskToUpdate, ...task };
    return { ...taskToUpdate };
  }

  //deleteTask
  async deleteTask(id: number): Promise<number> {
    const index = await this.findIndex(id);

    this.tasks.splice(index, 1);

    return id;
  }

  async updateTaskStatus(id: number): Promise<Task> {
    const taskToUpdate = await this.findTask(id);
    const index = await this.findIndex(id);
    if (!taskToUpdate) {
      throw new NotFoundException();
    }
    this.tasks[index].done = !taskToUpdate.done;
    return { ...taskToUpdate };
  }
}
