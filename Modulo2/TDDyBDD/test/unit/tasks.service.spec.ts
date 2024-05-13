import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from 'src/tasks/service/tasks.service';
import { mockRepository } from './mockRepository';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TasksService,
          useFactory: (repository): TasksService =>
            new TasksService(repository),
          inject: ['TasksRepository'],
        },
        {
          provide: 'TasksRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
  });

  describe('User story 1', () => {
    describe('Task 1', () => {
      it('Assertions', () => {
        expect(tasksService).toBeInstanceOf(TasksService);
      });
    });
  });
});
