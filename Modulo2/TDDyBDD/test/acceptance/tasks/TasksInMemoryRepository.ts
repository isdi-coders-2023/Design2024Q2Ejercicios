import { TasksRepository } from 'src/tasks/infraestructure/tasks.repository';
import { Task } from 'src/tasks/model/task.model';

export class TasksInMemoryRepository implements TasksRepository {
  private readonly tasks: Map<number, Task>;
  constructor() {
    this.tasks = new Map<number, Task>();
  }
  async getAll(): Promise<Task[]> {
    return [...this.tasks.values()];
  }

  async add(task: Task): Promise<Task> {
    const id = this.tasks.size + 1;
    const taskToSave = {
      ...task,
      id,
    };
    this.tasks.set(id, taskToSave);
    return taskToSave;
  }

  async delete(id: number): Promise<void> {
    this.tasks.delete(id);
  }

  async find(id: number): Promise<Task | null> {
    const task = this.tasks.get(id) || null;
    return task || null;
  }
  async update(id: number, task: Task): Promise<Task> {
    if (!this.tasks.has(id)) {
      throw new Error('Record doesnt exists');
    }
    this.tasks.set(id, task);
    return task;
  }

  fillRepo(tasks: Task[]): void {
    tasks.forEach((task) => {
      this.tasks.set(task.id, task);
    });
  }
  clearRepo(): void {
    this.tasks.clear();
  }
}
