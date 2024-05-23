import { After, Before } from '@cucumber/cucumber';
import { Test } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import { World } from './World';
import { TasksInMemoryRepository } from '../tasks/TasksInMemoryRepository';
import { PrismaTasksRepository } from 'src/tasks/infraestructure/prismaTasks.repository';

Before({ timeout: 10 * 1000 }, async function (this: World) {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider('TasksRepository')
    .useClass(TasksInMemoryRepository)
    .overrideProvider(PrismaTasksRepository)
    .useValue(null)
    .compile();

  this.app = moduleFixture.createNestApplication();
  this.app.useLogger(false);

  await this.app.init();
});

After(async function (this: World) {
  await this.app?.close();
});
