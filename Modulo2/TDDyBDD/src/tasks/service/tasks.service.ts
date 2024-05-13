import { Injectable } from '@nestjs/common';
import { TasksRepository } from '../infraestructure/tasks.repository';
import { Task } from '../model/task.model';

@Injectable()
export class TasksService {
  constructor(private readonly repository: TasksRepository) {}

  public async addTasks(title: string): Promise<Task> {
    const task: Task = {
      title,
    };
    const result = await this.repository.add(task);
    return result;
  }
}
