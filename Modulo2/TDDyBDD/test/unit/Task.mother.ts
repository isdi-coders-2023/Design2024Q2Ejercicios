import { Task } from 'src/tasks/model/task.model';
import { faker } from '@faker-js/faker';

export class TaskMother {
  static getTask(id: number, title: string): Task {
    return { id, title };
  }

  static random(id?: number): Task {
    return TaskMother.getTask(id ?? 1, faker.lorem.sentence());
  }
}
