import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TasksService } from '@/tasks/tasks.service';
import { CreateTaskDto, GetTasksFilterDto, TaskDto } from '@/tasks/dto/Task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): TaskDto[] {
    if (Object.keys(filterDto)) {
      return this.tasksService.getTasksFilter(filterDto)
    }

    return this.tasksService.getAllTasks()
  }

  @Post()
  createTask(@Body() body: CreateTaskDto): TaskDto {
    return this.tasksService.createTask(body)
  }
}
