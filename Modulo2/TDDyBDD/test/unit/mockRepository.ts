import { TasksRepository } from 'src/tasks/infraestructure/tasks.repository';

export const mockRepository: jest.Mocked<TasksRepository> = {
  getAll: jest.fn(),
  add: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
};
