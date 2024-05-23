import { Task } from '../model/task.model';

export interface TasksRepository {
  getAll(): Promise<Task[]>;

  add(task: Task): Promise<Task>;

  delete(id: number): void;

  find(id: number): Promise<Task | null>;

  update(id: number, task: Task): Promise<Task | null>;
}
