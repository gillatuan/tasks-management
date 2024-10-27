import {
  CreateTaskDto,
  GetTasksFilterDto,
  TaskDto,
  TaskStatus,
} from '@/tasks/dto/Task.dto';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: TaskDto[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksFilter(filterDto: GetTasksFilterDto) {
    let tasks = this.getAllTasks();

    if (filterDto.status) {
      tasks = this.tasks.filter((task) => task.status === filterDto.status);
    }

    if (filterDto.search) {
      tasks = this.tasks.filter((task) => {
        if (
          task.title.includes(filterDto.search) ||
          task.description.includes(filterDto.search)
        ) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  createTask(data: CreateTaskDto): TaskDto {
    const { title, description } = data;
    const task: TaskDto = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
