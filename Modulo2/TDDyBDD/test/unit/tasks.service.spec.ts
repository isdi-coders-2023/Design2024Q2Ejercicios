import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from 'src/tasks/service/tasks.service';
import { mockRepository } from './mockRepository';
import { TaskMother } from './Task.mother';

describe('TasksService', () => {
  let tasksService: TasksService;

  const spy = jest.spyOn(mockRepository, 'add');
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

  afterEach(() => {
    spy.mockClear();
  });
  describe('User story 1', () => {
    describe('Task 1', () => {
      it('Assertions', async () => {
        const title = 'New task';
        const mockTask = TaskMother.getTask(1, title);
        spy.mockReturnValue(Promise.resolve(mockTask));

        const result = await tasksService.addTasks(title);

        expect(tasksService).toBeInstanceOf(TasksService);
        expect(result).toStrictEqual(mockTask);
      });
    });
  });
});
