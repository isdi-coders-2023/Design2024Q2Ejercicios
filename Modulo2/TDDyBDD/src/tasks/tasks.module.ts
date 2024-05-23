import { Module } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { SharedModule } from 'src/common/shared.module';
import { PrismaTasksRepository } from './infraestructure/prismaTasks.repository';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './infraestructure/tasks.repository';
import { TasksService } from './service/tasks.service';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: TasksService,
      useFactory: (repository: TasksRepository): TasksService =>
        new TasksService(repository),
      inject: ['TasksRepository'],
    },
    {
      provide: 'TasksRepository',
      useExisting: PrismaTasksRepository,
    },
    {
      provide: PrismaTasksRepository,
      useFactory: (client: PrismaService): PrismaTasksRepository =>
        new PrismaTasksRepository(client),
      inject: [PrismaService],
    },
  ],
  controllers: [TasksController],
})
export class TasksModule {}
