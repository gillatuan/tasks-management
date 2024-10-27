import {
  CreateTaskDto,
  GetTasksFilterDto,
  TaskDto,
} from '@/tasks/dto/Task.dto';
import { TasksService } from '@/tasks/tasks.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): TaskDto[] {
    if (Object.keys(filterDto)) {
      return this.tasksService.getTasksFilter(filterDto);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): TaskDto {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): TaskDto {
    return this.tasksService.createTask(body);
  }
}
