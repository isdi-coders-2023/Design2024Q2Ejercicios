import { Injectable } from '@nestjs/common';
import { Task as PrismaTask } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { Task } from '../model/task.model';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class PrismaTasksRepository implements TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    const tasks: PrismaTask[] = await this.prisma.task.findMany();
    return tasks.map((task) => this.convertToTaskModel(task));
  }

  async add(task: Task): Promise<Task> {
    const createdTask: PrismaTask = await this.prisma.task.create({
      data: {
        title: task.title,
      },
    });
    return this.convertToTaskModel(createdTask);
  }

  async find(id: number): Promise<Task | null> {
    const task: PrismaTask | null = await this.prisma.task.findUnique({
      where: {
        id,
      },
    });
    if (!task) {
      return null;
    }
    return this.convertToTaskModel(task);
  }

  async delete(id: number): Promise<Task | null> {
    const deletedTask: PrismaTask | null = await this.prisma.task.delete({
      where: {
        id,
      },
    });
    if (!deletedTask) {
      return null;
    }
    return this.convertToTaskModel(deletedTask);
  }

  async update(id: number, task: Task): Promise<Task | null> {
    const updatedTask: PrismaTask | null = await this.prisma.task.update({
      where: {
        id,
      },
      data: task,
    });
    if (!updatedTask) {
      return null;
    }
    return this.convertToTaskModel(updatedTask);
  }

  private convertToTaskModel(prismaTask: PrismaTask): Task {
    return {
      id: prismaTask.id,
      title: prismaTask.title,
    };
  }
}
