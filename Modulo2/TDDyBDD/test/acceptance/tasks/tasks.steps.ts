import { Then } from '@cucumber/cucumber';
import assert from 'node:assert';
import { TasksRepository } from 'src/tasks/infraestructure/tasks.repository';
import { World } from '../sharedSteps/World';

Then(
  'el elemento {string} debe ser agregado a la lista de tareas',
  async function (this: World, title: string) {
    const repository = this.app.get<TasksRepository>('TasksRepository');
    const tasks = await repository.getAll();
    let found = null;
    tasks.forEach((task) => {
      if (task.title === title) {
        found = task;
        return;
      }
    });
    assert.ok(found !== null, 'Task not found');
  },
);
