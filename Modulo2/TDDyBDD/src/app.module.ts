import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SharedModule } from './common/shared.module';

@Module({
  imports: [SharedModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
