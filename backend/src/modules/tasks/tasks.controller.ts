import {
  CreateTaskDto,
  GetTasksFilterDto,
  TaskDto,
  UpdateTaskDto,
} from '@/modules/tasks/dto/Task.dto';
import { TasksService } from '@/modules/tasks/tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

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

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
  ): TaskDto {
    return this.tasksService.updateTaskStatus(id, data);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }
}
