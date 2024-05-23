import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { TasksService } from './service/tasks.service';
import { Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(
    @Inject(TasksService) private readonly tasksService: TasksService,
  ) {}

  @Post('add')
  @HttpCode(HttpStatus.CREATED)
  async addTask(@Body() body: { title: string }, @Res() res: Response) {
    const { title } = body;
    await this.tasksService.addTasks(title);
    return res.status(HttpStatus.CREATED).send();
  }
}
